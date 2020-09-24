import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import SeedingIMG from '../assets/farmkKUSH.png'
import GovernIMG from '../assets/Vote.png'
import FarmingIMG from '../assets/kushOGfarm.png'
import KushIMG from '../assets/kSeedLogo.png'

const Address = (props) => {
    return (
		<Link 
            className="menu--link"
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
                { page !== "/" && <li>
                    <Address href="/" handleChangePage={()=>{setPage("/")}}>
                        <img src={KushIMG} alt="Home"></img>
                        Home
                    </Address>
                </li> }
                { page !== "/seeding" && <li>
                    <Address href="seeding" handleChangePage={()=>{setPage("/seeding")}}>
                        <img src={SeedingIMG} alt="Farm kKUSH"></img>
                        Farm kushKUSH
                    </Address>
                </li> }
                { page !== "/farming" && <li>
                    <Address href="/farming" handleChangePage={()=>{setPage("/farming")}}>
                        <img src={FarmingIMG} alt="farming"></img>
                        Farm kushOG
                    </Address>
                </li> }
                { page!== "/govern" && <li>
                    <Address href="govern" handleChangePage={()=>{setPage("/govern")}}>
                        <img src={GovernIMG} alt="Govern"></img>
                        Govern
                    </Address>
                </li> }
            </ul>
        </div>
    );
}

export default Menu;
