pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract PurpleKush is ERC20{
    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;


    struct stakeTracker {
        uint256 lastBlockChecked;
        uint256 rewards;
        uint256 kushPoolTokens;
        uint256 pKushPoolTokens;
    }
    
    mapping(address => stakeTracker) private stakedBalances;


    address owner;
    
    address public fundVotingAddress;
    
    bool public isSendingFunds = false;
    
    uint256 private lastBlockSent;
    
    uint256 public liquidityMultiplier = 80;
    uint256 public miningDifficulty = 50000;
    
    IERC20 private kush;
    IERC20 private pKush;
    
    IERC20 private kushV2;
    address public kushUniswapV2Pair;
    
    IERC20 private pKushV2;
    address public pKushUniswapV2Pair;
    
    uint256 totalLiquidityStaked;


    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier updateStakingReward(address _account) {
        uint256 liquidityBonus;
        if (stakedBalances[_account].pKushPoolTokens > 0) {
            liquidityBonus = stakedBalances[_account].pKushPoolTokens/ liquidityMultiplier;
        }
        if (block.number > stakedBalances[_account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(stakedBalances[_account].lastBlockChecked);
                                        
                                        
             
            if (stakedBalances[_account].kushPoolTokens > 0) {
                stakedBalances[_account].rewards = stakedBalances[_account].rewards
                                                                            .add(stakedBalances[_account].kushPoolTokens)
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
    
    event kushUniStaked(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event pKushUniStaked(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event kushUniWithdrawn(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event pKushUniWithdrawn(address indexed user, uint256 amount, uint256 totalLiquidityStaked);
    
    event Rewards(address indexed user, uint256 reward);
    
    event FundsSentToFundingAddress(address indexed user, uint256 amount);
    
    event votingAddressChanged(address indexed user, address votingAddress);
    
    event kushPairAddressChanged(address indexed user, address kushPairAddress);
    
    event pKushPairAddressChanged(address indexed user, address pKushPairAddress);
    
    event difficultyChanged(address indexed user, uint256 difficulty);


    constructor() public payable ERC20("purpleKUSH", "pKUSH") {
        owner = msg.sender;
        uint256 supply = 420;
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
    
    function setKushPairAddress(address _uniV2address) public _onlyOwner {
        kushUniswapV2Pair = _uniV2address;
        kushV2 = IERC20(kushUniswapV2Pair);
        emit kushPairAddressChanged(msg.sender, kushUniswapV2Pair);
    }

    function setpKushPairAddress(address _uniV2address) public _onlyOwner {
        pKushUniswapV2Pair = _uniV2address;
        pKushV2 = IERC20(pKushUniswapV2Pair);
        emit pKushPairAddressChanged(msg.sender, pKushUniswapV2Pair);
    }
    
     function setMiningDifficulty(uint256 amount) public _onlyOwner {
       miningDifficulty = amount;
       emit difficultyChanged(msg.sender, miningDifficulty);
   }
    
    function stakeKushUni(uint256 amount) public updateStakingReward(msg.sender) {
        kushV2.safeTransferFrom(msg.sender, address(this), amount);
        stakedBalances[msg.sender].kushPoolTokens = stakedBalances[msg.sender].kushPoolTokens.add(amount);
        totalLiquidityStaked = totalLiquidityStaked.add(amount);                                                                              
        emit kushUniStaked(msg.sender, stakedBalances[msg.sender].kushPoolTokens, totalLiquidityStaked);
    }
    
    function withdrawKushUni(uint256 amount) public updateStakingReward(msg.sender) {
        kushV2.safeTransfer(msg.sender, amount);
        stakedBalances[msg.sender].kushPoolTokens = stakedBalances[msg.sender].kushPoolTokens.sub(amount);
        totalLiquidityStaked = totalLiquidityStaked.sub(amount);                                                                              
        emit kushUniWithdrawn(msg.sender, amount, totalLiquidityStaked);
    }
    
    
    
    function stakeDarkNyanUni(uint256 amount) public updateStakingReward(msg.sender) {
        pKushV2.safeTransferFrom(msg.sender, address(this), amount);
        stakedBalances[msg.sender].pKushPoolTokens = stakedBalances[msg.sender].pKushPoolTokens.add(amount);
        totalLiquidityStaked = totalLiquidityStaked.add(amount);                                                                              
        emit pKushUniStaked(msg.sender, amount, totalLiquidityStaked);
    }
    
    function withdrawDarkNyanUni(uint256 amount) public updateStakingReward(msg.sender) {
        pKushV2.safeTransfer(msg.sender, amount);
        stakedBalances[msg.sender].pKushPoolTokens = stakedBalances[msg.sender].pKushPoolTokens.sub(amount);
        totalLiquidityStaked = totalLiquidityStaked.sub(amount);                                                                              
        emit pKushUniWithdrawn(msg.sender, amount, totalLiquidityStaked);
    }
    
    function getKushUniStakeAmount(address _account) public view returns (uint256) {
        return stakedBalances[_account].kushPoolTokens;
    }
    
    function getDNyanUniStakeAmount(address _account) public view returns (uint256) {
        return stakedBalances[_account].pKushPoolTokens;
    }
    
    function myRewardsBalance(address _account) public view returns(uint256) {
        uint256 liquidityBonus;
        if (stakedBalances[_account].pKushPoolTokens > 0) {
            liquidityBonus = stakedBalances[_account].pKushPoolTokens / liquidityMultiplier;
        }
        
        if (block.number > stakedBalances[_account].lastBlockChecked) {
            uint256 rewardBlocks = block.number
                                        .sub(stakedBalances[_account].lastBlockChecked);
                                        
                                        
             
            if (stakedBalances[_account].kushPoolTokens > 0) {
                return stakedBalances[_account].rewards
                                                .add(stakedBalances[_account].kushPoolTokens)
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
    
    function sendDarkNyanToFund(uint256 amount) public {
        if (!isSendingFunds) {
            return;
        }
        lastBlockSent = block.number;
        IERC20(address(this)).safeTransfer(fundVotingAddress, amount);
        emit FundsSentToFundingAddress(msg.sender, amount);
    }
    
    
}