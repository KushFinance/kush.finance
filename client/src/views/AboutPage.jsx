import React from "react";
import Logo from "../assets/logo.png";
import { PageHeader, Image, Typography } from "antd";
import kseedLogoIMG from "../assets/logo.png";
import kKUSHicon from "../assets/kKUSH.png";
import kOGLogo from "../assets/kOGlogo.png";
const { Paragraph } = Typography;

export default function About() {
  return (
    <div className="subpage about">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="About Us"
      />
      <Image preview={false} width={250} src={Logo} />
      <h1>kush.finance</h1>
    </div>
  );
}