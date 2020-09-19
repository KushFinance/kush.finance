pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract kSeedGifting {
    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    
    
    address private kseed = 0x9ed02d3B4B7a719154314F34aFB11bE9bD548510;
    IERC20 private kseedToken = IERC20(kseed);
    
    constructor() public payable {
        
    }
    
    function sendGifts(address[] memory _recipients, uint256 _amountPer) public {
        for(uint i = 0; i < _recipients.length; i++) {
            kseedToken.safeTransferFrom(msg.sender, _recipients[i], _amountPer);
        }
    }
    
}