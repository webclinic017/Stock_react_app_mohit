import { makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react'
import BottomSection from './ContentComponents/BottomSection/BottomSection';
import MobStats from './ContentComponents/MiddleSection/Components/MobStats';
import Portfolio from './ContentComponents/MiddleSection/Components/PortfolioStats/Portfolio';
import SectorDonut from './ContentComponents/MiddleSection/Components/SectorDonut';
import IndexMiddleSection from './ContentComponents/MiddleSection/IndexMiddleSection';
import TopCards from './ContentComponents/TopCards';
import BottomNavigationComponent from './ContentComponents/BottomNavigation/BottomNavigationComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getPortfolios, getDashboardStreamingApi } from './../../Services/dashboardService';
import DashboardContext from './dashboardContext/dashboardContext';


const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: '20px',
        paddingRight: '40px',
        marginBottom: "80px",
        [theme.breakpoints.down('xs')]: {
            paddingRight: "20px"
        }
    },
    logoDiv: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center"

    },
    logo: {
        fontSize: "18px",
        marginTop: "15px",

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))
const Content = () => {
    const classes = useStyles();
    const mobileView = useMediaQuery('(max-width:768px)');
    const [portfolios, setPortfolios] = React.useState('');
    const [portfoliosData, setPortfoliosData] = React.useState([]);
    const [dashboardStreaming, setDashboardStreaming] = React.useState({});

    const handlePortfolioChange = (value) => {
        setPortfolios(value);
    };

    const getPortfolio = async () => {
        const { data } = await getPortfolios();
        setPortfoliosData(data)
        handlePortfolioChange(data[0].name)

    }
    const getDashboardStreaming = async () => {
        try {
            const { data } = await getDashboardStreamingApi(portfolios);
            console.log(data);
            setDashboardStreaming(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPortfolio();
    }, [])
    useEffect(() => {
        getDashboardStreaming();
    }, [portfolios])
    return (
        <DashboardContext.Provider value={{ portfolio_name: portfolios, handlePortfolioChange, dashboardStreaming }}>
            <div className={classes.container}>
                <div className={classes.logoDiv}>
                    <span className={classes.logo}>Questimate</span>

                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Select Portfolio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={portfolios}
                                onChange={(e) => handlePortfolioChange(e.target.value)}
                            >
                                {portfoliosData.map(element => {
                                    return <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>
                                })}
                                {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <TopCards />
                {mobileView && <MobStats />}
                {!mobileView && <IndexMiddleSection />}
                {mobileView && <div className="mt-32"><SectorDonut /></div>}
                <BottomSection />
                {mobileView && <div className="mt-16"><Portfolio /></div>}
                {mobileView && <BottomNavigationComponent />}
            </div>
        </DashboardContext.Provider>
    )
}

export default Content
