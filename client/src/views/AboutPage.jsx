import React from "react";
import Logo from "../assets/logo.png";
import { PageHeader, Image, Typography, List, Avatar } from "antd";
import kseedLogoIMG from "../assets/logo.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png";
import { createFromIconfontCN } from "@ant-design/icons";
const { Paragraph } = Typography;
const SpiryIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1952854_f44r3qwutiv.js",
});

export default function About() {
  
  const data = [
    {
      title: 'kSEED',
      avatar: kseedLogoIMG,
      description: 'address: 0x3f09400313e83d53366147e3ea0e4e2279d80850',
      etherscan: 'https://etherscan.io/address/0x3f09400313e83d53366147e3ea0e4e2279d80850'
    },
    {
      title: 'kushKUSH',
      avatar: kKUSHicon,
      description: 'address: 0x538b4b507d57bf9ebd8847ec395b7b061c150181',
      etherscan: 'https://etherscan.io/address/0x538b4b507d57bf9ebd8847ec395b7b061c150181'
    },
    {
      title: 'kushOG',
      avatar: kOGLogo,
      description: 'address: 0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4',
      etherscan: 'https://etherscan.io/address/0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4'
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
      </div>
    </div>
  );
}
