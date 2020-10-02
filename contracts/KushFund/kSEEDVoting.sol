// contracts/KushFund/kSeedVoting.sol
// SPDX-License-Identifier: MIT
// KUSH.FINANCE VOTING CONTRACT by KushMaster420
// tHANKS TO THE COMMUNITY & THE TEAM BEHIND IT 
//                              .
//                       .:.
//                       :|:
//                      .:|:.
//                      ::|::
//       :.             ::|::             .:
//       :|:.          .::|::.          .:|:
//       ::|:.         :::|:::         .:|:;
//       `::|:.        :::|:::        .:|::'
//        ::|::.       :::|:::       .::|:;
//        `::|::.      :::|:::      .::|::'
//         :::|::.     :::|:::     .::|::;
//         `:::|::.    :::|:::    .::|::;'
//`::.      `:::|::.   :::|:::   .::|::;'      .:;'
// `:::..     ¹::|::.  :::|:::  .::|::¹    ..::;'
//   `:::::.    ':|::. :::|::: .::|:'   ,::::;'
//     `:::::.    ':|:::::|:::::|:'   :::::;'
//       `:::::.:::::|::::|::::|::::.,:::;'
//          ':::::::::|:::|:::|:::::::;:'
//             ':::::::|::|::|:::::::''
//                  `::::::::::;'
//                 .:;'' ::: ``::.
//                      :':':
//                        ;
//
//                   KUSH.FINANCE 
//  
// 
// Supported by smokers world wide.
// 
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";
import "./ERC20Interface.sol";

