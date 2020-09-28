import React, { Component } from "react";
import kushOG from "../contracts/kushOGToken.json";
import kushOGUni from "../contracts/kushOGtokenUni.json";
import { getWeb3Var } from "../shared";
import ethLogo from "../assets/eth.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png";
import { Input, Alert, Divider, PageHeader, Button } from "antd";
import { useGlobal } from 'reactn';

export default class FarmingPage extends Component {
  state = {
    loaded: false,
    stakeAmount: 0,
    stakedAmount: 0,
    kushOGUniAmount: 0,
    miningStarted: true,
    isApproved: false,
    isApproving: false,
    isStaking: false,
    isWithdrawing: false,
    kushOGRewards: 0,
    totalkushOGUniSupply: 0,
    allowance: 0,
    isClaiming: false,
  };

  handleClick = () => {
    this.props.toggle();
  };

  setInputField() {
    if (this.state.stakeAmount >= 0) {
      return this.state.stakeAmount;
    } else {
      return null;
    }
  }

  updateStakingInput(e) {
    this.setState({ stakeAmount: e.target.value });
    if (this.state.stakeAmount > this.state.allowance) {
      this.setState({ isApproved: false });
    }
  }

  getkushOGUniAmount = async () => {
    let _kushOGUniAmount = await this.kushOGUniInstance.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({
      kushOGUniAmount: this.web3.utils.fromWei(_kushOGUniAmount),
    });
  };

  getkushOGUniAllowance = async () => {
    let _kushOGUniAllowance = await this.kushOGUniInstance.methods
      .allowance(this.accounts[0], this.kushOGInstance._address)
      .call();
    if (_kushOGUniAllowance > 0) {
      this.setState({
        isApproved: true,
        allowance: this.web3.utils.fromWei(_kushOGUniAllowance.toString()),
      });
    }
    console.log(this.state.allowance);
  };

  getkushOGSupply = async () => {
    let _kushOGSupply = await this.kushOGInstance.methods.totalSupply().call();
    this.setState({
      totalkushOGUniSupply: this.web3.utils.fromWei(_kushOGSupply),
    });
  };

  approvekushOGUni = async () => {
    if (this.state.isApproving) {
      return;
    }
    this.setState({ isApproving: true });

    try {
      let approveStaking = await this.kushOGUniInstance.methods
        .approve(
          this.kushOGInstance._address,
          this.web3.utils.toWei(this.state.totalkushOGUniSupply.toString())
        )
        .send({
          from: this.accounts[0],
        });

      if (approveStaking["status"]) {
        this.setState({ isApproving: false, isApproved: true });
      }
    } catch {
      this.setState({ isApproving: false, isApproved: false });
    }
  };

  getkushOGUniStakeAmount = async () => {
    let stakeA = await this.kushOGInstance.methods
      .getkKushUniStakeAmount(this.accounts[0])
      .call();
    console.log(stakeA);
    this.setState({ stakedAmount: this.web3.utils.fromWei(stakeA) });
  };

  getRewardsAmount = async () => {
    let rewards = await this.kushOGInstance.methods
      .myRewardsBalance(this.accounts[0])
      .call();

    this.setState({ kushOGRewards: this.web3.utils.fromWei(rewards) });
  };

  getReward = async () => {
    this.setState({ isClaiming: true });

    let myRewards = await this.kushOGInstance.methods.getReward().send({
      from: this.accounts[0],
    });

    if (myRewards["status"]) {
      this.setState({ isClaiming: false, kushOGRewards: 0 });
    }
  };

  stakekushOGUni = async () => {
    if (this.state.isStaking || this.state.stakeAmount === 0) {
      return;
    }
    this.setState({ isStaking: true });
    console.log(this.web3.utils.toWei(this.state.stakeAmount.toString()));
    try {
      let stakeRes = await this.kushOGInstance.methods
        .stakekKushUni(this.web3.utils.toWei(this.state.stakeAmount.toString()))
        .send({
          from: this.accounts[0],
        });
      if (stakeRes["status"]) {
        this.setState({ isStaking: false, stakeAmount: 0 });
        this.getkushOGUniStakeAmount();
      }
    } catch (error) {
      this.setState({ isStaking: false });
      console.log(error);
    }
  };

