import React, { Component } from "react";
import kSeedToken from "../contracts/kSeedToken.json";
import kKushToken from "../contracts/kKushToken.json";
import { getWeb3Var } from "../shared";
import nyanLogoIMG from "../assets/logo.png";
import { Input, Alert, Divider } from "antd";
import Balance from "../components/Balance";
export default class SeedingPage extends Component {
  state = {
    loaded: false,
    stakeAmount: 0,
    kseedBalance: 0,
    stakedAmount: 0,
    isApproved: false,
    isApproving: false,
    isStaking: false,
    isWithdrawing: false,
    kkushRewards: 0,
    totalkSeedSupply: 0,
    allowance: 0,
  };

  handleClick = () => {
    this.props.toggle();
  };

  /** getters */
  getAllowance = async () => {
    let _kseedAllowance = await this.kseedInstance.methods
      .allowance(this.accounts[0], this.kkushInstance._address)
      .call();
    if (_kseedAllowance > 0) {
      this.setState({
        isApproved: true,
        allowance: this.web3.utils.fromWei(_kseedAllowance.toString()),
      });
    }
  };

  getkSeedBalance = async () => {
    let _kseedBalance = await this.kseedInstance.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({
      kseedBalance: this.web3.utils.fromWei(_kseedBalance),
    });
  };

  getkSeedSupply = async () => {
    let _kseedSupply = await this.kseedInstance.methods.totalSupply().call();
    this.setState({
      totalkSeedSupply: this.web3.utils.fromWei(_kseedSupply),
    });
  };

  getMyStakeAmount = async () => {
    let stakeA = await this.kkushInstance.methods
      .getAddressStakeAmount(this.accounts[0])
      .call();

    this.setState({ stakedAmount: this.web3.utils.fromWei(stakeA) });
  };

  getkKushRewards = async () => {
    let cRewards = await this.kkushInstance.methods
      .myRewardsBalance(this.accounts[0])
      .call();

    this.setState({ kkushRewards: this.web3.utils.fromWei(cRewards) });
  };

  /** setters & modifiers */
  updateStakingInput(e) {
    this.setState({ stakeAmount: e.target.value });

    if (
      this.state.stakeAmount > this.state.allowance ||
      this.state.kseedBalance
    ) {
      // disable button
    } else {
      // enable button
    }

    /*
    if (this.state.stakeAmount > this.state.allowance && !this.state.isApproved) {
        this.setState({isApproved: false})
    }
    */
  }