contract kSeedVoting {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    
    address public owner;
    
    uint256 public currentVotingStartBlock;
    uint256 public currentVotingEndBlock;
    bool public isVotingPeriod;
    
    uint256 public votingPeriodBlockLength = 3250;
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
        uint256 votingRound;
    }
    
    mapping(address => votingHold) private votedkSeed;
    
    bool public isRewardingkKush = true;


    uint256 public lastDistributionBlock;
    uint256 public currentDistributionEndBlock;
    uint256 public distributionPeriodBuffer = 13000;
    uint256 public distributionPeriodLength = 6500; //measured in blocks
    address public currentDistributionAddress;
    uint256 public currentDistributionAmount;
    uint256 public currentDistributionAmountClaimed;
    bool public isDistributing;
    bool public canDistribute;
    bool public isRewardingkKush;



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
    address public uniswapRouterAddress;
    address public connectorAddress;
    IUniswapV2Router02 public uniswapRouter;
    address public kseedLPFarm;
    address public connectorAddress;
    address public fundAddress;
    uint256 public burnPool;
    uint256 public burnPoolLimit;
    bool public safetyWithdrawal;
    
    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier _onlyConnector() {
        require((msg.sender == connectorAddress) || (msg.sender == owner));
        _;
    }
    modifier _onlyFund() {
        require((msg.sender == fundAddress) || (msg.sender == owner));
        _;
    }
    modifier _updatePeriods() {
        if (block.number >= currentVotingStartBlock && block.number <= currentVotingEndBlock) 
        {isVotingPeriod = true; } else {isVotingPeriod = false; delete proposals;}
         if (block.number > lastDistributionBlock && block.number > currentDistributionEndBlock)
         {isDistributing = false;}
         if (burnPool > burnPoolLimit) 
         {burnkKush();}_;
    event NewConnector(address indexed connector);
    event isRewardingkKush(bool isRewarding);
    event NewVotingPeriodLength(uint256 length, uint256 currentBlock);
    event NewFundingAddress(address indexed fundAddress);
    event NewkSeedAddress(address indexed kseedAddress);
    event NewkKushAddress(address indexed kkushAddress);
    event NewkushOGAddress(address indexed kOGAddress);
    event NewLPFarmAddress(address indexed kseedLPAddress);
    event SafetyWithdrawalToggled(bool safetyBool);
    event NewBidProposal(address indexed proposer, string bidId, string functionName);
    event NewBidChain(address indexed proposer, string functionName, string bidId, string chainId);
    event NewBidVote(address indexed voter, uint256 votes);
    event VotedkSeedWithdrawn(address indexed voter, uint256 kseed);
    event BidExecution(address indexed voter, string bidId);
    event FundsDistribution(address indexed distributedToken, uint256 amount);
    event ClaimDistribution(address indexed claimer, uint256 amountClaimed, uint256 kseedStaked, uint256 kkushLPStaked);
    event WithdrawDistributionkSeed(address indexed claimer, uint256 amount);
    event WithdrawDistributionkKush(address indexed claimer, uint256 amount);
    event kKushBurn(uint256 kKushBurned);

    }
    
    
    constructor(address _uniswapRouter, address _kseed, address _kkush, address _kOG, uint256 _initialEndBlock) public 
    { owner = msg.sender;     
    uniswapRouterAddress = _uniswapRouter;      
    uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    currentVotingStartBlock = block.number;
    currentVotingEndBlock = _initialEndBlock;        
    kseedAddress = _kseed;
    kseedIERC20 = IERC20(kseedAddress);     
    kkushAddress = _kkush;      
    kkushIERC20 = IERC20(kkushAddress);     
    kushOGAddress = _kOG;      
    kushOGIERC20 = IERC20(kushOGAddress);      
    isVotingPeriod = true;       
    isDistributing = false;     
    canDistribute = true;     
    isRewardingkKush = true;
    burnPoolLimit = 500000000000000000000;} 
    
    
    
    function setOwner(address _owner) public _onlyOwner _updatePeriods {
        owner = _owner;
    }
        
    
    function setConnector(address _connector) public _onlyConnector _updatePeriods {
        connectorAddress = _connector;
        emit NewConnector(_connector);
        //Voting connector change event
    }

     function setFundAddress(address _fund) public _onlyConnector _updatePeriods {
        fundAddress = _fund;
        emit NewFundingAddress(fundAddress);
        
        
    }
    
    function setIsRewardingkKush(bool _isRewarding) public _onlyConnector _updatePeriods{
        isRewardingkKush = _isRewarding;
         emit isRewardingkKush(isRewardingkKush);
        //Voting connector change event
    }
    
    function setVotingPeriodBlockLength(uint256 _blocks) public _onlyConnector _updatePeriods {
        votingPeriodBlockLength = _blocks;
         emit NewVotingPeriodLength(votingPeriodBlockLength, block.number);
    }
    function setSafetyWithdrawal(bool _safetyBool) public _onlyConnector _updatePeriods{
        safetyWithdrawal = _safetyBool;
        emit SafetyWithdrawalToggled(safetyWithdrawal);   
    }

    function setRewardsContract(address _addr) public _onlyConnector _updatePeriods {      
         kseedLPFarm = _addr;      
         emit NewLPFarmAddress(kseedLPFarm);   
    }
    
    function setkSeedAddress(address _addr) public _onlyConnector _updatePeriods {
        kseedAddress = _addr;
        kseedIERC20 = IERC20(kseedAddress);
        emit NewNyanAddress(kseedAddress);
        //kSeed address change event
    }
      
    function setkKushAddress(address _addr) public _onlyConnector _updatePeriods{
        kkushAddress = _addr;
        kkushIERC20 = IERC20(kkushAddress);
        emit  NewkKushAddress(kkushAddress);
        //kKUSH address change event
    }
    
    function setkushOGAddress(address _addr) public _onlyConnector _updatePeriods{
        kushOGAddress = _addr;
        kushOGIERC20 = IERC20(kushOGAddress);
        emit  NewkushOGAddress(kushOGAddress);
        //kushOG address change event
    }
     function setkSeedFarmAddress(address _addr) public _onlyConnector _updatePeriods {
        kseedLPFarm = _addr;
        emit NewLPFarmAddress(kseedLPFarm);  
        }
    function proposeBid(
    string memory bidId, 
    string memory _functionCode, 
    string memory _functionName,
    address[] memory _addresses,     
    uint256[] memory _integers,        
    string[] memory _strings,      
    bytes[] memory _bytesArr)
    public  _updatePeriods { 
    // require(isVotingPeriod, \\"Voting period has not started.\\");        
     // require(currentVotingEndBlock >= block.number, \\"Voting period has ended.\\");
    //check bidId
    currentBids[msg.sender].bidId = bidId;           
    currentBids[msg.sender].bidder = msg.sender;        
    currentBids[msg.sender].functionCode = _functionCode;          
    currentBids[msg.sender].functionName = _functionName;        
    currentBids[msg.sender].addresses = _addresses;           
    currentBids[msg.sender].integers = _integers;        
    currentBids[msg.sender].strings = _strings;         
    currentBids[msg.sender].bytesArr = _bytesArr;               
    if (currentBids[msg.sender].votingRound < currentVotingRound) {
        delete currentBids[msg.sender].chain;}
    currentBids[msg.sender].votingRound = currentVotingRound;
    currentBids[msg.sender].votes = 0;
     bool alreadyExists = false;          
     for (uint256 i = 0; i < proposals.length; i++)
     {if (proposals[i] == msg.sender) {alreadyExists = true;}}
     if (!alreadyExists) {proposals.push(msg.sender);}
     emit NewBidProposal(msg.sender, bidId, _functionName);}
     
     function addChainBid(string memory id, string memory bidId, string memory _functionCode, string memory _functionName, address[] memory _addresses, uint256[] memory _integers, string[] memory _strings, bytes[] memory _bytesArr) 
           public _updatePeriods {
                //create id internally in the future
                string memory userBid = currentBids[msg.sender].bidId;    
               require(keccak256(bytes(userBid)) == keccak256(bytes(bidId)), \\"This is not your bid\\");    
             //verify this
                if (keccak256(bytes(bidChains[id].id)) == keccak256(bytes(id))) {require(keccak256(bytes(currentBids[msg.sender].bidId)) == keccak256(bytes(bidChains[id].bidId)));} 
                else 
                {require(keccak256(bytes(bidChains[id].id)) != keccak256(bytes(id)), \\"This Id already exists\\");}
                 bidChains[id].id = id;
                 bidChains[id].bidId = bidId;
                         bidChains[id].functionCode = _functionCode;        
                           bidChains[id].functionName = _functionName;
                                     bidChains[id].addresses = _addresses;
                                               bidChains[id].integers = _integers;       
                                                bidChains[id].strings = _strings;         
                                                bidChains[id].bytesArr = _bytesArr;             
                 bool bidExists = false;          
                 for (uint256 i = 0; i < currentBids[msg.sender].chain.length; i++) { if (keccak256(bytes(currentBids[msg.sender].chain[i])) == keccak256(bytes(id)))
                  {bidExists = true;}

    
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