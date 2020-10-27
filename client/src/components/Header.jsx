import React from "react"
import kushLogo from "../assets/kSeedLogo.png"

function Header(props){
    return (
        <>
            <header className="header">
                <div className="label">
                    <img src={kushLogo} alt="icon"/>
                    <h1> Kush.Finance </h1>
                </div>
                <div className="title">
                    <h1> Home </h1>
                </div>
            </header>
        </>
        
    );
}

export default Header;