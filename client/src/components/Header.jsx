import React, { Component } from 'react';

import SeedingIMG from '../assets/Seeding.png'
import GovernIMG from '../assets/Vote.png'
import ResearchIMG from '../assets/pKushExtract.png'

const Address = (props) => {
	return (
		<a 
			className="header--link"
			href={props.href}
			target={props.external ? '_blank' : ''}
		>
            {props.children} 
            
		</a>
	);
}

class Header extends Component {
    render(){
        return(
            <div className="header">
                <ul className="header--navbar">
                    <li>
                        <Address href="seeding" icon="">
                            <img src={SeedingIMG} alt="Seeding"></img>
                            Seeding
                        </Address>
                    </li>
                    <li>
                        <Address href="research" icon="">
                            <img src={ResearchIMG} alt="Research"></img>
                            Research
                        </Address>
                    </li>
                    <li>
                        <Address href="govern" icon="">
                            <img src={GovernIMG} alt="Govern"></img>
                            Govern
                        </Address>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;
