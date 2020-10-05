// SPDX-License-Identifier: MIT
// KUSH.FINANCE VOTING CONTRACT by KushMaster420 and Spiry was here.
// THANKS TO THE COMMUNITY & THE TEAM BEHIND IT 
//                        .
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
// Supported by smokers world wide.
// Sometimes I be wanting to say, "Fuck the world!"
// I don't give a fuck!
// I'll shoot it out with all you bitches
// Bitches don't love me
// Young ,fighting the world
// Everywhere you go, bitches throwing rocks
// Man, a younging in a Lamborghini
// Multiple weapons in my new Gucci boots
// The Bank account done caught the holy ghost (Huh)
// I say the bank account done caught the holy ghost!
// I'm Michael Jackson to the rich niggas
// That leather jacket, baby, with the 6 zippers
// Suicide, or rather crucified (Huh)
// I prophesize your whole crew demise
// Shoot you, let you bleed out, it's how they do a nigga 
//
//     KUSH WARRIORS!
/////////////////////////////////////////////
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";

contract kSEEDVoting {    
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    address public owner;
    
    uint256 public currentVotingStartBlock;
    uint256 public currentVotingEndBlock;
    bool public isVotingPeriod;
    uint256 public currentVotingRound;
    uint256 public votingPeriodBlockLength = 3250; // 1 WEEK VOTING PERIOD @ 650 BLOCKS PER DAY
    uint256 public costPerVote = 4200000000000000000;
    uint256 public kkushCost = 420000000000000000;
    address[] public proposals;
    
    
    
    struct bid {
        string bidId;
        address bidder;
        string functionCode;
        string functionName;
        uint256 votes;
        address[] addresses;
        uint256[] integers;
        string[] strings;
        bytes[] bytesArr;
        string[] chain;
        uint256 votingRound;
    }
        
        
        
    mapping(address => bid) private currentBids;
        
        
    struct bidChain {
        string id;
        string bidId;
        string functionCode;
        string functionName;
        address[] addresses;
        uint256[] integers;
        string[] strings;
        bytes[] bytesArr;
    }
    
    mapping(string => bidChain) private bidChains;
    
    
    
    address public topBidAddress;
    uint256 public topBidVotes;
    struct votingHold {
        uint256 kseedLocked;
        uint256 releaseBlock;
        uint256 votingRound;
        }
        
    mapping(address => votingHold) private votedkSeed;
    uint256 public lastDistributionBlock;
    uint256 public currentDistributionEndBlock;
    uint256 public distributionPeriodBuffer = 13000;
    uint256 public distributionPeriodLength = 6500; //measured in blocks 10 DAYS
    bool public isDistributing;
    bool public canDistribute;
    bool public isRewardingkKush;
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
    address public kkushpUni;
    IERC20 private kkushUniIERC20;
    address public kOGAddress;
    IERC20 private kOGIERC20;
    address public uniswapRouterAddress;
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
        if (block.number >= currentVotingStartBlock && block.number <= currentVotingEndBlock) {
            isVotingPeriod = true;} else {isVotingPeriod = false;
                                  delete proposals;
                                  }
                                  if (block.number > lastDistributionBlock && block.number > currentDistributionEndBlock) 
                                  {
                                  isDistributing = false;
                                  }
                                  if (burnPool > burnPoolLimit) 
                                  {
                                  burnkKush();
                                  }
                                    _;
                                  }
                                                  
        event NewConnector(address indexed connector);
        event IsRewardingkKush(bool isRewarding);
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
        event kKushBurn(uint256 kkushBurned);
        
        
        
        
    constructor(address _uniswapRouter, address _kseed, address _kkush, address _kog, uint256 _initialEndBlock) public {
        owner = msg.sender;
        uniswapRouterAddress = _uniswapRouter;
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        currentVotingStartBlock = block.number;
        currentVotingEndBlock = _initialEndBlock;
        kkushAddress = _kkush;
        kseedIERC20 = IERC20(kseedAddress);
        kkushAddress = _kkush;
        kkushIERC20 = IERC20(kkushAddress);
        kOGAddress = _kog;
        kOGIERC20 = IERC20(kOGAddress);
        isVotingPeriod = true;
        isDistributing = false;
        canDistribute = true;
        isRewardingkKush = true;
        burnPoolLimit = 500000000000000000000;
        }
    
    
    function setOwner(address _owner) public _onlyOwner _updatePeriods {
        owner = _owner;
        }
        
        
    function setConnector(address _connector) public _onlyConnector _updatePeriods {
        connectorAddress = _connector;
        emit NewConnector(_connector);
        }
    function setFundAddress(address _fund) public _onlyConnector _updatePeriods {
        fundAddress = _fund;
        
        emit NewFundingAddress(fundAddress);
        }
    function setIsRewardingkKush(bool _isRewarding) public _onlyConnector _updatePeriods {
        isRewardingkKush = _isRewarding;
        
        emit IsRewardingkKush(isRewardingkKush);
        }
        
    function setVotingPeriodBlockLength(uint256 _blocks) public _onlyConnector _updatePeriods {
        votingPeriodBlockLength = _blocks;
        emit NewVotingPeriodLength(votingPeriodBlockLength, block.number);
        }
        
        
        
    function setSafetyWithdrawal(bool _safetyBool) public _onlyConnector _updatePeriods {
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
        emit NewkSeedAddress(kseedAddress);
        }
    function setkKushAddress(address _addr) public _onlyConnector _updatePeriods {
    kkushAddress = _addr;
    kkushIERC20 = IERC20(kkushAddress);
    
    emit  NewkKushAddress(kkushAddress);
    }
    
    function setkushOGAddress(address _addr) public _onlyConnector _updatePeriods {
        kOGAddress = _addr;
        kOGIERC20 = IERC20(kOGAddress);
        
        emit NewkushOGAddress(kOGAddress);
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
        bytes[] memory _bytesArr
        ) 
        public  _updatePeriods {
                        // require(isVotingPeriod, "Voting period has not started.");
                        // require(currentVotingEndBlock >= block.number, "Voting period has ended.");
                                  
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
                            delete currentBids[msg.sender].chain;
                            }
                            currentBids[msg.sender].votingRound = currentVotingRound;
                            currentBids[msg.sender].votes = 0;
                            
                            bool alreadyExists = false;
                            for (uint256 i = 0; i < proposals.length; i++) {
                                if (proposals[i] == msg.sender) {
                                    alreadyExists = true;
                                    }
                                        }
                                    
                                    if (!alreadyExists) {
                                        proposals.push(msg.sender);
                                        }
                                        
                                        emit NewBidProposal(msg.sender, bidId, _functionName);
                                        }
                                       
    function addChainBid(
        string memory id,
        string memory bidId,
        string memory _functionCode,
        string memory _functionName,
        address[] memory _addresses,
        uint256[] memory _integers, 
        string[] memory _strings,
        bytes[] memory _bytesArr) 
        public _updatePeriods {
            //create id internally in the future
            string memory userBid = currentBids[msg.sender].bidId;
            require(keccak256(bytes(userBid)) == keccak256(bytes(bidId)), "This is not your bid");       
            //verify this
            if (keccak256(bytes(bidChains[id].id)) == keccak256(bytes(id))) {
                require(keccak256(bytes(currentBids[msg.sender].bidId)) == keccak256(bytes(bidChains[id].bidId)));
                } else {
                    require(keccak256(bytes(bidChains[id].id)) != keccak256(bytes(id)), "This Id already exists");
                    }
                    
                    
                    bidChains[id].id = id;
                    bidChains[id].bidId = bidId;
                    bidChains[id].functionCode = _functionCode;
                    bidChains[id].functionName = _functionName;
                    bidChains[id].addresses = _addresses;
                    bidChains[id].integers = _integers;
                    bidChains[id].strings = _strings;
                    bidChains[id].bytesArr = _bytesArr;
                    
                    bool bidExists = false;
                    for (uint256 i = 0; i < currentBids[msg.sender].chain.length; i++) {
                        if (keccak256(bytes(currentBids[msg.sender].chain[i])) == keccak256(bytes(id))) {
                            bidExists = true;
                            }
                            }
                            if (!bidExists) {
                                currentBids[msg.sender].chain.push(id);
                                }
                                currentBids[msg.sender].votes = 0;
                                
                                emit NewBidChain(msg.sender, _functionName, bidId, id);
                                }
                                
                                
    function getProposals() view public returns(address[] memory) {
        return proposals;
        }
        
    function voteForBid(address _bidAddr, uint256 _votes) public _updatePeriods  {
        require(_votes > costPerVote, "Below the kSEED cost per vote");
        kseedIERC20.safeTransferFrom(msg.sender, address(this), _votes);
        kkushIERC20.safeTransferFrom(msg.sender, address(this), determinekKushCost(msg.sender, _votes));
        //Store KUSH in burn amount variable
        burnPool.add(determinekKushCost(msg.sender, _votes));
        
        if (votedkSeed[msg.sender].kseedLocked > 0) {
            if (votedkSeed[msg.sender].releaseBlock < block.number) {
                kseedIERC20.safeTransfer(msg.sender, votedkSeed[msg.sender].kseedLocked);
                votedkSeed[msg.sender].kseedLocked = 0;
                }
                }
                votedkSeed[msg.sender].kseedLocked = votedkSeed[msg.sender].kseedLocked.add(_votes);
                votedkSeed[msg.sender].releaseBlock = currentVotingEndBlock;
                votedkSeed[msg.sender].votingRound = currentVotingRound;
                currentBids[_bidAddr].votes = currentBids[_bidAddr].votes.add(_votes);
                
                if ((currentBids[_bidAddr].votes > topBidVotes) && (topBidAddress != _bidAddr)) {
                    topBidAddress = _bidAddr;
                    topBidVotes = currentBids[_bidAddr].votes;
                    }
                    
                    emit NewBidVote(msg.sender, _votes);
                    
                    }
                    
    function getBid(address _address) public view returns(
        string memory,
        string memory,
        address[] memory,
        uint256[] memory,
        string[] memory,
        // // bytes[] memory,
        string[] memory,
        uint256
        )
        {
            return (
                currentBids[_address].functionCode,
                currentBids[_address].functionName,
                currentBids[_address].addresses,
                currentBids[_address].integers,
                currentBids[_address].strings,
                // //   currentBids[_address].bytesArr,
                currentBids[_address].chain,
                currentBids[_address].vote
                );
                }
               
    function getChain(string memory id) public view returns(
        string memory, 
        string memory,
        string memory,
        address[] memory,
        uint256[] memory,
        string[] memory
        // bytes[] memory
        ) 
        {
            return(
                bidChains[id].id,
                bidChains[id].functionCode,
                bidChains[id].functionName,
                bidChains[id].addresses,
                bidChains[id].integers,
                bidChains[id].strings
                // bidChains[id].bytesArr
                );
                }
                
    function getBidkSeedStaked(address _address) public view returns(uint256) {
        return votedkSeed[_address].kseedLocked;
        }
        
    function determinekKushCost(address voter, uint256 votes) view public returns(uint256) {
        uint256 totalVotes = votedkSeed[voter].kseedLocked.add(votes);
        return totalVotes.div(10);
        }
        
    function withdrawBidkSeed() public _updatePeriods {
        require((votedkSeed[msg.sender].votingRound < currentVotingRound) || (votedkSeed[msg.sender].releaseBlock < block.number) || (safetyWithdrawal), "kSEED is still locked for vote");
        uint256 amount = votedkSeed[msg.sender].kseedLocked;
        kseedIERC20.safeTransfer(msg.sender, amount);
        votedkSeed[msg.sender].kseedLocked = 0;
        
        emit VotedkSeedWithdrawn(msg.sender, amount);
        }
        
            
    function executeBid() public _updatePeriods {
                require(currentVotingEndBlock < block.number, "Voting period is still active.");
                     currentVotingStartBlock = block.number + 10;
                     currentVotingEndBlock = block.number.add(currentVotingStartBlock.add(votingPeriodBlockLength));
                     KConnector connectorContract = KConnector(connectorAddress);
                     KFund fundContract = KFund(fundAddress);
                     connectorContract.executeBid(
                         currentBids[topBidAddress].functionCode,
                         currentBids[topBidAddress].functionName,
                         currentBids[topBidAddress].addresses,
                         currentBids[topBidAddress].integers,
                         currentBids[topBidAddress].strings,
                         currentBids[topBidAddress].bytesArr
                         );
                         
                          
                        for (uint256 c = 0; c<currentBids[topBidAddress].chain.length; c++) {
                            
                            connectorContract.executeBid(
                                bidChains[currentBids[topBidAddress].chain[c]].functionCode,
                                bidChains[currentBids[topBidAddress].chain[c]].functionName,
                                bidChains[currentBids[topBidAddress].chain[c]].addresses,
                                bidChains[currentBids[topBidAddress].chain[c]].integers,
                                bidChains[currentBids[topBidAddress].chain[c]].strings,
                                bidChains[currentBids[topBidAddress].chain[c]].bytesArr);
                                
                                }
                                //move voting round stuff to modifier 
                                currentVotingRound = currentVotingRound.add(1);
                                //increase Round in funding contract
                                fundContract.newVotingRound();
                                delete proposals;
                                
                                
                                //function to send back leftover tokens to fund from connector
                                
                                
                                emit BidExecution(currentBids[topBidAddress].bidder, currentBids[topBidAddress].bidId);
                                }
    function executeBidNow() public _onlyOwner {
        KConnector connectorContract = KConnector(connectorAddress);
        KFund fundContract = KFund(fundAddress);
        connectorContract.executeBid(
            currentBids[topBidAddress].functionCode,
            currentBids[topBidAddress].functionName,
            currentBids[topBidAddress].addresses,
            currentBids[topBidAddress].integers,
            currentBids[topBidAddress].strings,
            currentBids[topBidAddress].bytesArr
            );
            
            for (uint256 c = 0; c<currentBids[topBidAddress].chain.length; c++) {
                connectorContract.executeBid(
                    bidChains[currentBids[topBidAddress].chain[c]].functionCode,
                    bidChains[currentBids[topBidAddress].chain[c]].functionName,
                    bidChains[currentBids[topBidAddress].chain[c]].addresses,
                    bidChains[currentBids[topBidAddress].chain[c]].integers,
                    bidChains[currentBids[topBidAddress].chain[c]].strings,
                    bidChains[currentBids[topBidAddress].chain[c]].bytesArr);
                    
                    }
                    
                    //move voting round stuff to modifier
                    currentVotingRound = currentVotingRound.add(1);
                    //increase Round in funding contract
                    fundContract.newVotingRound();
                    delete proposals;
                    
                    //function to send back leftover tokens to fund from connector
                    
                    emit BidExecution(currentBids[topBidAddress].bidder, currentBids[topBidAddress].bidId);
                        }
                       
    function distributeFunds(address _addr, uint256 _amount) public _onlyConnector _updatePeriods  {
        KFund fundContract = KFund(fundAddress);
        //Check that isDistributing is false
        require(!isDistributing, "Already in distribution period");
        require((currentDistributionEndBlock < block.number), "Distribution funds error");
        //Check that it has been more than 1 day since last distribution
        require((block.number - currentDistributionEndBlock) > distributionPeriodBuffer, "Too early for distribution");
        //Set distribution block to current block
        lastDistributionBlock = block.number;
        //Set end block for current distribution
        currentDistributionEndBlock = block.number + distributionPeriodLength;
        
        currentDistributionAmountClaimed = 0;
        //get funds from KUSH (kseed) Fund
        fundContract.approveSpendERC20(_addr, _amount);
        //set current distribution amount
        
        emit FundsDistribution(_addr, _amount);
        }
    function claimDistribution(address _claimer, uint256 _kseedAmount, uint256 _kKushLPAmount) public  {
        require(isDistributing && currentVotingEndBlock>block.number, "You are not in a distribution period");
                kseedIERC20.safeTransferFrom(_claimer, address(this), _kseedAmount);
                claims[_claimer].kseedLocked = claims[_claimer].kseedLocked.add(_kseedAmount);
                uint256 kseedSupply = ERC20(kseedAddress).totalSupply();
                uint256 kkushSupply = ERC20(kkushpUni).totalSupply();
                uint256 rewardsPool = kseedSupply;
                
                if (isRewardingkKush) {
                    rewardsPool.add(kkushSupply);
                    }
                    
                    uint256 numerator = _kseedAmount.mul(currentDistributionAmount);
                    require(numerator > rewardsPool);
                    uint256 claimedAmount = numerator.div(rewardsPool);
                    IERC20(currentDistributionAddress).safeTransfer(msg.sender, claimedAmount);
                    currentDistributionAmountClaimed = currentDistributionAmountClaimed.add(claimedAmount);        
                    emit ClaimDistribution(_claimer, claimedAmount, _kseedAmount, _kKushLPAmount);
                    }
                   
    function withdrawDistributionkSeed() public {
        require((!isDistributing) || (safetyWithdrawal), "Locked kSEED  can only be claimed outside of distribution period");
        kseedIERC20.safeTransfer(msg.sender, claims[msg.sender].kseedLocked);
        claims[msg.sender].kseedLocked = claims[msg.sender].kseedLocked.sub(claims[msg.sender].kseedLocked);
           
                  emit WithdrawDistributionkSeed(msg.sender, claims[msg.sender].kseedLocked);
                  }
                  
    function burnkKush() public _updatePeriods {
        //take kKUSH in burn pool and divide the amount in half
        uint256 halfkKush = burnPool.div(2);
        //swap one half for kOG on uniswap
        ERC20(kkushAddress).approve(uniswapRouterAddress, burnPool);
        address[] memory path = new address[](2);
        path[0] = kkushAddress;
        path[1] = uniswapRouter.WETH();
        path[2] = kOGAddress;
        
        uint deadline = block.timestamp + 15;
        uniswapRouter.swapExactTokensForTokens(
            halfkKush,
            0,
            path,
            address(this),
            deadline
            );
            //send other kKUSH half to burn address
            ERC20(kkushAddress).transfer(0x0000000000000000000000000000000000000001, halfkKush - 10);
            //send swapped kOG to kSEED LP farming contract
            ERC20(kOGAddress).transfer(kseedLPFarm, ERC20(kOGAddress).balanceOf(address(this)));
            
            emit kKushBurn(halfkKush);
            }
           
          
          receive() external payable {
              
              }
              
              }