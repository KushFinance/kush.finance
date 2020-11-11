import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import ethLogo from "../assets/eth.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png";
import { Input, Alert, Divider, PageHeader, Button } from "antd";
import { createFromIconfontCN } from '@ant-design/icons';
const SpiryIcon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1952854_f44r3qwutiv.js'})

export default function FarmingPage() {
  const [loaded, setLoaded] = useState(false);
  const [totalkushOGUniSupply, setTotalkushOGUniSupply] = useState(0);
  const [kushOGUniAmount, setKushOGUniAmount] = useState(0);
  const [kushOGRewards, setKushOGRewards] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [miningStarted, setMiningStarted] = useState(true);

  const kushOGInstance = useSelector((state) => state.kushOGInstance)
  const kushOGUniInstance = useSelector((state) => state.kushOGUniInstance)
  const web3 = useSelector(state => state.web3Instance);
  const accounts = useSelector(state => state.accounts);

  function setInputField() {
    if (stakeAmount >= 0) {
      return stakeAmount;
    } else {
      return null;
    }
  }

  function updateStakingInput(e) {
    setStakeAmount(e.target.value);
    if (stakeAmount > allowance) {
      setIsApproved(false);
    }
  }

  async function getkushOGUniAmount() {
    let _kushOGUniAmount = await kushOGUniInstance.methods
      .balanceOf(accounts[0])
      .call();
      setKushOGUniAmount(web3.utils.fromWei(_kushOGUniAmount));
  };

  async function getkushOGUniAllowance() {
    let _kushOGUniAllowance = await kushOGUniInstance.methods
      .allowance(accounts[0], kushOGInstance._address)
      .call();
    if (_kushOGUniAllowance > 0) {
      setIsApproved(true);
      setAllowance(web3.utils.fromWei(_kushOGUniAllowance.toString()));
    }
    console.log(allowance);
  };

  async function getkushOGSupply() {
    let _kushOGSupply = await kushOGInstance.methods.totalSupply().call();
    setTotalkushOGUniSupply(web3.utils.fromWei(_kushOGSupply));
  };

  async function approvekushOGUni() {
    if (isApproving) {
      return;
    }
    setIsApproving(true);

    try {
      let approveStaking = await kushOGUniInstance.methods
        .approve(kushOGInstance._address, web3.utils.toWei(totalkushOGUniSupply.toString()))
        .send({ from: accounts[0] });
      if (approveStaking["status"]) {
        setIsApproving(false);
        setIsApproved(true);
      }
    } catch {
      setIsApproving(false);
      setIsApproved(false);
    }
  };

  async function getkushOGUniStakeAmount() {
    let stakeA = await kushOGInstance.methods
      .getkKushUniStakeAmount(accounts[0])
      .call();
    console.log(stakeA);
    setStakedAmount(web3.utils.fromWei(stakeA));
  };

  async function getRewardsAmount() {
    let rewards = await kushOGInstance.methods
      .myRewardsBalance(accounts[0])
      .call();
      setKushOGRewards(web3.utils.fromWei(rewards));
  };

  async function getReward() {
    setIsClaiming(true);
    let myRewards = await kushOGInstance.methods.getReward()
    .send({ from: accounts[0] });

    if (myRewards["status"]) {
      setIsClaiming(false);
      setKushOGRewards();
    }
  };

  async function stakekushOGUni() {
    if (isStaking || stakeAmount === 0) {
      return;
    }
    setIsStaking(true);
    console.log(web3.utils.toWei(stakeAmount.toString()));
    try {
      let stakeRes = await kushOGInstance.methods
        .stakekKushUni(web3.utils.toWei(stakeAmount.toString()))
        .send({ from: accounts[0] });
      if (stakeRes["status"]) {
        setIsStaking(false);
        setStakeAmount(0);
        getkushOGUniStakeAmount();
      }
    } catch (error) {
      setIsStaking(false);
      console.log(error);
    }
  };

  async function withdrawkKushUni() {
    if (isWithdrawing || stakeAmount === 0) {
      return;
    }
    setIsWithdrawing(true);

    try {
      let stakeRes = await kushOGInstance.methods
        .withdrawkKushUni(web3.utils.toWei(stakeAmount.toString()))
        .send({ from: accounts[0] });
      if (stakeRes["status"]) {
        setIsWithdrawing(false);
        setStakeAmount(0);
        getkushOGUniStakeAmount();
      }
    } catch (error) {
      setIsStaking(false);
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if(kushOGInstance.methods && kushOGUniInstance.methods){
        console.log('main', kushOGInstance.methods)
        console.log('uni', kushOGUniInstance.methods)

        try {
          await getkushOGUniStakeAmount();
          await getkushOGSupply();
          await getkushOGUniAllowance();
          await getkushOGUniAmount();
          await getRewardsAmount();

          setLoaded(true);
        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
      }
    })();
  }
  ,[web3, kushOGInstance.methods, kushOGUniInstance.methods]);

  return (
    <div className="subpage">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        backIcon={<SpiryIcon type='iconLeft-' />}
        title="Farm kushOG with kKUSH/ETH Liquidity"
        subTitle=""
        avatar={{ src: kOGLogo }}
      />
      <Divider>Create the bridge to the Polkadot network and NFT Markets!</Divider>
      
      <p> kushOG is an extension to the KUSH.FINANCE ecosystem that will allow kSEED voters to acquire non ERC20 assets.</p>
      <p> kushOG will also be used for KushART in the way that you can generate limited edition NFTs burning a certain amount</p>
      <p> 20% of all minted kushOG will go to a funding contract.</p>
      <p> kushOG is a rarity. The only way to mint more k.OG is to provide liquidity for k.KUSH.</p>
      
      <Divider>How to farm kushOG ($kOG)?</Divider>
      <h2>Instructions </h2>
      <p> 1. Go to Uniswap kKush/ETH pair. </p>
      <p> 2. Add Liquidity. </p>
      <p> 3. Come back to kush.finance </p>
      <p> 4. Farm $kushOG </p>
      <Button href="https://uniswap.exchange/add/0x538b4b507d57bf9ebd8847ec395b7b061c150181/ETH" target="_blank" rel="noopener noreferrer" shape="round" type="primary" size="24px">JOIN kKUSH/ETH Uniswap Pool</Button>
      
      
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
        <div className="val kush-balance">
          {kushOGUniAmount}
        </div>
      </div>
      <div className="block">
        <div className="desc">Amount farming</div>
          <div className="val kush-balance">
            {stakedAmount}
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
            {kushOGRewards}
          </div>
        </div>
      </div>
      
      <Input onChange={updateStakingInput.bind(this)} value={setInputField()} style={{background:'green',marginTop: '12px'}}/>

      {!miningStarted && !isStaking &&
        <div className="process-button">
          <div> FARMING HAS NOT STARTED </div>
        </div>
      }
      {!isApproved && miningStarted && 
        <div className="process-button" onClick={approvekushOGUni}>
          <div> {isApproving ? "APPROVING..." : "APPROVE"} </div>
        </div>
      }
      {miningStarted &&
        <div className="process-button" onClick={getReward}>
          <div> {isClaiming ? "CLAIMING..." : "CLAIM REWARDS"} </div>
        </div>
      }
      {isApproved && miningStarted &&
        <div
          className="process-button enabled"
          onClick={stakekushOGUni}
        >
          <div> {isStaking ? "FARMING..." : "STEP 2: FARM"} </div>
        </div>
      }
      {miningStarted &&
        <div
          className="process-button withdraw-button enabled"
          onClick={withdrawkKushUni}>
            <div> {isWithdrawing ? "WITHDRAWING..." : "WITHDRAW"} </div>
        </div>
      }
    </div>
  );
}
