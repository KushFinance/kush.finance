import React, {useState} from "react"
import {Drawer} from "antd"
import { createFromIconfontCN } from '@ant-design/icons'
import Menu from "./Menu"
const SpiryIcon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1952854_9hxo6ls2cw.js'})


function MobileDrawer(props){
    const [visible, setVisible] = useState(false)
    function handleClose(){
        setVisible(false);
    }
    function handleOpen(){
        setVisible(true);
    }
    return (
        <>
            <Drawer 
                title="Menu"
                placement="left"
                onClose={handleClose}
                visible={visible}
                className="mobile-drawer"
                >
                <Menu onChangePage={handleClose}/>
            </Drawer>
            { !visible && 
                <button className="button-drawer" onClick={()=>{handleOpen()}}> <SpiryIcon type='iconmenu'/> </button>
            }
        </>
        
    );
}

export default MobileDrawer;