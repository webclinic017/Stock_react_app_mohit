import { makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useState } from 'react'
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import { topGainers } from '../../../../Data/topGainers';
import { topLosers } from '../../../../Data/topLosers';
import SectorDonut from './Components/SectorDonut';
import DeskTopStats from './Components/DeskTopStats';
import MobStats from './Components/MobStats';
import Portfolio from './Components/PortfolioStats/Portfolio';
export const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: '15px',
        flexWrap: "wrap",
        gap: "15px"

    },
    cardContainer: {
        flex: 1,
        minHeight: "120px",
        background: "var(--primary-color)",
        padding: "8px",
        boxSizing: "border-box",
        position: 'relative',
        borderRadius: "7px",
        paddingBottom: '35px',
        '& > span': {
            color: "#f3f3f3"
        }
    },
    lastCard: {
        flex: 1,
        minHeight: "342px",
        [theme.breakpoints.down('xs')]: {
            minHeight: "200px"
        }


    },
    dataDiv: {
        width: "100%",
        minHeight: "120px",
        background: "var(--primary-color)",
        padding: "20px 15px 30px 15px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"

    },
    dataRow: {
        display: "grid",
        justifyContent: "space-between",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center",
        fontSize: "11px",
        '& > *:nth-child(n+2)': {
            justifySelf: 'end'
        },

    },
    colorGainer: {
        color: "#1EA37F"
    },
    colorLoser: {
        color: "#F45631 "
    },
    topGainers: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "5px",
        marginBottom: "5px",
        '& > span:nth-child(1)': {
            fontSize: "12px",
            marginLeft: "10px"
        },
        '& > span:nth-child(2)': {
            fontSize: "10px"
        }
    },
    dayList: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "86%",
        marginTop: '15px',
        marginBottom: '40px',
        '& > span': {
            color: "#646F87",
            cursor: "pointer"
        },
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        }
    },
    activeClass: {
        background: '#696ffb',
        borderRadius: '50%',
        padding: "4px",
        color: "white !important",
    },

    statisticsDiv: {
        marginTop: "20px",
        '& > div': {
            borderBottom: '1px solid grey',
            color:"grey",
            fontSize: "22px",
            textAlign: "right",
            cursor:"pointer",
            transition:"0.2s ease",
            [theme.breakpoints.down('xs')]: {
                fontSize: "16px",
            },
            '&:hover':{
                borderBottom: '1px solid white',
                color:"white",
            }

        }
    }
}))
const IndexMiddleSection = () => {
    const classes = useStyles();
    const mobileView = useMediaQuery('(max-width:768px)');

    return (
        <div className={classes.container} >
            <Portfolio />
            <SectorDonut />
            {!mobileView && <DeskTopStats />}


        </div>
    )
}

export default IndexMiddleSection