  withdrawkKushUni = async () => {
    if (this.state.isWithdrawing || this.state.stakeAmount === 0) {
      return;
    }
    this.setState({ isWithdrawing: true });

    try {
      let stakeRes = await this.kushOGInstance.methods
        .withdrawkKushUni(
          this.web3.utils.toWei(this.state.stakeAmount.toString())
        )
        .send({
          from: this.accounts[0],
        });
      if (stakeRes["status"]) {
        this.setState({ isWithdrawing: false, stakeAmount: 0 });
        this.getkushOGUniStakeAmount();
      }
    } catch (error) {
      this.setState({ isStaking: false });
      console.log(error);
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

      console.log(this.web3.eth);

      this.kushOGUniInstance = new this.web3.eth.Contract(
        kushOGUni,
        "0xdd0e143868b34d97355f249a4ddffbee03fd0481"
      );

      this.kushOGInstance = new this.web3.eth.Contract(
        kushOG.abi,
        "0x8ddf8af6a26d316ac07269dd490bbfb31718a3d4"
      );

      this.getkushOGUniStakeAmount();
      this.getkushOGSupply();
      this.getkushOGUniAllowance();
      this.getkushOGUniAmount();
      this.getRewardsAmount();

      //   this.getMyStakeAmount();
      //   this.getCatnipRewards();

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
      <div class="subpage">
        <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title="Farm kushOG with kKUSH/ETH Liquidity"
            subTitle=""
            avatar={{ src: kOGLogo }}
            />
        <Divider>Create the bridge to the Polkadot network!</Divider>
        
        <p> kushOG is an extension to the KUSH.FINANCE ecosystem that will allow kSEED voters to acquire non ERC20 assets.</p>
        <p> 20% of all minted kushOG will go to a funding contract.</p>
        <p> kushOG is a rarity. The only way to mint more k.OG is to provide liquidity for k.KUSH.</p>
        
        <Divider>How to farm kushOG[$kOG]?</Divider>
   
        <h2>Instructions </h2>
        <p> 1. Go to Uniswap kKush/ETH pair. </p>
        <p> 2. Add Liquidity. </p>
        <p> 3. Come back to kush.finance </p>
        <p> 4. Farm $kushOG </p>
        <Button href="https://uniswap.info/pair/0xdd0e143868b34d97355f249a4ddffbee03fd0481" target="_blank" rel="noopener noreferrer" shape="round" type="primary" size="24px">JOIN kKUSH/ETH Uniswap Pool</Button>
        
        
        <Divider />
        
        <Alert
          className="margin"
          message="Make sure to always claim mining rewards before staking more!"
          type="warning"
          showIcon
        />

        <div className="amount-staked-box">
        <img className="balance-logo-image" src={kKUSHicon} alt="kKUSH icon"/>
            /
            <img className="balance-logo-image" src={ethLogo} alt="ETH logo" />
          <div className="block amount-staked-image">

          </div>  
          <div className="block">
            <div className="desc">Amount in Wallet</div>
            <div className="val nyan-balance">
              {this.state.kushOGUniAmount}
            </div>
          </div>
          <div className="block">
            <div className="desc">Amount farming</div>
            <div className="val nyan-balance">
              {this.state.stakedAmount}
            </div>
          </div>
        </div>

        <div className="amount-staked-box">
          <div className="block amount-staked-image">
            <img className="reward-logo-image" src={kOGLogo} alt="kOG logo" />
          </div>
          <div className="block">
            <div className="desc">kushOG Rewards</div>
            <div className="val nyan-balance">
              {this.state.kushOGRewards}
            </div>
          </div>
        </div>
        
        <Input onChange={this.updateStakingInput.bind(this)} value={this.setInputField()} style={{marginTop: '12px'}}/>

        {!this.state.miningStarted ? (
          <div className="process-button">
            {!this.state.isStaking ? <div> FARMING HAS NOT STARTED </div> : null}
          </div>
        ) : null}
        {!this.state.isApproved && this.state.miningStarted ? (
          <div className="process-button" onClick={this.approvekushOGUni}>
            {!this.state.isApproving ? <div> APPROVE </div> : null}
            {this.state.isApproving ? <div> APPROVING...</div> : null}
          </div>
        ) : null}
        {this.state.miningStarted ? (
          <div className="process-button" onClick={this.getReward}>
            {!this.state.isClaiming ? <div> CLAIM REWARDS </div> : null}
            {this.state.isClaiming ? <div> CLAIMING...</div> : null}
          </div>
        ) : null}
        {this.state.isApproved && this.state.miningStarted ? (
          <div
            className={`process-button ${
              this.state.stakeAmount > 0 && this.state.stakeAmount < this.state.kushBalance ?
              "enabled" : "enabled"
            }`}
            onClick={this.stakekushOGUni}
          >
            {!this.state.isStaking ? <div> STEP 2: FARM </div> : null}
            {this.state.isStaking ? <div> FARMING...</div> : null}
          </div>
        ) : null}
        {this.state.miningStarted ? (
          <div
            className={`process-button withdraw-button ${
              this.state.stakeAmount > 0 && this.state.stakeAmount <= this.state.kushOGRewards ?
              "enabled" : "enabled"
            }`}
            onClick={this.withdrawkKushUni}>
            {!this.state.isWithdrawing ? <div> WITHDRAW </div> : null}
            {this.state.isWithdrawing ? <div> WITHDRAWING...</div> : null}
          </div>
        ) : null}
      </div>
    );
  }
}
