import React from "react"
import { useLocation } from "react-router-dom"
import kushLogo from "../assets/kSeedLogo.png"
import titles from "../assets/titles.json"

export default function Header(){
    const location = useLocation();

    return (
        <>
            <header className="header">
                <div className="label">
                    <img src={kushLogo} alt="icon"/>
                    <h1> Kush.Finance </h1>
                </div>
                <div className="title">
                    <h1> {titles[location.pathname] || "Home"} </h1>
                </div>
                {/* <div className="header--wallet">
                    {window.location.pathname !== 'wallet' && <h1> Wallet </h1>}
                    {window.location.pathname === 'wallet' && <h1> Home </h1>}
                </div> */}
            </header>
        </>
        
    );
}