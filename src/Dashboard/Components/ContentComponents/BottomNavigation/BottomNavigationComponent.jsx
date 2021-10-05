import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PieChartIcon from '@material-ui/icons/PieChart';
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles({
    root: {
        width: '100%',
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#141629"
    },
});

const BottomNavigationComponent = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [activeElement, setActiveElement] = useState('Dashboard');

    const activeHandler = (element) => {
        setActiveElement(element)
    }
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                onClick={() => activeHandler('Dashboard')}
                className="text-12px"
                label={activeElement === 'Dashboard' ? 'Dashboard' : ''}
                icon={<DashboardIcon />} />

            <BottomNavigationAction
                onClick={() => activeHandler('Portfolio')}
                label={activeElement === 'Portfolio' ? 'Portfolio' : ''}
                icon={<PieChartIcon />} />

            <BottomNavigationAction
                onClick={() => activeHandler('User')}
                label={activeElement === 'User' ? 'User' : ''}
                icon={<PersonIcon />} />

            <BottomNavigationAction
                onClick={() => activeHandler('Settings')}
                label={activeElement === 'Settings' ? 'Settings' : ''}
                icon={<SettingsIcon />}
            />
        </BottomNavigation>
    );
}

export default BottomNavigationComponent
