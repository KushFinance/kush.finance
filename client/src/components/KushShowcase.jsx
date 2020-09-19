import React, { Component, useState } from 'react';
import Logo from '../assets/logo.png'

class KushShowcase extends Component {
    render(){
        return(
            <div className="kushShowcase">
                <img src={Logo} alt="KUSH.FINANCE LOGO"/>
                <h1>Kush.Finance</h1>
            </div>
        );
    }
}

export default KushShowcase;
