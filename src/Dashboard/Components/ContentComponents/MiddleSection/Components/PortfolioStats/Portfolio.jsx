import React, { useState, useEffect, useContext } from 'react'
import { useStyles } from './../../IndexMiddleSection';
import DashboardContext from '../../../../dashboardContext/dashboardContext';
import { portfolioStats } from '../../../../../../Services/dashboardService';

const Portfolio = () => {
    const classes = useStyles();
    const [dataStats, setDataStats] = useState({});
    const { portfolio_name } = useContext(DashboardContext);
    const [activeElement, setActiveElement] = useState('6M');
    const activeHandler = (element) => {
        setActiveElement(element)
    }

    const portfolioStatsHandler = async () => {
        try {
            const { data } = await portfolioStats(portfolio_name, activeElement.toLocaleLowerCase());
            setDataStats(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        portfolioStatsHandler()
    }, [activeElement, portfolio_name])
    return (
        <div className={classes.cardContainer}>
            <span> PORTFOLIO STATISTICS</span>
            <div className={classes.dayList}>
                {['1D', '1W', '1M', '6M', '1Y', '2Y', '3Y'].map(element => {
                    return <span key={element} onClick={() => activeHandler(element)} className={activeElement === element && classes.activeClass}>{element}</span>
                })}
            </div>
            <div className={classes.statisticsDiv}>
                <span>Mean</span>
                <div>
                    {dataStats?.mean ?? <div>&nbsp;</div>}
                </div>
            </div>
            <div className={classes.statisticsDiv}>
                <span>Deviation</span>
                <div>
                    {dataStats?.stdev ?? <div>&nbsp;</div>}

                </div>
            </div>
            <div className={classes.statisticsDiv}>
                <span>Sharp Ratio</span>
                <div>
                    {dataStats?.sharpe_ratio ?? <div>&nbsp;</div>}

                </div>
            </div>
        </div>
    )
}

export default Portfolio
