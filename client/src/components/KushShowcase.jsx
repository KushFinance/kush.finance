import React, { Component } from 'react';
import Logo from '../assets/logo.png'
import { PageHeader, Col, Divider, List, Avatar, Image, Button, Card, Typography, Space  } from "antd";
import kseedLogoIMG from "../assets/logo.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png"
const { Paragraph } = Typography;
class KushShowcase extends Component {
    render(){
        return(
            <div className="subpage kushShowcase">
              <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title="Kush Seed Showcase"
            />
                
                <Image preview={false} width={250} src={Logo}/>
                <h1>kush.finance</h1>
                
                 {/* <Card style={{ width: 500}}>
                 <Space size={65} align="baseline">
                
                 <Button href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x3f09400313e83d53366147e3ea0e4e2279d80850" target="_blank" rel="noopener noreferrer"  type="primary" size="middle">BUY kSEED</Button>
                  <Button href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x538b4b507d57bf9ebd8847ec395b7b061c150181" target="_blank" rel="noopener noreferrer" type="primary" size="middle">BUY kKUSH</Button>
                 <Button href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4" target="_blank" rel="noopener noreferrer" type="primary" size="middle">BUY kOG</Button>
                

                 </Space>
                 <List
                 
    itemLayout="horizontal">            
        <List.Item>
        <List.Item.Meta
          title={<a href="https://etherscan.io/address/0x3f09400313e83d53366147e3ea0e4e2279d80850"target="_blank" rel="noopener noreferrer">Etherscan Link</a>}
          avatar={<Avatar src={kseedLogoIMG} />}
          description={"kSEED"}
        /><Paragraph copyable> 0x3f09400313e83d53366147e3ea0e4e2279d80850</Paragraph></List.Item>
                         <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={kKUSHicon} />}
          title={<a href="https://etherscan.io/address/0x538b4b507d57bf9ebd8847ec395b7b061c150181"target="_blank" rel="noopener noreferrer">Etherscan Link</a>}
          description={"kKUSH"}
        /><Paragraph copyable> 0x538b4b507d57bf9ebd8847ec395b7b061c150181</Paragraph></List.Item>
          
            <List.Item>
          <List.Item.Meta
          avatar={<Avatar src={kOGLogo} />}
          title={<a href="https://etherscan.io/address/0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4"target="_blank" rel="noopener noreferrer">Etherscan Link</a>}
          description={"kOG [kushOG]"}
          /><Paragraph copyable> 0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4</Paragraph>
            </List.Item>
        </List>
         
  </Card> */}
                
            </div>
        );
    }
}

export default KushShowcase;
