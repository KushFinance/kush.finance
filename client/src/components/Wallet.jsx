import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Wallet(props) {

  const [kseedBalance, setKseedBalance] = useState('0')
  const [kseedTotalSeeded, setKseedTotalSeeded] = useState('0')
  const [kseedTotalSupply, setKseedTotalSupply] = useState('0')
  const [kushTotalSupply, setKushTotalSupply] = useState('0')
  const [kushOGTotalSupply, setKushOGTotalSupply] = useState('0')

  
  const kseedInstance = useSelector((state) => state.kseedInstance)
  const kushInstance = useSelector((state) => state.kushInstance)
  const kushOGInstance = useSelector((state) => state.kushOGInstance)
  const web3 = useSelector(state => state.web3Instance);
  const accounts = useSelector(state => state.accounts);
  
  useEffect(() => {
    (async () => {
      if (web3.eth && kseedInstance.methods) {

        let supply = await kseedInstance.methods.totalSupply().call();
        setKseedTotalSupply(web3.utils.fromWei(supply));

        let balance = await kseedInstance.methods.balanceOf(accounts[0]).call();
        setKseedBalance(web3.utils.fromWei(balance))
      }
      if (kushInstance.methods) {
        let supply = await kushInstance.methods.totalSupply().call();
        setKushTotalSupply(web3.utils.fromWei(supply));
      }
      if (kushOGInstance.methods) {
        let supply = await kushOGInstance.methods.totalSupply().call();
        setKushOGTotalSupply(web3.utils.fromWei(supply));
      }
    })();
  }, [kseedInstance, kushInstance, kushOGInstance, web3]);

  return (
    <div className={`wallet ${props.show && 'show'}`}>
      <h1>Wallet</h1>
      <div className='wallet--content'>
        <div className='coinTitle'>
          <div className='flex align-end'>
            <h2 className='m0'>kSEED</h2>
            {/* <span>USD 10.0</span> */}
          </div>
          <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer">
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
          Balance <span className="walletPrice"> ${parseFloat(kseedBalance).toFixed(2)} </span>
        </div>
        <div className='flex spaced align-end'>
          Total Seeded <span className="walletPrice"> ${parseFloat(kseedTotalSeeded).toFixed(2)} </span>
        </div>
        <div className='flex spaced align-end'>
          Total Supply <span className="walletPrice"> ${parseFloat(kseedTotalSupply).toFixed(2)} </span>
        </div>

        <div className='coinTitle'>
          <div className='flex align-end'>
            <h2 className='m0'>kKUSH</h2>
            {/* <span>USD 10.0</span> */}
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
          Total Supply <span className="walletPrice"> ${parseFloat(kushTotalSupply).toFixed(2)} </span>
        </div>
        {/* <div className='coinTitle'>
          <div className='flex align-end'>
            <h2 className='m0'>kOG</h2>
            <span>USD 10.0</span>
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
          Total Supply <span className="walletPrice"> ${parseFloat(kushOGTotalSupply).toFixed(2)} </span>
        </div> */}
      </div>
    </div>
  )
}
