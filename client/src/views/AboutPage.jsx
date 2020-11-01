import React from "react";
import Logo from "../assets/logo.png";
import { PageHeader, Image, Typography } from "antd";
import kseedLogoIMG from "../assets/logo.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png";
import { createFromIconfontCN } from '@ant-design/icons';
const { Paragraph } = Typography;
const SpiryIcon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1952854_f44r3qwutiv.js'})

export default function About() {
  return (
    <div className="subpage about">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        backIcon={<SpiryIcon type='iconLeft-' />}
        title="About Us"
      />
      <Image preview={false} width={250} src={Logo} />
      <h1>kush.finance</h1>
    </div>
  );
}