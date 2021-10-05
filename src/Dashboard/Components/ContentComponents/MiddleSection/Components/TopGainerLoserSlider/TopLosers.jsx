import React, { useContext, useEffect, useState } from 'react'
import { topLosers } from '../../../../../../Data/topLosers';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import { useStyles2 } from '../MobStats';
import { useStyles } from './../../IndexMiddleSection';
import DashboardContext from './../../../../dashboardContext/dashboardContext';
const TopLosers = ({ stock }) => {
    const [options, setOptions] = useState({});
    const [sliderRef] = useKeenSlider(options)
    const classes = useStyles();
    const classesMob = useStyles2();
    const { portfolio_name } = useContext(DashboardContext);

    useEffect(() => {
        setOptions({})
        setTimeout(() => {
            setOptions({ slidesPerView: 2, spacing: 15 })

        }, 100)
    }, [stock, portfolio_name])
    return (

        <div ref={sliderRef} className="keen-slider">
            {stock.map((element, index) => {
                return (
                    <div key={element.tradingsymbol} className={`keen-slider__slide number-slide${index + 1}`}>
                        <div className={classesMob.innerContainer}>
                            <span >{element.tradingsymbol}</span>
                            <div className={classesMob.bottomSection}>
                                <span className={classes.colorLoser}>({element.change}%)</span>
                                <span>₹&nbsp;{element.last_price}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>


    )
}

export default TopLosers
