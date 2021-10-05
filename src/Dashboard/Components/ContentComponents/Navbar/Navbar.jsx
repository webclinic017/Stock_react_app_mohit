import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import SideBar from '../../SideBar';
import OverlayComponent from '../OverlayComponent';
const useStyles = makeStyles({
    container: {
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mobileNotification: {
        position: "fixed",
        width: "215px",
        minHeight: "100vh",
        background: "#141629",
        top: 0,
        left: "-100%",
        transition: 'all 0.5s',
        bottom: 0,
        overflowY: 0,
        zIndex: 1000,

    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "10px 20px 10px 20px",

    }
})
const Navbar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const mobileView = useMediaQuery((theme.breakpoints.down('md')));
    const [isActive, setActive] = useState(false);
    return (
        <div>
            <div className={classes.container}>
                <MenuIcon onClick={() => setActive(true)} style={{ fontSize: "30px" }} />
                <NotificationsIcon style={{ fontSize: "30px" }} />
            </div>
            <div style={{ left: isActive ? '0px' : '-100%' }} className={classes.mobileNotification}>
                <div className={classes.topBar}>
                    <span>LOGO</span>
                    <CloseIcon onClick={() => setActive(false)} />
                </div>
                <SideBar style={{ position: 'relative' }} />
                <OverlayComponent collapsed={isActive} />
            </div>

        </div>
    )
}

export default Navbar
