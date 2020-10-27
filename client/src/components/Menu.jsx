import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import SeedingIMG from '../assets/farmkKUSH.png'
import GovernIMG from '../assets/Vote.png'
import FarmingIMG from '../assets/kushOGfarm.png'
import KushIMG from '../assets/kSeedLogo.png'
import KushArtIMG from '../assets/Deal.png'
import WalletIMG from '../assets/walletIcon.png'
import SettingsIMG from '../assets/settingsIcon.png'

const Address = (props) => {
    return (
        <div className="menu--link">
            <Link 
                onClick={props.handleChangePage}
                to={props.href}
                target={props.external ? '_blank' : ''}
                >

                {props.children} 
            </Link>
        </div>
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
            <Address href="/seeding" handleChangePage={()=>{setPage("/seeding")}}>
                <img src={SeedingIMG} alt="Farm kKUSH"></img>
                Farm kushKUSH
            </Address>
            <Address href="/farming" handleChangePage={()=>{setPage("/farming")}}>
                <img src={FarmingIMG} alt="farming"></img>
                Farm kushOG
            </Address>
            <Address href="/govern" handleChangePage={()=>{setPage("/govern")}}>
                <img src={GovernIMG} alt="Govern"></img>
                Govern
            </Address>
            <div className="menu--link blocked">
                <img src={KushArtIMG} alt="Kush Art"></img>
                KushART
            </div>
            <Address href="/settings" handleChangePage={()=>{setPage("/settings")}}>
                <img src={SettingsIMG} alt="Settings"></img>
                Settings
            </Address>
            <div className="menu--link blocked">
                <img src={KushIMG} alt="kushRPG"></img>
                kushRPG
            </div>
        </div>
    );
}

export default Menu;
