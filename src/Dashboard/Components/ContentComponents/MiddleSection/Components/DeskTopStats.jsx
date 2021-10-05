import React, { useContext, useEffect, useState, useRef } from 'react'
import { useStyles } from './../IndexMiddleSection';
import { topGainers } from '../../../../../Data/topGainers';
import { topLosers } from '../../../../../Data/topLosers';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import DashboardContext from './../../../dashboardContext/dashboardContext';
import { getDashboardStreamingApi } from './../../../../../Services/dashboardService';
const DeskTopStats = () => {
    const classes = useStyles();
    const [stockCount, setStockCount] = useState({ positiveArr: [], negativeArr: [] })

    const { dashboardStreaming, portfolio_name } = useContext(DashboardContext);

    const internalRef = useRef();

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
        }
        internalRef.current = setInterval(async () => {
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
        }, 10000);

        return () => {
            clearInterval(internalRef.current)
        }
    }

    const intervalClear = () => {
        clearInterval(internalRef.current)
    }
    useEffect(() => {
        dashboardStreamingHandler();

    }, [])
    useEffect(() => {
        intervalClear()
        dashboardStreamingHandler();
    }, [portfolio_name, dashboardStreaming])
    return (
        <div className={classes.lastCard}>
            <div className={classes.topGainers}>
                <span> TOP GAINERS</span>
                <span> Portfolio </span>
                <CallMadeIcon style={{ fontSize: "18px", color: "#1EBC8D" }} />
            </div>
            <div className={classes.dataDiv}>
                {stockCount.positiveArr.map(element => {
                    return (
                        <div key={element.name} className={classes.dataRow}>
                            <span >{element.tradingsymbol}</span>
                            <span className={classes.colorGainer}>({element.change}%)</span>
                            <span>₹&nbsp;{element.last_price}</span>
                        </div>
                    )
                })}


            </div>
            <div className={`${classes.topGainers} mt-8`}>
                <span> TOP LOSERS</span>
                <span> Portfolio </span>
                <CallReceivedIcon style={{ fontSize: "18px", color: "#F45631" }} />
            </div>
            <div className={classes.dataDiv}>
                {stockCount.negativeArr.map(element => {
                    return (
                        <div key={element.name} className={classes.dataRow}>
                            <span>{element.tradingsymbol}</span>
                            <span className={classes.colorLoser}>({element.change}%)</span>
                            <span>₹&nbsp;{element.last_price}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DeskTopStats
