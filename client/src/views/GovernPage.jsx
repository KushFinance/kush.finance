import React, { Component } from "react";
import { Divider } from "antd";
export default class Pump extends Component {
  render() {
    return (
      <div className="subpage govern">
        <h1>PUMP FUND</h1>
        <h2>Welcome to the steering wheel of a multi-million dollar machine</h2>
        <Divider />
        <p>In this system, kSEED holders will be able to freely govern the protocol as they wish. </p>
        <p>The voting and function calls operate on a bidding system.</p>
        <p>In which the bid with the most votes at the end of a round will be executed.</p>
        <p>A bid can be a call to a contract, or a combination of calls to one or multiple contracts, all within the same transaction.</p>
        <h2>What are Bids?</h2>
        <Divider />
        <p> Glad you asked! Bids are a set of instructions that relay what functions to call with the Voting Connector contract. </p>
        <p> A bid is composed of the Bidder's address, a unique bidId, and a series of arrays with types including Integers, Strings, and Bytes. </p>
        <p> With these data fields, anyone will be able to construct a bid with its own set of parameters for the function to be called.</p>
        <Divider />
        <p>Additionally, bids can be chained. No, this isn't street fighter. </p>
        <p>An additional bid can be chained to an initial bid. This additional bid is known as a chain bid. </p>
        <p> A chain bid requires an initial bid in order to be created. With chains, much more complex transactions can be created. </p>
        <p> It's a Pandora's box to be honest.</p>
        <Divider />
        <h2>How does voting occur?</h2>
        <p>Voting for bids occurs within periods known as voting rounds. Before each round begins, kSEED holders can construct a bid and propose it in order to have it ready for voting.</p>
        <p></p>
        <button className="disabled launch-date">Voting starts late October</button>
        <Divider />

      </div>
    );
  }
}
