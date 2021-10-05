import React, { useContext, useEffect } from 'react'
import { topGainers } from '../../../../../Data/topGainers';
import { topLosers } from '../../../../../Data/topLosers';
import { useStyles } from './../IndexMiddleSection';
import { makeStyles } from '@material-ui/core';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import TopGainer from './TopGainerLoserSlider/TopGainer';
import TopLosers from './TopGainerLoserSlider/TopLosers';
import DashboardContext from './../../../dashboardContext/dashboardContext';
import { useState } from 'react';
import { getDashboardStreamingApi } from './../../../../../Services/dashboardService';
export const useStyles2 = makeStyles({
    innerContainer: {
        background: "#141629",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "9px",
        boxSizing: "border-box",
        borderRadius: "8px",
        '& > span': {
            fontSize: "11px"
        }
    },
    bottomSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        '& > span': {
            fontSize: "11px"
        }
    }
})
const MobStats = () => {
    const classes = useStyles();
    // const classesMob = useStyles2();
    // const [sliderRef] = useKeenSlider({ slidesPerView: 2, spacing: 15 })
    const [stockCount, setStockCount] = useState({ positiveArr: [], negativeArr: [] })

    const { dashboardStreaming, portfolio_name } = useContext(DashboardContext);

    const dashboardStreamingHandler = () => {
        if (dashboardStreaming.data) {
            let positiveArr = [];
            let negativeArr = [];
            for (let i in dashboardStreaming.data) {
                if (dashboardStreaming.data[i].change > 0) positiveArr.push(dashboardStreaming.data[i]);
                if (dashboardStreaming.data[i].change < 0) negativeArr.push(dashboardStreaming.data[i]);
            }

            const positiveSort = positiveArr.sort((a, b) => {
                if (a.change > b.change) return -1
                if (a.change < b.change) return 1
                return 0
            }).slice(0, 4)
            const negativeSort = negativeArr.sort((a, b) => {
                if (a.change > b.change) return 1
                if (a.change < b.change) return -1
                return 0
            }).slice(0, 4)
            setStockCount({ positiveArr: positiveSort, negativeArr: negativeSort })

            setInterval(async () => {
                const { data } = await getDashboardStreamingApi(portfolio_name);
                if (data.data) {
                    let positiveArr = [];
                    let negativeArr = [];
                    for (let i in data.data) {
                        if (data.data[i].change > 0) positiveArr.push(data.data[i]);
                        if (data.data[i].change < 0) negativeArr.push(data.data[i]);
                    }

                    const positiveSort = positiveArr.sort((a, b) => {
                        if (a.change > b.change) return -1
                        if (a.change < b.change) return 1
                        return 0
                    }).slice(0, 4)
                    const negativeSort = negativeArr.sort((a, b) => {
                        if (a.change > b.change) return 1
                        if (a.change < b.change) return -1
                        return 0
                    }).slice(0, 4)
                    setStockCount({ positiveArr: positiveSort, negativeArr: negativeSort })
                }
            }, 10000)
        }
    }
    useEffect(() => {
        dashboardStreamingHandler();
    }, [dashboardStreaming, portfolio_name])

    return (
        <div className={classes.lastCard}>
            <div className={`${classes.topGainers} mt-16`}>
                <span> TOP GAINERS</span>
                <span> Portfolio </span>
            </div>
            <TopGainer stock={stockCount.positiveArr} />
            <div className={`${classes.topGainers} mt-16`}>
                <span> TOP LOSERS</span>
                <span> Portfolio </span>
            </div>
            <TopLosers stock={stockCount.negativeArr} />
        </div>
    )
}

export default MobStats
