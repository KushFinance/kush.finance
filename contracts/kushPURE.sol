pragma solidity ^0.6.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract kushPUREToken is ERC20 {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  struct stakeTracker {
    uint256 lastBlockChecked;
    uint256 rewards;
    uint256 kkushPoolTokens;
    uint256 kushOGPoolTokens;
  }

  mapping(address => stakeTracker) private stakedBalances;

  address owner;
  address public devAddress;
  address public fundVotingAddress;

  bool public isSendingFunds = false;

  uint256 private lastBlockSent;

  uint256 public liquidityMultiplier = 80;
  uint256 public miningDifficulty = 50000;

  IERC20 private kkush;
  IERC20 private kushOG;

  IERC20 private kkushV2;
  address public kkushUniswapV2Pair;

  IERC20 private kushOGV2;
  address public kushOGV2UniswapV2Pair;

  uint256 totalLiquidityStaked;
  uint256 public rateDevFee = 5;
  uint256 public rateReward = 75;
  uint256 public rateFund = 20;
  uint256 public start_block = 0;
  bool public isStart;
  modifier _onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier updateStakingReward(address _account) {
    uint256 liquidityBonus;
    if (stakedBalances[_account].kushOGPoolTokens > 0) {
      liquidityBonus =
        stakedBalances[_account].kushOGPoolTokens /
        liquidityMultiplier;
    }
    if (block.number > stakedBalances[_account].lastBlockChecked) {
      uint256 rewardBlocks = block.number.sub(
        stakedBalances[_account].lastBlockChecked
      );

      if (stakedBalances[_account].kkushPoolTokens > 0) {
        stakedBalances[_account].rewards =
          stakedBalances[_account]
            .rewards
            .add(stakedBalances[_account].kkushPoolTokens)
            .add(liquidityBonus)
            .mul(rewardBlocks) /
          miningDifficulty;
      }

      stakedBalances[_account].lastBlockChecked = block.number;

      emit Rewards(_account, stakedBalances[_account].rewards);
    }
    _;
  }

  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  event kkushUniStaked(
    address indexed user,
    uint256 amount,
    uint256 totalLiquidityStaked
  );

  event kushOGUniStaked(
    address indexed user,
    uint256 amount,
    uint256 totalLiquidityStaked
  );

  event kkushUniWithdrawn(
    address indexed user,
    uint256 amount,
    uint256 totalLiquidityStaked
  );

  event kushOGUniWithdrawn(
    address indexed user,
    uint256 amount,
    uint256 totalLiquidityStaked
  );

  event Rewards(address indexed user, uint256 reward);

  event FundsSentToFundingAddress(address indexed user, uint256 amount);

  event votingAddressChanged(address indexed user, address votingAddress);

  event kkushPairAddressChanged(address indexed user, address kkushPairAddress);

  event kushOGPairAddressChanged(address indexed user, address kOGPairAddress);

  event difficultyChanged(address indexed user, uint256 difficulty);

  constructor(address kkushToken, address _devAddress)
    public
    payable
    ERC20('kushPURE', 'kPURE')
  {
    owner = msg.sender;
    uint256 supply = 1;
    _mint(msg.sender, supply.mul(10**18));
    devAddress = _devAddress;
    lastBlockSent = block.number;
    isStart = false;
    kkushToken = IERC20(address(kkushToken));
  }

  function transferOwnership(address newOwner) external _onlyOwner {
    assert(
      newOwner != address(0) /*, "Ownable: new owner is the zero address"*/
    );
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
    kushOGV2UniswapV2Pair = _uniV2address;
    kushOGV2 = IERC20(kushOGV2UniswapV2Pair);
    emit kushOGPairAddressChanged(msg.sender, kushOGV2UniswapV2Pair);
  }

  function setMiningDifficulty(uint256 amount) public _onlyOwner {
    miningDifficulty = amount;
    emit difficultyChanged(msg.sender, miningDifficulty);
  }

  function stakekKushUni(uint256 amount)
    public
    updateStakingReward(msg.sender)
  {
    kkushV2.safeTransferFrom(msg.sender, address(this), amount);
    stakedBalances[msg.sender].kkushPoolTokens = stakedBalances[msg.sender]
      .kkushPoolTokens
      .add(amount);
    totalLiquidityStaked = totalLiquidityStaked.add(amount);
    emit kkushUniStaked(
      msg.sender,
      stakedBalances[msg.sender].kkushPoolTokens,
      totalLiquidityStaked
    );
  }

  function withdrawkKushUni(uint256 amount)
    public
    updateStakingReward(msg.sender)
  {
    kkushV2.safeTransfer(msg.sender, amount);
    stakedBalances[msg.sender].kkushPoolTokens = stakedBalances[msg.sender]
      .kkushPoolTokens
      .sub(amount);
    totalLiquidityStaked = totalLiquidityStaked.sub(amount);
    emit kkushUniWithdrawn(msg.sender, amount, totalLiquidityStaked);
  }

  function stakekushPUREUni(uint256 amount)
    public
    updateStakingReward(msg.sender)
  {
    kushOGV2.safeTransferFrom(msg.sender, address(this), amount);
    stakedBalances[msg.sender].kushOGPoolTokens = stakedBalances[msg.sender]
      .kushOGPoolTokens
      .add(amount);
    totalLiquidityStaked = totalLiquidityStaked.add(amount);
    emit kushOGUniStaked(msg.sender, amount, totalLiquidityStaked);
  }

  function withdrawkushPUREUni(uint256 amount)
    public
    updateStakingReward(msg.sender)
  {
    kushOGV2.safeTransfer(msg.sender, amount);
    stakedBalances[msg.sender].kushOGPoolTokens = stakedBalances[msg.sender]
      .kushOGPoolTokens
      .sub(amount);
    totalLiquidityStaked = totalLiquidityStaked.sub(amount);
    emit kushOGUniWithdrawn(msg.sender, amount, totalLiquidityStaked);
  }

  function getkKushUniStakeAmount(address _account)
    public
    view
    returns (uint256)
  {
    return stakedBalances[_account].kkushPoolTokens;
  }

  function getkushPUREUniStakeAmount(address _account)
    public
    view
    returns (uint256)
  {
    return stakedBalances[_account].kushOGPoolTokens;
  }

  function myRewardsBalance(address _account) public view returns (uint256) {
    uint256 liquidityBonus;
    if (stakedBalances[_account].kushOGPoolTokens > 0) {
      liquidityBonus =
        stakedBalances[_account].kushOGPoolTokens /
        liquidityMultiplier;
    }

    if (block.number > stakedBalances[_account].lastBlockChecked) {
      uint256 rewardBlocks = block.number.sub(
        stakedBalances[_account].lastBlockChecked
      );

      if (stakedBalances[_account].kkushPoolTokens > 0) {
        return
          stakedBalances[_account]
            .rewards
            .add(stakedBalances[_account].kkushPoolTokens)
            .add(liquidityBonus)
            .mul(rewardBlocks) / miningDifficulty;
      } else {
        return 0;
      }
    }
  }

  function getReward() public updateStakingReward(msg.sender) {
    require(isStart, 'not started');
    uint256 reward = stakedBalances[msg.sender].rewards;
    stakedBalances[msg.sender].rewards = 0;
    uint256 totalWeight = rateReward.add(rateDevFee).add(rateFund);
    // 20% to Funding event
    _mint(address(this), reward.div(totalWeight).mul(rateFund));
    // 75% to User
    _mint(msg.sender, reward.div(totalWeight).mul(rateReward));
    // 5% to DevFee
    _mint(devAddress, reward.div(totalWeight).mul(rateDevFee));
    emit Rewards(msg.sender, reward);
  }

  function toggleFundsTransfer() public _onlyOwner {
    isSendingFunds = !isSendingFunds;
  }

  function sendkushOGToFund(uint256 amount) public {
    if (!isSendingFunds) {
      return;
    }
    lastBlockSent = block.number;
    IERC20(address(this)).safeTransfer(fundVotingAddress, amount);
    IERC20(address(this)).safeTransfer(devAddress, amount);
    emit FundsSentToFundingAddress(msg.sender, amount);
  }
}
