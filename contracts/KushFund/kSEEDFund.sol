// contracts/KushFund/kSeedFund.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract kSeedFund {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  address connectorAddress;

  modifier _onlyConnector() {
    require(msg.sender == connectorAddress);
    _;
  }

  function approveSpend(address _address, uint256 _amount)
    public
    _onlyConnector
  {
    // ERC20(_address).approve(_address, _amount);
    IERC20 ercToken = IERC20(_address);
    ercToken.safeTransfer(_address, _amount);
  }
}
