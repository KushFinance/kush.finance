import React, { Component } from 'react';
import Logo from '../assets/logo.png'
import Footer from './Footer';

class KushShowcase extends Component {
    render(){
        return(
            <div className="kushShowcase">
                <img src={Logo} alt="KUSH.FINANCE LOGO"/>
                <h1>Kush.Finance</h1>
                <iframe src="https://vittominacori.github.io/watch-token/detail.html?address=0x3f09400313e83d53366147e3ea0e4e2279d80850&network=mainnet&logo=https://alpha.kush.finance/static/media/logo.7d625c91.png&embedded=1" style="border:none; overflow:hidden; width: 520px; max-width: 100%; height: 240px" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
                <ul className="addresses">
                    <li>
                        <a href="https://etherscan.io/address/0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer">
                            <span>kSEED address: </span> 0x3f09400313e83d53366147e3ea0e4e2279d80850
                        </a>
                    </li>
                    <li>
                        <a href="https://etherscan.io/address/0x538b4b507d57bf9ebd8847ec395b7b061c150181" target="_blank" rel="noopener noreferrer">
                            <span>KUSH address: </span>  0x538b4b507d57bf9ebd8847ec395b7b061c150181
                        </a>
                    </li>
                    <li>
                        <a href="https://etherscan.io/address/0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4" target="_blank" rel="noopener noreferrer">
                        <span>kushOG address: </span> 0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4
                        </a>
                    </li>
                    <li>
                        <span><a href="https://etherscan.io/token/0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer">k.SEED Token Etherscan</a></span>
                    </li>
                    <li>
                        <span><a href="https://uniswap.info/pair/0xdcff4c70131b476595b449c7db17cd92663aa513" target="_blank" rel="noopener noreferrer">k.SEED-ETH Uniswap</a></span>
                    </li>
                </ul>
                <Footer />
            </div>
        );
    }
}

export default KushShowcase;
