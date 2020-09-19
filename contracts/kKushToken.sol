
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract kKushToken is ERC20 {
    
    struct stakeTracker {
        uint256 lastBlockChecked;
        uint256 rewards;
        uint256 kSeedStaked;
    }

    address private owner;
    
    uint256 private rewardsVar;
    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
 
    address private kSeedAddress;
    IERC20 private kSeedToken;

    uint256 private _totalkSeedStaked;
    mapping(address => stakeTracker) private _stakedBalances;
    
    constructor() public ERC20("kKUSH", "kKUSH") {
        owner = msg.sender;
        _mint(msg.sender, 420 * (10 ** 18));
        rewardsVar = 4200000;
    }
    
    event Staked(address indexed user, uint256 amount, uint256 totalkSeedStaked);
    event Withdrawn(address indexed user, uint256 amount);
    event Rewards(address indexed user, uint256 reward);
    
    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier updateStakingReward(address account) {
        if (block.number > _stakedBalances[account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(_stakedBalances[account].lastBlockChecked);
                                        
                                        
             
            if (_stakedBalances[account].kSeedStaked > 0) {
                _stakedBalances[account].rewards = _stakedBalances[account].rewards
                                                                            .add(
                                                                            _stakedBalances[account].kSeedStaked
                                                                            .mul(rewardBlocks)
                                                                            / rewardsVar);
            }
                    
            _stakedBalances[account].lastBlockChecked = block.number;
            
            emit Rewards(account, _stakedBalances[account].rewards);                                                     
        }
        _;
    }


    function setkSeedAddress(address _kseedAddress) public _onlyOwner returns(uint256) {
        kSeedAddress = _kseedAddress;
        kSeedToken = IERC20(_kseedAddress);
    }
    
    function updatingStakingReward(address account) public returns(uint256) {
        if (block.number > _stakedBalances[account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(_stakedBalances[account].lastBlockChecked);
                                        
                                        
            if (_stakedBalances[account].kSeedStaked > 0) {
                _stakedBalances[account].rewards = _stakedBalances[account].rewards
                                                                            .add(
                                                                            _stakedBalances[account].kSeedStaked
                                                                            .mul(rewardBlocks)
                                                                            / rewardsVar);
            }
                                                
            _stakedBalances[account].lastBlockChecked = block.number;
                                                
            emit Rewards(account, _stakedBalances[account].rewards);                                                     
        
        }
        return(_stakedBalances[account].rewards);
    }
    
    function getBlockNum() public view returns (uint256) {
        return block.number;
    }
    
    function getLastBlockCheckedNum(address _account) public view returns (uint256) {
        return _stakedBalances[_account].lastBlockChecked;
    }

    function getAddressStakeAmount(address _account) public view returns (uint256) {
        return _stakedBalances[_account].kSeedStaked;
    }
    
    function setRewardsVar(uint256 _amount) public _onlyOwner {
        rewardsVar = _amount;
    }
    
    function totalStakedSupply() public view returns (uint256) {
        return _totalkSeedStaked;
    }

    function myRewardsBalance(address account) public view returns (uint256) {
        if (block.number > _stakedBalances[account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(_stakedBalances[account].lastBlockChecked);
                                        
                                        
             
            if (_stakedBalances[account].kSeedStaked > 0) {
                return _stakedBalances[account].rewards
                                                .add(
                                                _stakedBalances[account].kSeedStaked
                                                .mul(rewardBlocks)
                                                / rewardsVar);
            }                                                  
        }

    }

    function stake(uint256 amount) public updateStakingReward(msg.sender) {
        _totalkSeedStaked = _totalkSeedStaked.add(amount);
        _stakedBalances[msg.sender].kSeedStaked = _stakedBalances[msg.sender].kSeedStaked.add(amount);
        kSeedToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount, _totalkSeedStaked);
    }

    function withdraw(uint256 amount) public updateStakingReward(msg.sender) {
        _totalkSeedStaked = _totalkSeedStaked.sub(amount);
        _stakedBalances[msg.sender].kSeedStaked = _stakedBalances[msg.sender].kSeedStaked.sub(amount);
        kSeedToken.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }
    
   function getReward() public updateStakingReward(msg.sender) {
       uint256 reward = _stakedBalances[msg.sender].rewards;
       _stakedBalances[msg.sender].rewards = 0;
       _mint(msg.sender, reward.mul(8) / 10);
       uint256 fundingPoolReward = reward.mul(2) / 10;
       _mint(kSeedAddress, fundingPoolReward);
       emit Rewards(msg.sender, reward);
   }

    
}