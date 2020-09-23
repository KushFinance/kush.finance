//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract kSeedToken is ERC20 {
    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
 
    /// @notice The EIP-712 typehash for the contract's domain
    bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");
    /// @notice A record of states for signing / validating signatures
    mapping (address => uint) public nonces;

    address owner;
    address private fundVotingAddress;
    IERC20 private kKush;
    bool private isSendingFunds;
    uint256 private lastBlockSent;

    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor() public payable ERC20("KUSH.FINANCE", "kSEED") {
        owner = msg.sender;
        uint256 supply = 420000;
        _mint(msg.sender, supply.mul(10 ** 18));
        lastBlockSent = block.number;
    }
    
   function setKushAddress(address kKushAddress) public _onlyOwner {
       kKush = IERC20(kKushAddress);
   }    
    
   function setFundingAddress(address fundingContract) public _onlyOwner {
       fundVotingAddress = fundingContract;
   }
   
   function startFundingBool() public _onlyOwner {
       isSendingFunds = true;
   }
   
   function getFundingPoolAmount() public view returns(uint256) {
       kKush.balanceOf(owner);
   }
   
   function triggerTransfer(uint256 amount) public {
       require((block.number - lastBlockSent) > 21600, "Too early to transfer");
       kKush.safeTransfer(fundVotingAddress, amount);
   }
}