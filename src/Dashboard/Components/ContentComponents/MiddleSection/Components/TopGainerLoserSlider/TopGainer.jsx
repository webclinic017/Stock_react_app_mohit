import React, { useEffect, useState } from 'react'
import { topGainers } from '../../../../../../Data/topGainers';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import { useStyles2 } from '../MobStats';
import { useStyles } from './../../IndexMiddleSection';
const TopGainer = ({ stock }) => {
    const [options, setOptions] = useState({});
    const [sliderRef] = useKeenSlider(options)
    const classes = useStyles();
    const classesMob = useStyles2();

    useEffect(() => {
        setOptions({})
        setTimeout(() => {
            setOptions({ slidesPerView: 2, spacing: 15 })

        }, 100)
    }, [stock])

    return (
        <div ref={sliderRef} className="keen-slider">
            {stock.map((element, index) => {
                return (
                    <div key={element.tradingsymbol} className={`keen-slider__slide number-slide${index + 1}`}>
                        <div className={classesMob.innerContainer}>
                            <span >{element.tradingsymbol}</span>
                            <div className={classesMob.bottomSection}>
                                <span className={classes.colorGainer}>({element.change}%)</span>
                                <span>₹&nbsp;{element.last_price}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TopGainer
