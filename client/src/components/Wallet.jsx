import React from 'react';
import {Statistic} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function toFixed(num, fixed) {
    let re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
    return num.toString().match(re)[0];
}



function Wallet(props) {
    



    
    return(
        <div className="wallet">
            <h1>Wallet</h1>
            <div className="wallet--content">
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kSEED</h2>
                        <span>USD 10.2</span>
                    </div>
                    <a><PlusOutlined style={{ fontSize: '16px'}} /></a>
                </div>
                <div className="flex spaced align-end">
                    Balance { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="flex spaced align-end">
                    Total Seeded { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="flex spaced align-end">
                    Total Supply { true && <Statistic value={222} precision={2} />}
                </div>
                
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kKUSH</h2>
                        <span>USD 102.4</span>
                    </div>
                    <a><PlusOutlined style={{ fontSize: '16px'}} /></a>
                </div>
                <div className="flex spaced align-end">
                    Total k.KUSH Supply { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kOG</h2>
                        <span>USD 2.7</span>
                    </div>
                    <a><PlusOutlined style={{ fontSize: '16px'}} /></a>
                </div>
                <div className="flex spaced align-end">
                    Total k.OG Supply { true && <Statistic value={222} precision={2} />}
                </div>
            </div>
        </div>
    );
}

export default Wallet;
