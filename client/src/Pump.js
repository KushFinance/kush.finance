import React, { Component } from "react";

export default class Pump extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <h1>PUMP FUND</h1>
            <h3>Let's build a whale!</h3>

            <div>
                <p>kSEED is introducing a publically governed Uniswap Hedge fund.</p>
            </div>
            
            <div>
                <p>20% of all minted KUSH goes to a funding contract every few days.</p>
            </div>
          
            <div>
                <p>kSEED holders will be able to vote on which Uniswap token the contract will swap for. </p>
            </div>

            <div>
              <p>The contract will hold the token for a specified amount of blocks or until kSEED holders
                    vote for a swap back to KUSH</p>
            </div>
            
            <div>
                <p>During a swap back to KUSH, the resulting KUSH will
                    be proportionately distributed to kSEED holders.</p>
            </div>

            <div className="vote-nyan"></div>

            <div className="button launch-date">Voting starts late October</div>
        </div>
      </div>
    );
  }
}
