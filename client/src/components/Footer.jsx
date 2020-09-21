



import React, { Component } from 'react';
import twitterIMG from "../assets/twitter.png"
import githubIMG from "../assets/github.png"
import telegramIMG from "../assets/telegram.png"
import uniIMG from "../assets/uni.png"
import unicryptIMG from "../assets/unycrypt.svg"

class Footer extends Component {
    render(){
        return(
            <div className="footer">
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
                    <li style={{backgroundColor: "#fdf4f8"}}>
                        <a target="_blank" rel="noopener noreferrer" href="https://uniswap.info/pair/0xdcff4c70131b476595b449c7db17cd92663aa513">
                            <div className="social-icon">
                                <img src={uniIMG} alt="uni"/>
                            </div>
                        </a>
                    </li>
                    <li style={{backgroundColor: "#62dc33"}}>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.unicrypt.network/uniswap-browser/pair/0xDCfF4c70131B476595B449C7dB17cd92663aa513">
                            <div className="social-icon">
                                <img src={unicryptIMG} alt="unicrypt"/>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Footer;
