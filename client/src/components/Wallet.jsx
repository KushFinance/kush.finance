import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.thegraph.com/subgraphs/name/uniswap'
});

export default function Wallet(props) {

  const [kseedBalance, setKseedBalance] = useState('0')
  const [kseedTotalSeeded, setKseedTotalSeeded] = useState('0')
  const [kseedTotalSupply, setKseedTotalSupply] = useState('0')
  const [kushTotalSupply, setKushTotalSupply] = useState('0')
  const [kushBalance, setKushBalance] = useState('0')
  const [kushOGBalance, setKushOGBalance] = useState('0')
  const [kushOGTotalSupply, setKushOGTotalSupply] = useState('0')

  const kseedInstance = useSelector((state) => state.kseedInstance)
  const kushInstance = useSelector((state) => state.kushInstance)
  const kushOGInstance = useSelector((state) => state.kushOGInstance)
  const web3 = useSelector(state => state.web3Instance);
  const accounts = useSelector(state => state.accounts);

  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: { data } } = await api.post('/uniswap-v2', {
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
         }`
      })
      setEthPrice(data.bundle.ethPrice);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (kseedInstance.methods) {
        const supply = await kseedInstance.methods.totalSupply().call();
        setKseedTotalSupply(web3.utils.fromWei(supply));
        const balance = await kseedInstance.methods.balanceOf(accounts[0]).call();
        setKseedBalance(web3.utils.fromWei(balance))
      }
      if (kushInstance.methods) {
        const supply = await kushInstance.methods.totalSupply().call();
        setKushTotalSupply(web3.utils.fromWei(supply));
        const balance = await kushInstance.methods.balanceOf(accounts[0]).call();
        setKushBalance(web3.utils.fromWei(balance));
        const seeded = await kushInstance.methods.totalStakedSupply().call();
        setKseedTotalSeeded(web3.utils.fromWei(seeded));
      }
      if (kushOGInstance.methods) {
        const supply = await kushOGInstance.methods.totalSupply().call();
        setKushOGTotalSupply(web3.utils.fromWei(supply));
        const balance = await kushOGInstance.methods.balanceOf(accounts[0]).call();
        setKushOGBalance(web3.utils.fromWei(balance));
      }
    })();
  }, [kseedInstance, kushInstance, kushOGInstance, web3]);

  const [kseedPrice, setKseedPrice] = useState(null);
  const [kkushPrice, setKkushPrice] = useState(null);
  const [kushOGPrice, setKushOGPrice] = useState(null);

  useEffect(() => {
    const update = async () => {
      if (!ethPrice) {
        return null;
      }
      const { data: { data } } = await api.post('/uniswap-v2', {
        query: `{
          pair(id: "0xdcff4c70131b476595b449c7db17cd92663aa513"){
              token0 {
                id
                symbol
                name
                derivedETH
              }
              token1 {
                id
                symbol
                name
                derivedETH
              }
              reserve0
              reserve1
              reserveUSD
              trackedReserveETH
              token0Price
              token1Price
              volumeUSD
              txCount
          }
         }`
      });
      setKseedPrice(data.pair.token1Price * ethPrice);
      setTimeout(update, 10000);
    };

    update();
  }, [ethPrice]);

  useEffect(() => {
    const update = async () => {
      if (!ethPrice) {
        return null;
      }
      const { data: { data } } = await api.post('/uniswap-v2', {
        query: `{
          pair(id: "0xdd0e143868b34d97355f249a4ddffbee03fd0481"){
              token0 {
                id
                symbol
                name
                derivedETH
              }
              token1 {
                id
                symbol
                name
                derivedETH
              }
              reserve0
              reserve1
              reserveUSD
              trackedReserveETH
              token0Price
              token1Price
              volumeUSD
              txCount
          }
         }`
      });
      setKkushPrice(data.pair.token1Price * ethPrice);
      setTimeout(update, 10000);
    };

    update();
  }, [ethPrice]);

  useEffect(() => {
    const update = async () => {
      if (!ethPrice) {
        return null;
      }
      const { data: { data } } = await api.post('/uniswap-v2', {
        query: `{
          pair(id: "0xd4c7d60713d444c5bced429b1c41e5966e7375af"){
              token0 {
                id
                symbol
                name
                derivedETH
              }
              token1 {
                id
                symbol
                name
                derivedETH
              }
              reserve0
              reserve1
              reserveUSD
              trackedReserveETH
              token0Price
              token1Price
              volumeUSD
              txCount
          }
         }`
      });
      setKushOGPrice(data.pair.token1Price * ethPrice);
      setTimeout(update, 10000);
    };

    update();
  }, [ethPrice]);

  return (
    <div className={`wallet ${props.show && 'show'}`}>
      <h1>Wallet</h1>
      <div className='wallet--content'>
        <div className='coinTitle'>
          <div className='flex align-center'>
            <h2 className='m0'>kSEED</h2>
            <span>USD {kseedPrice && kseedPrice.toFixed(2)}</span>
          </div>
          <a href="https://1inch.exchange/#/r/0x6ED8CD17EE5453E17eb731a6B2004aF53eA1f26a/ETH/kSEED" target="_blank" rel="noopener noreferrer">
            <svg
              width='25'
              height='25'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 24.5625 7.4375 31.5 16 31.5C24.5625 31.5 31.5 24.5625 31.5 16C31.5 7.4375 24.5625 0.5 16 0.5ZM25 17.75C25 18.1625 24.6625 18.5 24.25 18.5H18.5V24.25C18.5 24.6625 18.1625 25 17.75 25H14.25C13.8375 25 13.5 24.6625 13.5 24.25V18.5H7.75C7.3375 18.5 7 18.1625 7 17.75V14.25C7 13.8375 7.3375 13.5 7.75 13.5H13.5V7.75C13.5 7.3375 13.8375 7 14.25 7H17.75C18.1625 7 18.5 7.3375 18.5 7.75V13.5H24.25C24.6625 13.5 25 13.8375 25 14.25V17.75Z'
                fill='#05FF00'
              />
            </svg>
          </a>
        </div>
        <div className='flex spaced align-end'>
          Balance <span className="walletPrice"> {parseFloat(kseedBalance).toFixed(2)} </span>
        </div>
        <div className='flex spaced align-end'>
          Total Seeded <span className="walletPrice"> {parseFloat(kseedTotalSeeded).toFixed(2)} </span>
        </div>
        <div className='flex spaced align-end'>
          Total Supply <span className="walletPrice"> {parseFloat(kseedTotalSupply).toFixed(2)} </span>
        </div>

        <div className='coinTitle'>
          <div className='flex align-center'>
            <h2 className='m0'>kKUSH</h2>
            <span>USD {kkushPrice && kkushPrice.toFixed(2)}</span>
          </div>
          <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x538b4b507d57bf9ebd8847ec395b7b061c150181" target="_blank" rel="noopener noreferrer">
            <svg
              width='25'
              height='25'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 24.5625 7.4375 31.5 16 31.5C24.5625 31.5 31.5 24.5625 31.5 16C31.5 7.4375 24.5625 0.5 16 0.5ZM25 17.75C25 18.1625 24.6625 18.5 24.25 18.5H18.5V24.25C18.5 24.6625 18.1625 25 17.75 25H14.25C13.8375 25 13.5 24.6625 13.5 24.25V18.5H7.75C7.3375 18.5 7 18.1625 7 17.75V14.25C7 13.8375 7.3375 13.5 7.75 13.5H13.5V7.75C13.5 7.3375 13.8375 7 14.25 7H17.75C18.1625 7 18.5 7.3375 18.5 7.75V13.5H24.25C24.6625 13.5 25 13.8375 25 14.25V17.75Z'
                fill='#05FF00'
              />
            </svg>
          </a>
        </div>
        <div className='flex spaced align-end'>
          Balance <span className="walletPrice"> {parseFloat(kushBalance).toFixed(2)} </span>
        </div>
        <div className='flex spaced align-end'>
          Total Supply <span className="walletPrice"> {parseFloat(kushTotalSupply).toFixed(2)} </span>
        </div>
         <div className='coinTitle'>
          <div className='flex align-center'>
            <h2 className='m0'>kOG</h2>
            <span>USD {kushOGPrice && kushOGPrice.toFixed(2)}</span>
          </div>
          <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4" target="_blank" rel="noopener noreferrer">
            <svg
              width='25'
              height='25'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 24.5625 7.4375 31.5 16 31.5C24.5625 31.5 31.5 24.5625 31.5 16C31.5 7.4375 24.5625 0.5 16 0.5ZM25 17.75C25 18.1625 24.6625 18.5 24.25 18.5H18.5V24.25C18.5 24.6625 18.1625 25 17.75 25H14.25C13.8375 25 13.5 24.6625 13.5 24.25V18.5H7.75C7.3375 18.5 7 18.1625 7 17.75V14.25C7 13.8375 7.3375 13.5 7.75 13.5H13.5V7.75C13.5 7.3375 13.8375 7 14.25 7H17.75C18.1625 7 18.5 7.3375 18.5 7.75V13.5H24.25C24.6625 13.5 25 13.8375 25 14.25V17.75Z'
                fill='#05FF00'
              />
            </svg>
          </a>
        </div>
        <div className='flex spaced align-end'>
          Balance <span className="walletPrice"> {parseFloat(kushOGBalance).toFixed(2)} </span>
        </div> 
        <div className='flex spaced align-end'>
          Total Supply <span className="walletPrice"> {parseFloat(kushOGTotalSupply).toFixed(2)} </span>
        </div> 
      </div>
    </div>
  )
}
