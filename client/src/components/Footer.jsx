



import React, { Component, useState } from 'react';
import twitterIMG from "../assets/twitter.png"
import githubIMG from "../assets/github.png"
import telegramIMG from "../assets/telegram.png"

const Address = (props) => {
	return (
		<a 
			className="header--link"
			href={props.href}
			target={props.external ? '_blank' : ''}
		>
            {props.children} 
            
		</a>
	);
}

class Footer extends Component {
    render(){
        return(
            <div className="footer">
                <ul className="addresses">
                    <li>
                        <span>kSEED address: </span>
                        <span> 0x3f09400313e83d53366147e3ea0e4e2279d80850 </span>
                    </li>
                    <li>
                        <span>KUSH address: </span> 
                        <span> 0x538b4b507d57bf9ebd8847ec395b7b061c150181 </span>
                    </li>
                    <li>
                        <span>purpleKUSH address: </span>
                    </li>
                </ul>
                
                <div className="links-box">
                    <a href="https://etherscan.io/token/0x3f09400313e83d53366147e3ea0e4e2279d80850">k.SEED Token Etherscan</a> 
                    <br/>
                    <a href="https://uniswap.info/pair/0xdcff4c70131b476595b449c7db17cd92663aa513">k.SEED-ETH Uniswap</a>
                </div>
                <ul className="social-media">
                    <li style={{backgroundColor: "#000"}}>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/KushFinance/kush.finance">
                            <div className="social-icon">
                                <img src={githubIMG} alt="github"/>
                            </div>
                        </a>
                    </li>
                    <li style={{backgroundColor: "#50abf1"}}>
                        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/KushFinance">
                            <div className="social-icon">
                                <img src={twitterIMG} alt="twitter"/>
                            </div>
                        </a> 
                    </li>
                    <li style={{backgroundColor: "#2ba8db"}}>
                        <a target="_blank" rel="noopener noreferrer" href="https://T.me/kushfinance">
                            <div className="social-icon">
                                <img src={telegramIMG} alt="telegram"/>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Footer;
