import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import classes from './topCards.module.css'
export const cardsData = (data, stockCount) => {

    return [
        {
            title: 'Stock Moving Up',
            graph: <TrendingUpIcon className={classes.icon} />,
            rightBottom: <span className={classes.spanFont}>{stockCount.positiveCount}</span>

        },
        {
            title: 'Stock Moving Down',
            graph: <TrendingDownIcon className={classes.iconReverse} />,
            rightBottom: <span className={classes.spanFont}>{stockCount.negativeCount}</span>

        },
        {
            title: 'REALISED GAIN',
            graph: <TrendingUpIcon className={classes.icon} />,
            rightBottom: <><span style={{ color: "#5A647B" }}>Returns:&nbsp;</span><span style={{ color: "#1EA37F" }}>+₹{data?.realised_gain_loss}</span></>

        },
        {
            title: 'Unrealised gain',
            graph: <TrendingDownIcon className={classes.iconReverse} />,
            rightBottom: <><span style={{ color: "#5A647B" }}>Returns:&nbsp;</span><span style={{ color: "#EA5331" }}>-₹{data?.unrealised_gain_loss}</span></>

        }
    ]

}