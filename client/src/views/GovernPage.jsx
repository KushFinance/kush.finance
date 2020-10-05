import kSEEDGovernance from "../contracts/kSEEDGovernance.json";
import { getWeb3Var } from "../shared";
import React, { Component } from "react";
import { Divider, Tabs } from "antd";
const { TabPane } = Tabs;




export default class Pump extends Component {

  state = {
    loaded: false,
    allowance: 0,
    getProposal: false,
    proposals: false,
    isApproving: false,
    isApproved: false,
  };

  handleClick = () => {
    this.props.toggle();
  };

  /** getters */
  getAllowance = async () => {
    let _kseedgovernanceAllowance = await this.kseedgovernanceInstance.methods
      .allowance(this.accounts[0], this.kseedgovernanceInstance._address)
      .call();
    if (_kseedgovernanceAllowance > 0) {
      this.setState({
        isApproved: true,
        allowance: this.web3.utils.fromWei(_kseedgovernanceAllowance.toString()),
      });
    }
  };

  proposals = async () => {
    let _proposals = await this.kseedgovernanceInstance.methods
      .call();
    this.setState({
      proposals: this.web3.utils.fromWei(this.state.proposals),
    });
  };
  getProposal = async () => {
    let _getProposal = await this.kseedgovernanceInstance.methods
      .call();
    this.setState({
      getProposal: this.web3.utils.fromWei(this.state.getProposal),
    });
  };

  approvekSEEDGovernance = async () => {
    if (this.state.isApproving) {
      return;
    }
    this.setState({ isApproving: true });

    let approveGovernance = await this.kseedgovernanceInstance.methods
      .approve(
        this.kseedgovernanceInstance._address,
      )
      .send({
        from: this.accounts[0],
      });

    if (approveGovernance["status"]) {
      this.setState({ isApproving: false, isApproved: true });
    }
  };


  componentDidMount = async () => {
    try {
      this.web3 = getWeb3Var();

      // Get network provider and web3 instance.

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.kseedgovernanceInstance = new this.web3.eth.Contract(
        kSEEDGovernance.abi,
        process.env.REACT_APP_KSEEDGOV_TOKEN_CONTRACT_ADDRESS
      );

      this.getAllowance();
      this.getProposal();
      this.approveGovernance();
      this.proposals();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      
      console.error(error);
    }
  };




  render() {
    return (
      <Tabs defaultActiveKey="1">
      <TabPane tab="INFO & FAQ" key="1">
      <div className="subpage govern">
        <h1>Governing Page & Fund FAQ</h1>

        <Divider orientation="left">Welcome to the steering wheel of a multi-million dollar machine</Divider>
        <p>In this system, kSEED holders will be able to freely govern the protocol as they wish. </p>
        <p>The voting and function calls operate on a bidding system.</p>
        <p>In which the bid with the most votes at the end of a round will be executed.</p>
        <p>A bid can be a call to a contract, or a combination of calls to one or multiple contracts.</p>
        <p>All within the same transaction.</p>

        <Divider orientation="left">What are Bids?</Divider>
        <p> Glad you asked! Bids are a set of instructions that relay what functions to call with the Voting Connector contract. </p>
        <p> A bid is composed of the Bidder's address, a unique bidId, and a series of arrays with types including Integers, Strings, and Bytes. </p>
        <p> With these data fields, anyone will be able to construct a bid with its own set of parameters for the function to be called.</p>
        
        <Divider />
        <p>Additionally, bids can be chained. No, this isn't street fighter. </p>
        <p>An additional bid can be chained to an initial bid. This additional bid is known as a chain bid. </p>
        <p> A chain bid requires an initial bid in order to be created. With chains, much more complex transactions can be created. </p>
        <p> It's a Pandora's box to be honest.</p>
        <h2>How does voting occur?</h2>
        <p>Voting for bids occurs within periods known as voting rounds. Before each round begins, kSEED holders can construct a bid and propose it in order to have it ready for voting.</p>
        <p></p>
        
        <Divider orientation="left">How does the machine maintain value?</Divider>
        <p>Any onlooker would immediately have is: Is the protocol dependent on turning a profit? </p>
        <p>Fortunately, the answer is no. </p>
        <p>The Kush Machine machine will never have to turn a single profit in order to maintain value for kSeed holders.</p>
        
        <Divider orientation="left">Here is why:</Divider>
        <p>All the funds held by the funding contract were generated by kSEED holders.</p> 
        <p>That have either staked their kSEED or kKUSH Liquidity tokens.</p> 
        <p>Now in order to make sure that value will always outpace minting and speculation.</p>
        <p>The goal of the Kush protocol is continuously burn kKUSH used as a fee for voting.</p>
        <p></p>
        <p>Half of this kKUSH will also be swapped for kOG in order to provide rewards for individuals that provide liquidity to kSeed.</p>
        <p></p>
        
        <Divider orientation="left">How do distributions work?</Divider>
        <p></p>
        <p>Voters decide when and what to distrubute, with certain limitations. </p>
        <p>Distributions can be called once every 2 days maximum. </p>
        <p>The distribution can be for any token held by the funding address. </p>
        <p>kKUSH and kOG distributions are limited to 10% of their available amount in any one transaction. </p>
        <p> Distributions of other assets can use all of the available asset.</p>
        <p></p>
        <p>In order to claim their proportion of the distributed asset.</p>
        <p>Claimers must stake their kSEED or kKUSH Liquidity tokens. </p>
        <p>The tokens will only be released when the distribution period has ended.</p>
        <p>This is to prevent users from unfairly claiming twice.</p>
        <p></p>
        
        <Divider orientation="left">Is the voting contract fool-proof?</Divider>
        <p>No contract is fool-proof. </p>
        <p>The Kush.Finance voting contracts, however are built with modularity in mind. </p>
        <p>Each contract can be upgraded, replaced and reconnected. </p>
        <p>Voters will only have to vote for a bid that reconnects the contract to the rest of the ecosystem. </p>
        <p>Built this way, Kush.Finance can continuously be updated</p>
        <p>By it's community without the need for a central developer.</p>
        <p>The voters can also vote for a transfer that pays an external auditor</p>
        <p>To look over any code in the ecosystem.</p>
        
        <button className="disabled launch-date">Voting starts late October</button>
      </div>
      </TabPane>
      <TabPane tab="Bid" disabled key="2">
       
      </TabPane>
      <TabPane tab="Vote"  key="3">
     
      <button onClick={this.approveGovernance}> APPROVE GOVERNANCE </button>
      

      {this.getProposal.toString()}
      {this.proposals.toString()}
      </TabPane>
      <TabPane tab="Claim" disabled key="4">
       
      </TabPane>
    </Tabs>
      
    );
  }
}
