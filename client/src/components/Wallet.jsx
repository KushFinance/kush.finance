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
                    <a>
                        <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 24.5625 7.4375 31.5 16 31.5C24.5625 31.5 31.5 24.5625 31.5 16C31.5 7.4375 24.5625 0.5 16 0.5ZM25 17.75C25 18.1625 24.6625 18.5 24.25 18.5H18.5V24.25C18.5 24.6625 18.1625 25 17.75 25H14.25C13.8375 25 13.5 24.6625 13.5 24.25V18.5H7.75C7.3375 18.5 7 18.1625 7 17.75V14.25C7 13.8375 7.3375 13.5 7.75 13.5H13.5V7.75C13.5 7.3375 13.8375 7 14.25 7H17.75C18.1625 7 18.5 7.3375 18.5 7.75V13.5H24.25C24.6625 13.5 25 13.8375 25 14.25V17.75Z" fill="#05FF00"/>
                        </svg>
                    </a>
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
                    <a>
                        <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 24.5625 7.4375 31.5 16 31.5C24.5625 31.5 31.5 24.5625 31.5 16C31.5 7.4375 24.5625 0.5 16 0.5ZM25 17.75C25 18.1625 24.6625 18.5 24.25 18.5H18.5V24.25C18.5 24.6625 18.1625 25 17.75 25H14.25C13.8375 25 13.5 24.6625 13.5 24.25V18.5H7.75C7.3375 18.5 7 18.1625 7 17.75V14.25C7 13.8375 7.3375 13.5 7.75 13.5H13.5V7.75C13.5 7.3375 13.8375 7 14.25 7H17.75C18.1625 7 18.5 7.3375 18.5 7.75V13.5H24.25C24.6625 13.5 25 13.8375 25 14.25V17.75Z" fill="#05FF00"/>
                        </svg>
                    </a>
                </div>
                <div className="flex spaced align-end">
                    Total k.KUSH Supply { true && <Statistic value={222} precision={2} />}
                </div>
                <div className="coinTitle">
                    <div className="flex align-end">
                        <h2 className="m0">kOG</h2>
                        <span>USD 2.7</span>
                    </div>
                    <a>
                        <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0.5C7.4375 0.5 0.5 7.4375 0.5 16C0.5 24.5625 7.4375 31.5 16 31.5C24.5625 31.5 31.5 24.5625 31.5 16C31.5 7.4375 24.5625 0.5 16 0.5ZM25 17.75C25 18.1625 24.6625 18.5 24.25 18.5H18.5V24.25C18.5 24.6625 18.1625 25 17.75 25H14.25C13.8375 25 13.5 24.6625 13.5 24.25V18.5H7.75C7.3375 18.5 7 18.1625 7 17.75V14.25C7 13.8375 7.3375 13.5 7.75 13.5H13.5V7.75C13.5 7.3375 13.8375 7 14.25 7H17.75C18.1625 7 18.5 7.3375 18.5 7.75V13.5H24.25C24.6625 13.5 25 13.8375 25 14.25V17.75Z" fill="#05FF00"/>
                        </svg>
                    </a>
                </div>
                <div className="flex spaced align-end">
                    Total k.OG Supply { true && <Statistic value={222} precision={2} />}
                </div>
            </div>
        </div>
    );
}

export default Wallet;
