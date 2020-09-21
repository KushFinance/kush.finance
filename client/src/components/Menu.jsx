import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import SeedingIMG from '../assets/Seeding.png'
import GovernIMG from '../assets/Vote.png'
import FarmingIMG from '../assets/pKushExtract.png'
import KushIMG from '../assets/logo_alt.png'

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
    useEffect(()=>{

    },[page])
    return(
        <div className="menu">
                <ul className="menu--navbar">
                    { page !== "/" && <li>
                        <Address href="/" handleChangePage={()=>{setPage("/")}}>
                            <img src={KushIMG} alt="Kush Finance"></img>
                            Kush Finance
                        </Address>
                    </li> }
                    { page !== "/seeding" && <li>
                        <Address href="seeding" handleChangePage={()=>{setPage("/seeding")}}>
                            <img src={SeedingIMG} alt="Seeding"></img>
                            Seeding
                        </Address>
                    </li> }
                    { page !== "/farming" && <li>
                        <Address href="/farming" handleChangePage={()=>{setPage("/farming")}}>
                            <img src={FarmingIMG} alt="farming"></img>
                            Farming
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
