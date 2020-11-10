import React from "react";
import Logo from "../assets/logo.png";
import { PageHeader, Image, List, Avatar } from "antd";
import kseedLogoIMG from "../assets/logo.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png";
import { createFromIconfontCN } from "@ant-design/icons";
const SpiryIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1952854_f44r3qwutiv.js",
});

const {
  REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KUSHOG_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KSEEDGOV_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KUSHOG_UNI_TOKEN_CONTRACT_ADDRESS
} = process.env;

export default function About() {
  
  const data = [
    {
      title: 'kSEED',
      avatar: kseedLogoIMG,
      description: <>address: {REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS}<br/>governance: {REACT_APP_KSEEDGOV_TOKEN_CONTRACT_ADDRESS}</>,
      etherscan: `https://etherscan.io/address/${REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS}`
    },
    {
      title: 'kushKUSH',
      avatar: kKUSHicon,
      description: <>address: {REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS}</>,
      etherscan: `https://etherscan.io/address/${REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS}`
    },
    {
      title: 'kushOG',
      avatar: kOGLogo,
      description: <>address: {REACT_APP_KUSHOG_TOKEN_CONTRACT_ADDRESS}<br/>uni contract: {REACT_APP_KUSHOG_UNI_TOKEN_CONTRACT_ADDRESS}</>,
      etherscan: `https://etherscan.io/address/${REACT_APP_KUSHOG_TOKEN_CONTRACT_ADDRESS}`
    },
  ];

  return (
    <div className="subpage about">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        backIcon={<SpiryIcon type="iconLeft-" />}
        title="About Us"
      />
      <div className="about">
        <Image preview={false} width={250} src={Logo} />
        <div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={ <Avatar src={item.avatar} /> }
                  title={<a href={item.etherscan}>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          <a href="https://learn.kush.finance" target="_blank" rel="noopener noreferrer">Learn more here</a>
        </div>
      </div>
    </div>
  );
}
