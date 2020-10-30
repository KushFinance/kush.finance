import React from 'react';
import {Statistic} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'reactn';

function toFixed(num, fixed) {
    let re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
    return num.toString().match(re)[0];
}



function Wallet(props) {
    const [totalkSeedStaked, setTotalkSeedStaked] = useState(0);
    const [kseedBalance, setKseedBalance] = useState(0);
    const [totalkSeedSupply, setTotalkSeedSupply] = useState(0);
    const [totalKushSupply, setTotalKushSupply] = useState(0);
    const [isViewingGifts, setIsViewingGifts] = useState(false);
    const [web3, setWeb3] = useState({});

    const getRoundedTotalkSeedStaked = () => {
        if (!isNaN(totalkSeedStaked)) {
          return parseFloat(totalkSeedStaked).toFixed(2);
        }
        return totalkSeedStaked;
    }
    
    const getkSeedBalance = async () => {
        let x = await kseedInstance.methods.balanceOf(accounts[0]).call();
        setKseedBalance(web3.utils.fromWei(x));
    };
    
    const getkSeedSupply = async () => {
        let x = await kseedInstance.methods.totalSupply().call();
        setTotalkSeedSupply(web3.utils.fromWei(x));
      };
    
    const getTotalkSeedStaked = async () => {
        let x = await kushInstance.methods.totalStakedSupply().call();
        setTotalkSeedStaked(web3.utils.fromWei(x));
    };
    const getKushSupply = async () => {
        let x = await kushInstance.methods.totalSupply().call();
        setTotalKushSupply(web3.utils.fromWei(x));
    };
    const setkSeedAddress = async () => {
        await kushInstance.methods.setkSeedAddress(this.kseedInstance._address).send({
            from: accounts[0],
            gas: 1000000,
        });
    };
    
    const getRoundedkSeedBalance= () => {
        return toFixed(kseedBalance, 6);
    }

    const accounts;
    const networkId;
    const kseedInstance;
    const kushInstance;



    // Component did mount
    useEffect(() => {
        document.title = "Kush.Finance";
        try {
            // // Get network provider and web3 instance.
            if (!window.ethereum) {
                //  Create WalletConnect Provider
                const provider = new WalletConnectProvider({
                    infuraId: "ba0fa4b3210c4528bf4aaefc58eb1251", // Required
                });

                //  Enable session (triggers QR Code modal)
                await provider.enable();

                //  Create Web3
                setWeb3(new Web3(provider));
            } else {
                setWeb3(await getWeb3());
            }

            // Use web3 to get the user's accounts.
            accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            networkId = await web3.eth.net.getId();

            kseedInstance = new web3.eth.Contract(
                kSeedToken.abi,
                process.env.REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS
            );

            kushInstance = new web3.eth.Contract(
                KushToken.abi,
                process.env.REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS
            );

            getkSeedSupply();
            getKushSupply();
            totalkSeedStaked();
            getkSeedBalance();
        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
      }, []);
    return(
        <div className="wallet">
            <h1>Wallet</h1>
            <div className="wallet--content">
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kSEED</h2>
                        <span>USD 10.2</span>
                    </div>
                    <a><PlusOutlined style={{ fontSize: '16px'}} /></a>
                </div>
                <div className="flex spaced align-end">
                    Balance { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="flex spaced align-end">
                    Total Seeded { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="flex spaced align-end">
                    Total Supply { true && <Statistic value={222} precision={2} />}
                </div>
                
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kKUSH</h2>
                        <span>USD 102.4</span>
                    </div>
                    <a><PlusOutlined style={{ fontSize: '16px'}} /></a>
                </div>
                <div className="flex spaced align-end">
                    Total k.KUSH Supply { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kOG</h2>
                        <span>USD 2.7</span>
                    </div>
                    <a><PlusOutlined style={{ fontSize: '16px'}} /></a>
                </div>
                <div className="flex spaced align-end">
                    Total k.OG Supply { true && <Statistic value={222} precision={2} />}
                </div>
            </div>
        </div>
    );
}

export default Wallet;
