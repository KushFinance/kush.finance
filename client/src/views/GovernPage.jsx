import React from "react";
import { Divider, Tabs, PageHeader } from "antd";
import GovernanceVotingTab from "../components/GovernanceVotingTab";
import { createFromIconfontCN } from '@ant-design/icons';
const SpiryIcon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1952854_f44r3qwutiv.js'})
const { TabPane } = Tabs;


export default function Pump() {

  return (
    <div className="subpage govern">
    <PageHeader
      className="site-page-header"
      onBack={() => window.history.back()}
      title="Governing Page & Fund FAQ"
      backIcon={<SpiryIcon type='iconLeft-' />}
    />
    <Tabs defaultActiveKey="1">
      <TabPane tab="INFO & FAQ" key="1">
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
      </TabPane>
      <TabPane tab="Governance Voting"  key="2">
       <GovernanceVotingTab/>
      </TabPane>
      <TabPane tab="Fund Bidding" disabled key="3">

      </TabPane>
      <TabPane tab="Fund Voting" disabled key="4">
       
      </TabPane>
      <TabPane tab="Claim Fund Rewards" disabled key="5">
       
      </TabPane>
    </Tabs>
      </div>
  );
}
