import { useMediaQuery } from '@material-ui/core'
import { CssBaseline, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Content from './Components/Content'
import SideBar from './Components/SideBar'
import { useTheme } from '@material-ui/core/styles';
import Navbar from './Components/ContentComponents/Navbar/Navbar';
import { getToken } from './../constant';
import { Redirect, useHistory } from 'react-router-dom';
const useStyles = makeStyles({

})
const Dashboard = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mobileView = useMediaQuery((theme.breakpoints.down('md')));
    // if (!getToken()) {
    //     return <Redirect to='/form' />

    // }
    return (
        <div>
            <CssBaseline />
            <Grid container justifyContent={mobileView && "center"} alignItems={mobileView && "center"} >
                <Grid item lg={2} md={0}>
                    {!mobileView && <SideBar />}

                </Grid>
                <Grid item lg={10} md={12}>
                    {mobileView && <Navbar />}
                    <Content />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
