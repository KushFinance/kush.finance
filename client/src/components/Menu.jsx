import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeedingIMG from '../assets/farmkKUSH.png'
import GovernIMG from '../assets/Vote.png'
import FarmingIMG from '../assets/kushOGfarm.png'
import KushIMG from '../assets/kSeedLogo.png'
import KushArtIMG from '../assets/Deal.png'
import RPGlogo from '../assets/RPGlogo.png'

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

export default function Menu(props) {
    const [page,setPage] = useState(window.location.pathname)
    const onChangePage = props.onChangePage ? props.onChangePage : ()=>{};
    useEffect(()=>{
        onChangePage()
    },[page])
    return(
        <div className="menu">
            <Address href="/seeding" handleChangePage={()=>{setPage("/seeding")}}>
                <img src={SeedingIMG} alt="Farm kKUSH"></img>
                <span>Seed kSEED</span>
                <span> Earn kKUSH</span>
            </Address>
            <Address href="/farming" handleChangePage={()=>{setPage("/farming")}}>
                <img src={FarmingIMG} alt="farming"></img>
                <span>Farm kKUSH/ETH</span>
                <span>Earn kushOG</span>
            </Address>
            <Address href="/govern" handleChangePage={()=>{setPage("/govern")}}>
                <img src={GovernIMG} alt="Govern"></img>
                <span>Govern</span>
            </Address>
            <Address href="/about" handleChangePage={()=>{setPage("/about")}}>
                <img src={KushIMG} alt="about"></img>
                <span>About</span>
            </Address>
            <div className="menu--link blocked">
                <img src={KushArtIMG} alt="Kush Art"></img>
                <span> KushART </span>
                <div className="show-phone">
                    <span>Coming soon</span>
                </div>
            </div>
            <div className="menu--link blocked">
                <img src={RPGlogo} alt="about"></img>
                <span> KushRPG </span>
                <div className="show-phone">
                    <span>Coming soon</span>
                </div>
            </div>
        </div>
    );
}
