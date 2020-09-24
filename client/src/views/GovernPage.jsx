import React, { Component } from "react";
import { Divider } from "antd";
export default class Pump extends Component {
  render() {
    return (
      <div className="subpage govern">
        <h1>PUMP FUND</h1>
        <h2>Let's build a mini-whale or a mega-whale?!</h2>
        <Divider />
        <p>KUSH.FINANCE is introducing a publically governed Uniswap Hedge fund.</p>
        <p> 20% of all minted KUSH goes to a funding contract every few days.</p>
        <p> kSEED holders will be able to vote on which Uniswap token the contract will swap for.</p>
        <p> The contract will hold the token for a specified amount of blocks or until kSEED holders vote for a swap back to kKUSH</p>
        <p> During a swap back to kKUSH, the resulting kKUSH will be proportionately distributed to kSEED holders.</p>
        <button className="disabled launch-date">Voting starts late October</button>
      </div>
    );
  }
}
