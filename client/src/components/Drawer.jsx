import React, {useState} from "react"
import {Drawer} from "antd"
import Menu from "./Menu"


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
                title="Kush.Finance"
                placement="left"
                onClose={handleClose}
                visible={visible}
                className="mobile-drawer"
                >
                <Menu onChangePage={handleClose}/>
            </Drawer>
            { !visible && 
                <button className="button-drawer" onClick={()=>{handleOpen()}}> </button>
            }
        </>
        
    );
}

export default MobileDrawer;