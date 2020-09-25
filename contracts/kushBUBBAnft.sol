pragma solidity ^0.4.20;

import "openzeppelin-solidity/contracts/token/ERC1155/ERC1155.sol";
import “openzeppelin-solidity/contracts/token/ERC721/ERC777.sol”;
import “openzeppelin-solidity/contracts/token/ERC721/ERC721.sol”;
import ‘openzeppelin-solidity/contracts/ownership/Ownable.sol’;
import ‘openzeppelin-solidity/contracts/lifecycle/Pausable.sol’;
import ‘openzeppelin-solidity/contracts/lifecycle/Destructible.sol’;
/**
 * @title kushBUBBA NFT
 *  
 * 
 */
contract KushBUBBA is Ownable, Pausable, Destructible {

    event Sent(address indexed payee, uint256 amount, uint256 balance);
    event Received(address indexed payer, uint tokenId, uint256 amount, uint256 balance);

    ERC721 public nftAddress;
    uint256 public currentPrice;

    /**
    * @dev Contract Constructor
    * @param _nftAddress address for Crypto Arte non-fungible token contract 
    * @param _currentPrice initial sales price
    */
    constructor(address _nftAddress, uint256 _currentPrice) public { 
        require(_nftAddress != address(0) && _nftAddress != address(this));
        require(_currentPrice > 0);
        nftAddress = ERC721(_nftAddress);
        currentPrice = _currentPrice;
    }

    /**
    * @dev Purchase _tokenId
    * @param _tokenId uint256 token ID (painting number)
    */
    function purchaseToken(uint256 _tokenId) public payable whenNotPaused {
        require(msg.sender != address(0) && msg.sender != address(this));
        require(msg.value >= currentPrice);
        require(nftAddress.exists(_tokenId));
        address tokenSeller = nftAddress.ownerOf(_tokenId);
        nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);
        emit Received(msg.sender, _tokenId, msg.value, address(this).balance);
    }

    /**
    * @dev send / withdraw _amount to _payee
    */
    function sendTo(address _payee, uint256 _amount) public onlyOwner {
        require(_payee != address(0) && _payee != address(this));
        require(_amount > 0 && _amount <= address(this).balance);
        _payee.transfer(_amount);
        emit Sent(_payee, _amount, address(this).balance);
    }    

    /**
    * @dev Updates _currentPrice
    * @dev Throws if _currentPrice is zero
    */
    function setCurrentPrice(uint256 _currentPrice) public onlyOwner {
        require(_currentPrice > 0);
        currentPrice = _currentPrice;
    }        

}