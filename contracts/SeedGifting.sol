pragma solidity ^0.6.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";


contract kSeedGifting {
    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    
    
    address private kseed = 0x3F09400313e83d53366147e3ea0e4e2279D80850;
    IERC20 private kseedToken = IERC20(kseed);
    
    constructor() public payable {
        
    }
    
    function sendGifts(address[] memory _recipients, uint256 _amountPer) public {
        for(uint i = 0; i < _recipients.length; i++) {
            kseedToken.safeTransferFrom(msg.sender, _recipients[i], _amountPer);
        }
    }
    
}