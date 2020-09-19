pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract kOGToken is ERC20{
    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;


    struct stakeTracker {
        uint256 lastBlockChecked;
        uint256 rewards;
        uint256 kkushPoolTokens;
        uint256 kOGPoolTokens;
    }
    
    mapping(address => stakeTracker) private stakedBalances;


    address owner;
    
    address public fundVotingAddress;
    
    bool public isSendingFunds = false;
    
    uint256 private lastBlockSent;
    
    uint256 public liquidityMultiplier = 80;
    uint256 public miningDifficulty = 50000;
    
    IERC20 private kkush;
    IERC20 private kOG;
    
    IERC20 private kkushV2;
    address public kkushUniswapV2Pair;
    
    IERC20 private kOGV2;
    address public kOGV2UniswapV2Pair;
    
    uint256 totalLiquidityStaked;


    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier updateStakingReward(address _account) {
        uint256 liquidityBonus;
        if (stakedBalances[_account].kOGPoolTokens > 0) {
            liquidityBonus = stakedBalances[_account].kOGPoolTokens/ liquidityMultiplier;
        }
        if (block.number > stakedBalances[_account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(stakedBalances[_account].lastBlockChecked);
                                        
                                        
             
            if (stakedBalances[_account].kkushPoolTokens > 0) {
                stakedBalances[_account].rewards = stakedBalances[_account].rewards
                                                                            .add(stakedBalances[_account].kkushPoolTokens)
                                                                            .add(liquidityBonus)
                                                                            .mul(rewardBlocks)
                                                                            / miningDifficulty;
            }
            
           
                    
            stakedBalances[_account].lastBlockChecked = block.number;
            
            
            emit Rewards(_account, stakedBalances[_account].rewards);                                                     
        }
        _;
    }
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    event kkushUniStaked(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event kOGUniStaked(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event kkushUniWithdrawn(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event kOGUniWithdrawn(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event Rewards(address indexed user, uint256 reward);
    
    event FundsSentToFundingAddress(address indexed user, uint256 amount);
    
    event votingAddressChanged(address indexed user, address votingAddress);
    
    event kkushPairAddressChanged(address indexed user, address kkushPairAddress);
    
    event kOGPairAddressChanged(address indexed user, address kOGPairAddress);
    
    event difficultyChanged(address indexed user, uint256 difficulty);


    constructor() public payable ERC20("kushOG", "kOG") {
        owner = msg.sender;
        uint256 supply = 42;
        _mint(msg.sender, supply.mul(10 ** 18));
        lastBlockSent = block.number;
    }
    
    function transferOwnership(address newOwner) external _onlyOwner {
        assert(newOwner != address(0)/*, "Ownable: new owner is the zero address"*/);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    
    function setVotingAddress(address _account) public _onlyOwner {
        fundVotingAddress = _account;
        emit votingAddressChanged(msg.sender, fundVotingAddress);
    }
    
    function setkKushPairAddress(address _uniV2address) public _onlyOwner {
        kkushUniswapV2Pair = _uniV2address;
        kkushV2 = IERC20(kkushUniswapV2Pair);
        emit kkushPairAddressChanged(msg.sender, kkushUniswapV2Pair);
    }

    function setpkKushPairAddress(address _uniV2address) public _onlyOwner {
        kOGV2UniswapV2Pair = _uniV2address;
        kOGV2 = IERC20(kOGV2UniswapV2Pair);
        emit kOGPairAddressChanged(msg.sender, kOGV2UniswapV2Pair);
    }
    
     function setMiningDifficulty(uint256 amount) public _onlyOwner {
       miningDifficulty = amount;
       emit difficultyChanged(msg.sender, miningDifficulty);
   }
    
    function stakekKushUni(uint256 amount) public updateStakingReward(msg.sender) {
        kkushV2.safeTransferFrom(msg.sender, address(this), amount);
        stakedBalances[msg.sender].kkushPoolTokens = stakedBalances[msg.sender].kkushPoolTokens.add(amount);
        totalLiquidityStaked = totalLiquidityStaked.add(amount);                                                                              
        emit kkushUniStaked(msg.sender, stakedBalances[msg.sender].kkushPoolTokens, totalLiquidityStaked);
    }
    
    function withdrawkKushUni(uint256 amount) public updateStakingReward(msg.sender) {
        kkushV2.safeTransfer(msg.sender, amount);
        stakedBalances[msg.sender].kkushPoolTokens = stakedBalances[msg.sender].kkushPoolTokens.sub(amount);
        totalLiquidityStaked = totalLiquidityStaked.sub(amount);                                                                              
        emit kkushUniWithdrawn(msg.sender, amount, totalLiquidityStaked);
    }
    
    
    
    function stakekOGUni(uint256 amount) public updateStakingReward(msg.sender) {
        kOGV2.safeTransferFrom(msg.sender, address(this), amount);
        stakedBalances[msg.sender].kOGPoolTokens = stakedBalances[msg.sender].kOGPoolTokens.add(amount);
        totalLiquidityStaked = totalLiquidityStaked.add(amount);                                                                              
        emit kOGUniStaked(msg.sender, amount, totalLiquidityStaked);
    }
    
    function withdrawkOGUni(uint256 amount) public updateStakingReward(msg.sender) {
        kOGV2.safeTransfer(msg.sender, amount);
        stakedBalances[msg.sender].kOGPoolTokens = stakedBalances[msg.sender].kOGPoolTokens.sub(amount);
        totalLiquidityStaked = totalLiquidityStaked.sub(amount);                                                                              
        emit kOGUniWithdrawn(msg.sender, amount, totalLiquidityStaked);
    }
    
    function getkKushUniStakeAmount(address _account) public view returns (uint256) {
        return stakedBalances[_account].kkushPoolTokens;
    }
    
    function getDNyanUniStakeAmount(address _account) public view returns (uint256) {
        return stakedBalances[_account].kOGPoolTokens;
    }
    
    function myRewardsBalance(address _account) public view returns(uint256) {
        uint256 liquidityBonus;
        if (stakedBalances[_account].kOGPoolTokens > 0) {
            liquidityBonus = stakedBalances[_account].kOGPoolTokens / liquidityMultiplier;
        }
        
        if (block.number > stakedBalances[_account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(stakedBalances[_account].lastBlockChecked);
                                        
                                        
             
            if (stakedBalances[_account].kkushPoolTokens > 0) {
                return stakedBalances[_account].rewards
                                                .add(stakedBalances[_account].kkushPoolTokens)
                                                .add(liquidityBonus)
                                                .mul(rewardBlocks)
                                                / miningDifficulty;
            } else {
                return 0;
            }
        }
    }
    
    function getReward() public updateStakingReward(msg.sender) {
        uint256 reward = stakedBalances[msg.sender].rewards;
       stakedBalances[msg.sender].rewards = 0;
       _mint(msg.sender, reward.mul(8) / 10);
       uint256 fundingPoolReward = reward.mul(2) / 10;
       _mint(address(this), fundingPoolReward);
       emit Rewards(msg.sender, reward);
    }
    
    function toggleFundsTransfer() public _onlyOwner {
        isSendingFunds = !isSendingFunds;
    }
    
    function sendkOGToFund(uint256 amount) public {
        if (!isSendingFunds) {
            return;
        }
        lastBlockSent = block.number;
        IERC20(address(this)).safeTransfer(fundVotingAddress, amount);
        emit FundsSentToFundingAddress(msg.sender, amount);
    }
    
    
}