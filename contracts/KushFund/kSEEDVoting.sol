// contracts/KushFund/kSeedVoting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./ERC20Interface.sol";

contract kSeedVoting {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    
    address public owner;
    
    uint256 public currentVotingStartBlock;
    uint256 public currentVotingEndBlock;
    bool public isVotingPeriod;
    
    uint256 public votingPeriodBlockLength = 270;
    uint256 public costPerVote = 1000000000000000000;
    uint256 public kkushCost = 100000000000000000;
    
    struct bid {
        address bidder;
        string functionCode;
        string functionName;
        uint256 votes;
        address[] addresses;
        uint256[] integers;
        string[] strings;
        bytes32[] bytesArr;
        string[] chain;
    }
    
     mapping(address => bid) private currentBids;
    
    struct bidChain {
        string id;
        string functionCode;
        string functionName;
        address[] addresses;
        uint256[] integers;
        string[] strings;
        bytes32[] bytesArr;
    }
    
    mapping(string => bidChain) private bidChains;
    
    address public topBidAddress;
    
    struct votingHold {
        uint256 kSeedLocked;
        uint256 releaseBlock;
    }
    
    mapping(address => votingHold) private votedkSeed;
    
    
    uint256 public lastDistributionBlock;
    uint256 public currentDistributionEndBlock;
    bool public isDistributing;
    bool public canDistribute;
    bool public isRewardingkKush = true;
    
    
    address public currentDistributionAddress;
    uint256 public currentDistributionAmount;
    uint256 public currentDistributionAmountClaimed;
    
    struct distributionClaimed {
        uint256 kseedLocked;
        
    }
    
    mapping(address => distributionClaimed) private claims;
    
    
    address public kseedAddress;
    IERC20 private kseedIERC20;
    address public kkushAddress;
    IERC20 private kkushIERC20;
    address public kushOGUni;
    IERC20 private kushOGUniIERC20;
    address public kushOGAddress;
    IERC20 private kushOGIERC20;
    
    address public uniswapAddress;
    
    address public connectorAddress;
    
    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier _onlyConnector() {
        require(msg.sender == connectorAddress);
        _;
    }
    
    
    constructor() public {
        owner = address(this);
        currentVotingStartBlock = block.number;
        currentVotingEndBlock = block.number + votingPeriodBlockLength;
    }
    
    function setConnector(address _connector) public _onlyConnector {
        connectorAddress = _connector;
        
        //Voting connector change event
    }
    
    function setIsRewardingkKush(bool _isRewarding) public _onlyConnector {
        isRewardingkKush = _isRewarding;
        
        //Voting connector change event
    }
    
    function setVotingPeriodBlockLength(uint256 _blocks) public _onlyConnector {
        votingPeriodBlockLength = _blocks;
        
        //Voting period change event
    } 
    
    function setkSeedAddress(address _addr) public _onlyConnector {
        kseedAddress = _addr;
        kseedIERC20 = IERC20(kseedAddress);
        
        //kSeed address change event
    }
    
    function setkKushAddress(address _addr) public _onlyConnector {
        kkushAddress = _addr;
        kkushIERC20 = IERC20(kkushAddress);
        
        //kKUSH address change event
    }
    
    function setkushOGAddress(address _addr) public _onlyConnector {
        kushOGAddress = _addr;
        kushOGIERC20 = IERC20(kushOGAddress);
        
        //kushOG address change event
    }
    
    function proposeBid(string memory _functionCode, string memory _functionName, address[] memory _addresses, uint256[] memory _integers, string[] memory _strings, bytes32[] memory _bytesArr) public {
        require(isVotingPeriod, "Voting period has not started.");
        require(currentVotingEndBlock >= block.number, "Voting period has ended.");
        currentBids[msg.sender].bidder = msg.sender;
        currentBids[msg.sender].functionCode = _functionCode;
        currentBids[msg.sender].functionName = _functionName;
        currentBids[msg.sender].addresses = _addresses;
        currentBids[msg.sender].integers = _integers;
        currentBids[msg.sender].strings = _strings;
        currentBids[msg.sender].bytesArr = _bytesArr;
        
        //Bid proposal event
    }
    
    function addChainBid(string memory id, string memory _functionCode, string memory _functionName, address[] memory _addresses, uint256[] memory _integers, string[] memory _strings, bytes32[] memory _bytesArr) public {
        
    }
    
    function voteForBid(address _bidAddr, uint256 votes) public {
        kseedIERC20.safeTransferFrom(msg.sender, address(this), votes * costPerVote);
        kkushIERC20.safeTransferFrom(msg.sender, address(this), votes * kkushCost);
        votedkSeed[msg.sender].kSeedLocked = votedkSeed[msg.sender].kSeedLocked.add(votes * costPerVote);
        votedkSeed[msg.sender].releaseBlock = currentVotingEndBlock;
        currentBids[_bidAddr].votes = currentBids[_bidAddr].votes.add(votes);
        
        //Bid vote event
        
    }
    
    function withdrawBidkSeed() public {
        require(votedkSeed[msg.sender].releaseBlock > block.number, "kSEED is still locked for vote");
        uint256 amount = votedkSeed[msg.sender].kSeedLocked;
        kseedIERC20.safeTransfer(msg.sender, amount);
        votedkSeed[msg.sender].kSeedLocked = 0;
        
        //Bid kSEED withdrawal event
    }
    
    function approveContract(address _addr, uint256 _amount) public _onlyConnector {
        ERC20(_addr).approve(_addr, _amount);
        
        //Contract approval event
    }
    
    function executeBid(string memory _functionCode, 
                        string memory _functionName, 
                        address[] memory _addresses, 
                        uint256[] memory integers, 
                        string[] memory strings, 
                        bytes32[] memory bytesArr)
                        public _onlyConnector {
                            
        // require(currentVotingEndBlock < block.number, "Voting period is still active.");
        currentVotingStartBlock = block.number.add(votingPeriodBlockLength.mul(2));
        currentVotingEndBlock = block.number.add(currentVotingStartBlock.add(votingPeriodBlockLength));
        connectorAddress.call(abi.encodeWithSignature("executeBid(string,string,address[],uint256[],string[],bytes32[])",
                                                        _functionCode,_functionName,_addresses,integers,strings,bytesArr));
                                                        
        
        for (uint256 c = 0; c<currentBids[topBidAddress].chain.length; c++) {
            connectorAddress.call(abi.encodeWithSignature("executeBid(string,string,address[],uint256[],string[],bytes32[])",
                                                        bidChains[currentBids[topBidAddress].chain[c]].functionCode,
                                                        bidChains[currentBids[topBidAddress].chain[c]].functionName,
                                                        bidChains[currentBids[topBidAddress].chain[c]].addresses,
                                                        bidChains[currentBids[topBidAddress].chain[c]].integers,
                                                        bidChains[currentBids[topBidAddress].chain[c]].strings,
                                                        bidChains[currentBids[topBidAddress].chain[c]].bytesArr));
        }
        
        //Bid execution event                                                
    }
    
    function distributeFunds(address _addr, uint256 _amount) public _onlyConnector {
        
    }
    
    function claimDistribution(address _claimer, uint256 _amount) public {
        require(isDistributing && currentVotingEndBlock>block.number, "You are not in a distribution period");
        kseedIERC20.safeTransferFrom(_claimer, address(this), _amount);
        claims[_claimer].kseedLocked = claims[_claimer].kseedLocked.add(_amount);
        uint256 kseedSupply = ERC20(kseedAddress).totalSupply();
        uint256 kkushSupply = ERC20(kushOGUni).totalSupply();
        uint256 rewardsPool = kseedSupply;
        
        if (isRewardingkKush) {
            rewardsPool.add(kkushSupply);
        }
        
        uint256 claimerPerc = rewardsPool.mul(_amount);
        uint256 claimedAmount = currentDistributionAmount.div(claimerPerc);
        IERC20(currentDistributionAddress).safeTransfer(msg.sender, _amount);
        currentDistributionAmountClaimed = currentDistributionAmountClaimed.add(claimedAmount);
        
        //distribution claim event
        
    }
    
    function withdrawDistributionkSeed() public {
        
    }
    
    function burnkKush() public _onlyConnector {
        //take $kKUSH in burn pool
        //divide the amount in half
        //swap one half for $kushOG on uniswap
        //send other $kKUSH half to burn address
        //send swapped $kushOG to burn address
        
    }
    
    
    
}