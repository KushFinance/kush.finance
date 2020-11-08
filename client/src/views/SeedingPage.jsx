import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import kKUSHicon from "../assets/kKUSH.png";
import kseedLogoIMG from "../assets/logo.png";
import { Input, Alert, Divider,PageHeader } from "antd";
import { createFromIconfontCN } from '@ant-design/icons';
const SpiryIcon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1952854_f44r3qwutiv.js'})

export default function SeedingPage() {
  const [loaded, setLoaded] = useState(false);
  const [kseedBalance, setKseedBalance] = useState(0);
  const [totalkSeedSupply, setTotalkSeedSupply] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [kkushRewards, setKkushRewards] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const kseedInstance = useSelector((state) => state.kseedInstance)
  const kushInstance = useSelector((state) => state.kushInstance)
  const web3 = useSelector(state => state.web3Instance);
  const accounts = useSelector(state => state.accounts);

  async function getAllowance() {
    let _kseedAllowance = await kseedInstance.methods.allowance(accounts[0], kushInstance._address).call();
    if (_kseedAllowance > 0) {
      setIsApproved(true);
      setAllowance(web3.utils.fromWei(_kseedAllowance.toString()));
    }
  };

  async function getkSeedBalance() {
    let _kseedBalance = await kseedInstance.methods.balanceOf(accounts[0]).call();
    setKseedBalance(web3.utils.fromWei(_kseedBalance));
  };

  async function getkSeedSupply() {
    let _kseedSupply = await kseedInstance.methods.totalSupply().call();
    setTotalkSeedSupply(web3.utils.fromWei(_kseedSupply));
  };

  async function getMyStakeAmount() {
    let _stakedAmount = await kushInstance.methods.getAddressStakeAmount(accounts[0]).call();
    setStakedAmount(web3.utils.fromWei(_stakedAmount));
  };

  async function getkKushRewards(){
    let cRewards = await kushInstance.methods.myRewardsBalance(accounts[0]).call();
    setKkushRewards(web3.utils.fromWei(cRewards));
  };

  /** setters & modifiers */
  function updateStakingInput(e) {
    setStakeAmount(e.target.value);
    if ( stakeAmount > allowance || kseedBalance) {
      // disable button
    } else {
      // enable button
    }
  }

  async function stakekSeed() {
    if ( isStaking || stakeAmount === 0 || stakeAmount > kseedBalance) {
      return;
    }

    setIsStaking(true);
    try {
      let stakeRes = await kushInstance.methods.stake(web3.utils.toWei(stakeAmount.toString()))
        .send({
          from: accounts[0],
        });
      if (stakeRes["status"]) {
        setIsStaking(false);
        setStakeAmount(0);
        getMyStakeAmount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function withdrawkSeed(){
    if (isWithdrawing || stakeAmount === 0) {
      return;
    }
    setIsWithdrawing(true)
    try {
      let unstakeRes = await kushInstance.methods
        .withdraw(web3.utils.toWei(stakeAmount.toString()))
        .send({
          from: accounts[0],
        });

      if (unstakeRes["status"]) {
        setIsWithdrawing(false);
        setStakeAmount(0);
        getMyStakeAmount();
      } else {
        setIsWithdrawing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approvekSeed = async () => {
    if (isApproving) {
      return;
    }
    setIsApproving(true);
    let approveStaking = await kseedInstance.methods
      .approve(
        kushInstance._address,
        web3.utils.toWei(totalkSeedSupply.toString())
      ).send({ from: accounts[0] });

    if (approveStaking["status"]) {
      setIsApproving(false);
      setIsApproved(true);
    }
  };

  const setInputField = () => {
    if (stakeAmount >= 0) {
      return stakeAmount;
    } else {
      return null;
    }
  }

  function setMaxkSeed() {
    setStakeAmount(kseedBalance);
  }

  function setMaxkSeedUnstake() {
    setStakeAmount(stakedAmount);
  }

  async function claimRewards() {
    if (kkushRewards > 0) {
      await kushInstance.methods.getReward().send({ from: accounts[0] });
      getkKushRewards();
    }
  };
  useEffect(()=>{
    
    (async () => { 
      if(web3.eth && kseedInstance.methods && kushInstance.methods){
        try {
  
          getAllowance();
          getkSeedSupply();
          getkSeedBalance();
          getMyStakeAmount();
          getkKushRewards();
  
          setLoaded(true)
        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
      }
    })();
  },[kseedInstance, kushInstance, web3])
    return (
      <div className="subpage seeding">
         <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title="Seeding kSEED for kKUSH"
            backIcon={<SpiryIcon type='iconLeft-' />}
            avatar={{ src: kseedLogoIMG }}
          />
        <Alert
          message="Make sure to always claim mining rewards before staking more!"
          type="warning"
          showIcon
        />
        <Divider />
        <div className="amount-staked-box">
          <img alt="kSeed" src={kseedLogoIMG} />
          <div className="block">
            <div className="desc">Amount staked</div>
            <div className="val kseed-balance">{stakedAmount}</div>
          </div>
          <div className="block">
            <div className="desc">Your kSEED balance</div>
            <div className="val kseed-balance">{kseedBalance}</div>
          </div>
        </div>
        <div className="farm-input">
          <div>
            <Input prefix="kSEED" onChange={updateStakingInput.bind(this)} value={setInputField()} />
          </div>
          <div className="farm-buttons">
            <button onClick={setMaxkSeedUnstake.bind(this)}> Max amount to unstake </button>
            <button onClick={setMaxkSeed.bind(this)}> Max amount to stake </button>
          </div>
        </div>
        {!isApproved ?
          <div type="primary" className="process-button" onClick={approvekSeed} block >
            <div> {isApproving ? "APPROVING..." : "STEP 1/2: APPROVE"} </div>
          </div>
          :
          <div
            type="primary"
            className={`process-button ${ stakeAmount > 0 && stakeAmount < kseedBalance ? "" : "disabled" }`}
            onClick={stakekSeed}
          >
            <div>
              {isStaking ? "STAKING..." : "STEP 2/2: STAKE"}
            </div>
          </div>
        }
        <div
          className={`process-button withdraw-button ${ (kseedBalance > 0 || stakeAmount > 0) && stakeAmount <= stakedAmount ? "" : "disabled"}`}
          onClick={withdrawkSeed}
        >
          <div>
            {isWithdrawing ? "WITHDRAWING..." : "WITHDRAW"}
          </div>
        </div>
        <Divider />
        <div className="flex spaced full-w align-center">
          <PageHeader
            className="site-page-header"
            title="Get kKUSH"
            avatar={{ src: kKUSHicon }}
          />
          <button onClick={getkKushRewards}> UPDATE </button>
        </div>
        <p> INFO: KUSH rewards grow per block and are updated on each transaction(send) to functions with the "updateStakingRewards" modifier. </p>
        <input
          className="input"
          disabled
          value={kkushRewards}
          placeholder={kkushRewards}
          type="number"
        ></input>
        <div
          className={`process-button ${kkushRewards > 0 ? "" : "disabled"}`}
          onClick={claimRewards}
        >
          CLAIM
        </div>
      </div>
    );
}
