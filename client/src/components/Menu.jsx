import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import SeedingIMG from '../assets/farmkKUSH.png'
import GovernIMG from '../assets/Vote.png'
import FarmingIMG from '../assets/kushOGfarm.png'
import KushIMG from '../assets/kSeedLogo.png'
import KushIMG from '../assets/Deal.png'
import WalletIMG from '../assets/walletIcon.png'
import SettingsIMG from '../assets/settingsIcon.png'

const Address = (props) => {
    return (
		<Link 
            className={`menu--link ${props.active ? 'active': '' }`}
            onClick={props.handleChangePage}
			to={props.href}
			target={props.external ? '_blank' : ''}
		>
            {props.children} 
            
		</Link>
	);
}

function Menu(props) {
    const [page,setPage] = useState(window.location.pathname)
    const onChangePage = props.onChangePage ? props.onChangePage : ()=>{};
    useEffect(()=>{
        onChangePage()
    },[page])
    return(
        <div className="menu">
            <ul className="menu--navbar">
                <li className={page === "/" && 'active'}>
                    <Address href="/" handleChangePage={()=>{setPage("/")}}>
                        <img src={KushIMG} alt="Home"></img>
                        Home
                    </Address>
                </li>
                <li className={page === "/seeding" && 'active'}>
                    <Address href="/seeding" handleChangePage={()=>{setPage("/seeding")}}>
                        <img src={SeedingIMG} alt="Farm kKUSH"></img>
                        Farm kushKUSH
                    </Address>
                </li>
                <li className={page === "/farming" && 'active'}>
                    <Address href="/farming" handleChangePage={()=>{setPage("/farming")}}>
                        <img src={FarmingIMG} alt="farming"></img>
                        Farm kushOG
                    </Address>
                </li>
                <li className={page === "/govern" && 'active'}>
                    <Address href="/govern" handleChangePage={()=>{setPage("/govern")}}>
                        <img src={GovernIMG} alt="Govern"></img>
                        Govern
                    </Address>
                </li>
                <li className={page === "/kush-art" && 'active'}>
                    <Address href="/kush-art" handleChangePage={()=>{setPage("/kush-art")}}>
                        <img src={KushArtIMG} alt="Kush Art"></img>
                        Govern
                    </Address>
                </li>
                <li className={page === "/wallet" && 'active'}>
                    <Address href="/wallet" handleChangePage={()=>{setPage("/wallet")}}>
                        <img src={WalletIMG} alt="Wallet"></img>
                        Wallet
                    </Address>
                </li>
                <li className={`hideOnMobile ${page === "/settings" && 'active'}`}>
                    <Address href="/settings" handleChangePage={()=>{setPage("/settings")}}>
                        <img src={SettingsIMG} alt="Settings"></img>
                        Settings
                    </Address>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
