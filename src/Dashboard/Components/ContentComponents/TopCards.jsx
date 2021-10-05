import { makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useContext, useEffect, useState,useRef } from 'react'
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { cardsData } from '../../../Data/topCards';
import MobStats from './MiddleSection/Components/MobStats';
import { getDashboardStreamingApi, getUnrealisticData } from './../../../Services/dashboardService';
import DashboardContext from '../dashboardContext/dashboardContext';
const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        [theme.breakpoints.down('xs')]: {
            display: "block",
        }
    },
    cardcontainer: {
        flex: 1,
        minHeight: "120px",
        background: "var(--primary-color)",
        padding: "8px",
        boxSizing: "border-box",
        position: 'relative',
        borderRadius: "7px",
        '& > span': {
            textTransform: 'uppercase',
            color: "#f3f3f3"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '11px',
            minHeight: "80px"
        }


    },
    flexBottom: {
        position: "absolute",
        bottom: '5px',
        left: '10px',
        right: '10px',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
        '& > div:nth-child(1)': {
            position: 'absolute',
            bottom: "-10px"
        }
    },
    mob: {
        display: "none",
        [theme.breakpoints.down('xs')]: {
            display: "block",
        }
    },
    desktop: {
        display: "block",
        [theme.breakpoints.down('xs')]: {
            display: "none"
        }
    }

}))
const TopCards = () => {
    const classes = useStyles();
    const mobileView = useMediaQuery('(max-width:768px)');
    const [sliderRef] = useKeenSlider({ slidesPerView: 2, spacing: 15 });
    const { portfolio_name, dashboardStreaming } = useContext(DashboardContext);
    const [data, setData] = useState();
    const [stockCount, setStockCount] = useState({ positiveCount: 0, negativeCount: 0 });
    const internalRef=useRef();

    const getUnrealistic = async () => {
        try {
            const { data } = await getUnrealisticData(portfolio_name);
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }
    const getDashboardStreaming = async () => {
        try {
            internalRef.current = setInterval(async () => {
            const { data } = await getDashboardStreamingApi(portfolio_name);
            console.log("Interval",data);
            dahboardStreamingCountHandler(data);
            },10000)
        } catch (error) {
            console.log(error);
        }
    }

    const intervalClear = () => {
        clearInterval(internalRef.current)
    }

    const dahboardStreamingCountHandler = (dashboardStreaming) => {
        if (dashboardStreaming.data) {
            let positiveCount = 0;
            let negativeCount = 0;
            for (let i in dashboardStreaming.data) {
                if (dashboardStreaming.data[i].change > 0) positiveCount++;
                if (dashboardStreaming.data[i].change < 0) negativeCount++;
            }

            setStockCount({ positiveCount, negativeCount })
        }
    }
    useEffect(() => {
        getUnrealistic();
        dahboardStreamingCountHandler(dashboardStreaming);
        intervalClear()
        getDashboardStreaming();
    }, [portfolio_name, dashboardStreaming])
    return (
        <div className={classes.container}>

            {!mobileView && <>{cardsData(data, stockCount).map(element => {
                return (
                    <div key={element.title} className={classes.cardcontainer}>
                        <span>{element.title}</span>
                        <div className={classes.flexBottom}>
                            <div >{element.graph}</div>
                            <div></div>
                            <div>{element.rightBottom}</div>
                        </div>
                    </div>
                )
            })}
            </>}


            <div className={classes.mob}>
                <div ref={sliderRef} className="keen-slider">
                    {cardsData(data, stockCount).map((element, index) => {
                        return (
                            <div key={index} className={`keen-slider__slide number-slide${index + 1}`}>
                                <div className={classes.cardcontainer} >
                                    <span>{element.title}</span>
                                    <div className={classes.flexBottom}>
                                        <div >{element.graph}</div>
                                        <div></div>
                                        <div>{element.rightBottom}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>


        </div>
    )
}

export default TopCards
