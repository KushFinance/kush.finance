// SPDX-License-Identifier: MIT
// KUSH.FINANCE GOVERNANCE CONTRACT
// By KushMaster420 and SpiryBTC had helped
// Developing the FIRST PUBLIC & OPEN SOURCE GOVERNANCE CONTRACT
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

pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract kSEEDGovernance {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;
  address public kseedAddress;
  IERC20 private kseedIERC20;

  struct status {
    bool isAdmin;
  }

  mapping(address => status) private currentAdmins;

  struct kseedVoted {
    uint256 votes;
    address proposalAddr;
    string proposalQuestion;
    string option;
  }

  mapping(address => kseedVoted) private kseedVotes;
  string public topOption;
  uint256 public topVotes;

  struct proposal {
    string proposalQuestion;
    address proposer;
    string[] options;
    string[] optionImgs;
    uint256[] optionVotes;
    uint256 endBlock;
  }

  mapping(address => proposal) private eachProposal;

  address[] public proposals;

  modifier _isAdmin() {
    require(currentAdmins[msg.sender].isAdmin, 'You do not have permission.');
    _;
  }

  event proposalCreated(address indexed proposer, string question);
  event votedForProposal(address indexed voter, string question, string option);
  event kseedWithdrawn(address indexed voter, uint256 amount);
  event newAdminAdded(address indexed admin, address newAdmin);
  event adminRemoved(address indexed admin, address removedAdmin);

  constructor(address _kseedAddress) public {
    currentAdmins[msg.sender].isAdmin = true;
    kseedAddress = _kseedAddress;
    kseedIERC20 = IERC20(kseedAddress);
  }

  function setkSeedAddress(address _addr) public _isAdmin {
    kseedAddress = _addr;
    kseedIERC20 = IERC20(kseedAddress);
  }

  function getBlockNumber() public view returns (uint256) {
    return block.number;
  }

  function createProposal(
    string memory _proposalQuestion,
    address _proposer,
    string[] memory _options,
    string[] memory _optionImgs,
    uint256 _endBlock
  ) public _isAdmin {
    eachProposal[msg.sender].proposalQuestion = _proposalQuestion;
    eachProposal[msg.sender].proposer = _proposer;
    eachProposal[msg.sender].options = _options;
    eachProposal[msg.sender].optionImgs = _optionImgs;
    eachProposal[msg.sender].endBlock = _endBlock;
    delete eachProposal[msg.sender].optionVotes;
    for (uint256 i = 0; i < _options.length; i++) {
      eachProposal[msg.sender].optionVotes.push(0);
    }

    topOption = '';
    topVotes = 0;
    delete proposals;
    proposals.push(msg.sender);
    emit proposalCreated(_proposer, _proposalQuestion);
  }

  function getProposal(address _proposal)
    public
    view
    returns (
      string memory,
      address,
      string[] memory,
      string[] memory,
      uint256[] memory,
      uint256
    )
  {
    return (
      eachProposal[_proposal].proposalQuestion,
      eachProposal[_proposal].proposer,
      eachProposal[_proposal].options,
      eachProposal[_proposal].optionImgs,
      eachProposal[_proposal].optionVotes,
      eachProposal[_proposal].endBlock
    );
  }

  function voteForProposal(
    uint256 _amount,
    uint256 _optionIndex,
    address _proposalAddr
  ) public {
    require(
      block.number < eachProposal[_proposalAddr].endBlock,
      'Voting is already over!'
    );
    kseedIERC20.safeTransferFrom(msg.sender, address(this), _amount);
    kseedVotes[msg.sender].votes = kseedVotes[msg.sender].votes.add(_amount);
    kseedVotes[msg.sender].proposalAddr = _proposalAddr;
    kseedVotes[msg.sender].proposalQuestion = eachProposal[_proposalAddr]
      .proposalQuestion;
    kseedVotes[msg.sender].option = eachProposal[_proposalAddr]
      .options[_optionIndex];
    eachProposal[_proposalAddr]
      .optionVotes[_optionIndex] = eachProposal[_proposalAddr]
      .optionVotes[_optionIndex]
      .add(_amount);
    if (eachProposal[_proposalAddr].optionVotes[_optionIndex] > topVotes) {
      topOption = eachProposal[_proposalAddr].options[_optionIndex];
      topVotes = eachProposal[_proposalAddr].optionVotes[_optionIndex];
    }

    emit votedForProposal(
      msg.sender,
      eachProposal[_proposalAddr].proposalQuestion,
      kseedVotes[msg.sender].option
    );
  }

  function withdrawkSeed() public {
    require(
      block.number > eachProposal[proposals[0]].endBlock,
      'Voting has not ended yet!'
    );
    address propAddr = kseedVotes[msg.sender].proposalAddr;
    string memory propQuestion = kseedVotes[msg.sender].proposalQuestion;
    string memory currentQuestion = eachProposal[propAddr].proposalQuestion;
    if (keccak256(bytes(propQuestion)) == keccak256(bytes(currentQuestion))) {
      require(eachProposal[propAddr].endBlock < block.number);
    }

    uint256 amount = kseedVotes[msg.sender].votes;
    kseedIERC20.safeTransfer(msg.sender, amount);
    kseedVotes[msg.sender].votes = kseedVotes[msg.sender].votes.sub(amount);
    emit kseedWithdrawn(msg.sender, amount);
  }

  function addAdmin(address _admin) public _isAdmin {
    currentAdmins[_admin].isAdmin = true;
    emit newAdminAdded(msg.sender, _admin);
  }

  function removeAdmin(address _admin) public _isAdmin {
    currentAdmins[_admin].isAdmin = false;
    emit adminRemoved(msg.sender, _admin);
  }

  function depositETH(uint256 amount) public payable {
    require(msg.value == amount);
  }
}