  stakekSeed = async () => {
    if (
      this.state.isStaking ||
      this.state.stakeAmount === 0 ||
      this.state.stakeAmount > this.state.kseedBalance
    ) {
      return;
    }

    this.setState({ isStaking: true });
    try {
      let stakeRes = await this.kkushInstance.methods
        .stake(this.web3.utils.toWei(this.state.stakeAmount.toString()))
        .send({
          from: this.accounts[0],
        });
      if (stakeRes["status"]) {
        this.setState({ isStaking: false, stakeAmount: 0 });
        this.getMyStakeAmount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  withdrawkSeed = async () => {
    if (this.state.isWithdrawing || this.state.stakeAmount === 0) {
      return;
    }
    this.setState({ isWithdrawing: true });
    try {
      let unstakeRes = await this.kkushInstance.methods
        .withdraw(this.web3.utils.toWei(this.state.stakeAmount.toString()))
        .send({
          from: this.accounts[0],
        });

      if (unstakeRes["status"]) {
        this.setState({ isWithdrawing: false, stakeAmount: 0 });
        this.getMyStakeAmount();
      } else {
        this.setState({ isWithdrawing: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  approvekSeed = async () => {
    if (this.state.isApproving) {
      return;
    }
    this.setState({ isApproving: true });

    let approveStaking = await this.kseedInstance.methods
      .approve(
        this.kkushInstance._address,
        this.web3.utils.toWei(this.state.totalkSeedSupply.toString())
      )
      .send({
        from: this.accounts[0],
      });

    if (approveStaking["status"]) {
      this.setState({ isApproving: false, isApproved: true });
    }
  };

  setInputField() {
    if (this.state.stakeAmount >= 0) {
      return this.state.stakeAmount;
    } else {
      return "";
    }
  }

  setMaxkSeed() {
    this.setState({ stakeAmount: this.state.kseedBalance });
  }

  setMaxkSeedUnstake() {
    this.setState({ stakeAmount: this.state.stakedAmount });
  }

  claimRewards = async () => {
    if (this.state.kkushRewards > 0) {
      await this.kkushInstance.methods.getReward().send({
        from: this.accounts[0],
      });

      this.getkKushRewards();
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

      this.kseedInstance = new this.web3.eth.Contract(
        kSeedToken.abi,
        process.env.REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS
      );

      this.kkushInstance = new this.web3.eth.Contract(
        kKushToken.abi,
        process.env.REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS
      );

      this.getAllowance();
      this.getkSeedSupply();
      this.getkSeedBalance();
      this.getMyStakeAmount();
      this.getkKushRewards();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  render() {
    return (
      <div class="subpage seeding">
        <h1>Stake $kSEED to mine $kKUSH</h1>
        <Alert
          message="Make sure to always claim mining rewards before staking more!"
          type="warning"
          showIcon
        />
        <Divider />
        <div className="amount-staked-box">
          <img alt="nyan logo" src={nyanLogoIMG} />
          <div className="block">
            <div className="desc">Amount staked</div>
            <div className="val nyan-balance">{this.state.stakedAmount}</div>
          </div>
          <div class="block">
            <div className="desc">Your kSEED balance</div>
            <div className="val nyan-balance">{this.state.kseedBalance}</div>
          </div>
        </div>
        <div className="seeding-input">
          <div>
            <Input prefix="kSEED" onChange={this.updateStakingInput.bind(this)} value={this.setInputField()} />
          </div>
          <div className="seeding-buttons">
            <button onClick={this.setMaxkSeedUnstake.bind(this)}> Max amount to unstake </button>
            <button onClick={this.setMaxkSeed.bind(this)}> Max amount to stake </button>
          </div>
        </div>
        {!this.state.isApproved ? (
          <div type="primary" className="process-button" onClick={this.approvekSeed} block >
            {!this.state.isApproving ? <div>STEP 1/2: APPROVE</div> : null}
            {this.state.isApproving ? <div>APPROVING...</div> : null}
          </div>
        ) : null}
        {this.state.isApproved ? (
          <div
            type="primary"
            className={`process-button ${
              this.state.stakeAmount > 0 && this.state.stakeAmount < this.state.kseedBalance ? 
              "" : "disabled" }
            `}
            onClick={this.stakekSeed}
            block
          >
            {!this.state.isStaking ? <div>STEP 2/2: STAKE</div> : null}
            {this.state.isStaking ? <div>STAKING...</div> : null}
          </div>
        ) : null}
        <div
          className={`process-button withdraw-button ${
            (this.state.kseedBalance > 0 || this.state.stakeAmount > 0) && this.state.stakeAmount <= this.state.stakedAmount ?
              "" : "disabled"}
          `}
          onClick={this.withdrawkSeed}
        >
          {!this.state.isWithdrawing ? <div>WITHDRAW</div> : null}
          {this.state.isWithdrawing ? <div>WITHDRAWING...</div> : null}
        </div>
        <Divider />
        <div className="flex spaced full-w align-center">
          <h1>GET $kKUSH</h1>
          <button onClick={this.getkKushRewards}> UPDATE </button>
        </div>
        <p> INFO: KUSH rewards grow per block and are updated on each transaction(send) to functions with the "updateStakingRewards" modifier. </p>
        
        
        
        <input
          className="input"
          disabled
          value={this.state.kkushRewards}
          placeholder={this.state.kkushRewards}
          type="number"
        ></input>
        <div
          className={`process-button ${
            this.state.kkushRewards > 0 ? "" : "disabled"
          }`}
          onClick={this.claimRewards}
        >
          CLAIM
        </div>
      </div>
    );
  }
}
