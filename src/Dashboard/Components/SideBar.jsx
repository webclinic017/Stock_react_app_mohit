import { makeStyles } from '@material-ui/core';
import React from 'react'
import user from '../../Assets/user.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PieChartIcon from '@material-ui/icons/PieChart';
const useStyles = makeStyles({
    container: {
        background: "#141629",
        height: "100vh",
        position: "fixed",
        left: 0,
        width: "210px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    profileDiv: {
        marginTop: "50px",

    },
    userProfileText: {
        '& > p': {
            margin: 0,
            marginTop: "10px"
        },
        '& > p:nth-child(1)': {
            fontSize: "18px"
        },
        '& > p:nth-child(2)': {
            fontSize: "12px",
            textAlign: "center",
            color: "#5459C6"
        }
    },
    imgDiv: {
        padding: "3.5px",
        background: "#646F87",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '& > img': {
            borderRadius: "50%"
        }
    },
    navOptions: {
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "25px"
    },
    row: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        '&:hover': {
            color: "#1628A8"
        }
    }
})

const getName=()=>{
   return localStorage.getItem("email").split('@')[0];
}
const SideBar = ({ style }) => {
    const classes = useStyles();
    return (
        <div style={style} className={classes.container}>
            <div className={classes.profileDiv}>
                <div className={classes.imgDiv}>
                    <img src={user} width="80px" alt="" />
                </div>
            </div>
            <div className={classes.userProfileText}>
                <p>{getName()}</p>
                <p>My Profile</p>
            </div>

            <div className={classes.navOptions}>
                <div className={classes.row}>
                    <DashboardIcon className="text-16px" />
                    <span className="ml-8">Dashboard</span>
                </div>
                <div className={classes.row}>
                    <PieChartIcon className="text-16px" />
                    <span className="ml-8">Portfolio</span>
                </div>
                <div className={classes.row}>
                    <SettingsIcon className="text-16px" />
                    <span className="ml-8">Settings</span>
                </div>
                <div className={classes.row}>
                    <HelpOutlineIcon className="text-16px" />
                    <span className="ml-8">Get Help</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar
