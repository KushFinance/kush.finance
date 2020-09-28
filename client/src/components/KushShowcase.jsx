import React, { Component } from 'react';
import Logo from '../assets/logo.png'
import Footer from './Footer';
import { Input, Alert, Divider, PageHeader, Button, Card, Typography, Space  } from "antd";
const { Paragraph } = Typography;
class KushShowcase extends Component {
    render(){
        return(
            <div className="kushShowcase">
                <img src={Logo} alt="KUSH.FINANCE LOGO"/>
                <h1>kush.finance</h1>
  <Card style={{ width: 600 }}>
      <Space>
    <Button href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer"  type="primary" size="middle">BUY kSEED</Button>
    <Button href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x538b4b507d57bf9ebd8847ec395b7b061c150181" target="_blank" rel="noopener noreferrer" type="primary" size="middle">BUY kKUSH</Button>
    <Button href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4" target="_blank" rel="noopener noreferrer" type="primary" size="middle">BUY kOG</Button></Space>
<ul className="addresses">
                    <li>
                        <a href="https://etherscan.io/address/0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer">
                            <span>kSEED Contract address: </span> <Paragraph copyable> 0x3f09400313e83d53366147e3ea0e4e2279d80850</Paragraph>
                        </a>
                    </li>
                    <li>
                        <a href="https://etherscan.io/address/0x538b4b507d57bf9ebd8847ec395b7b061c150181" target="_blank" rel="noopener noreferrer">
                            <span>KUSH Contract address: </span>  <Paragraph copyable>0x538b4b507d57bf9ebd8847ec395b7b061c150181</Paragraph>
                        </a>
                    </li>
                    <li>
                        <a href="https://etherscan.io/address/0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4" target="_blank" rel="noopener noreferrer">
                        <span>kushOG Contract address: </span> <Paragraph copyable> 0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4</Paragraph>
                        </a>
                    </li>
                    <li>
                        <span><a href="https://etherscan.io/token/0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer">k.SEED Token Etherscan</a></span>
                    </li>
                    <li>
                        <span><a href="https://uniswap.info/pair/0xdcff4c70131b476595b449c7db17cd92663aa513" target="_blank" rel="noopener noreferrer">k.SEED-ETH Uniswap</a></span>
                    </li>
                </ul>
  </Card>
                
                <Footer />
            </div>
        );
    }
}

export default KushShowcase;
