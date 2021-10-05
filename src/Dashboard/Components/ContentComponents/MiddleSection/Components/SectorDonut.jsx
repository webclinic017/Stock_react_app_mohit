import React, { useContext, useEffect, useState } from 'react'
import { DonutMultiple, DonutElement, DonutLabel } from 'react-donut-component';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import DashboardContext from '../../../dashboardContext/dashboardContext';
import { getDonutSectorData } from '../../../../../Services/dashboardService';
const useStyles = makeStyles(theme => ({
    cardContainer: {
        flex: 1,
        minHeight: "30px",
        background: "var(--primary-color)",
        padding: "8px",
        boxSizing: "border-box",
        position: 'relative',
        borderRadius: "7px",
        paddingBottom: '35px',
        minHeight: '100%',
        '& > span': {
            color: "#f3f3f3"
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: '5px',
        }
    },
    donutDiv: {
        width: "215px", marginTop: "30px", paddingTop: "5%", paddingBottom: '5%', position: "relative",
        '& > div:nth-child(1)': {
            position: "absolute",
            left: "38%",
            top: "47%"
        }
    }
}))
const SectorDonut = () => {
    const classes = useStyles();
    const mobileView = useMediaQuery('(max-width:768px)');
    const { portfolio_name } = useContext(DashboardContext);
    const [data, setData] = useState({ labels: [], values: [] });
    const donut = {
        data: {
            datasets: [
                {
                    data: data.values,
                    backgroundColor: [
                        '#007BFF',
                        '#F45631',
                        '#21CE99',
                        '#746Ab0',
                        '#FFCE30'
                    ],
                    hoverOffset: 2,
                    borderColor: "white",
                    borderWidth: 0
                }
            ],
            labels: data.labels
        },
        animation: true,

    };
    const donutData = (labels, values) => {

        console.log(labels, values, 'labels, valueslabels, valueslabels, values', data);
        return {
            data: {
                datasets: [
                    {
                        data: [56, 22, 22],
                        backgroundColor: [
                            '#007BFF',
                            '#F45631',
                            '#21CE99'
                        ],
                        hoverOffset: 2,
                        borderColor: "white",
                        borderWidth: 0
                    }
                ],
                labels: ['Sector1', 'Sector2', 'Sector3']
            },
            animation: true,

        }
    }


    const getDonutData = async (portfolio_name) => {
        try {
            const { data } = await getDonutSectorData(portfolio_name);
            // console.log(data, ':::::::::');
            const labels = Object.keys(data);
            const values = Object.values(data);
            // console.log(labels, values);
            setData({ labels, values });
            // donutData(labels, values)
            // setDonutData({ values, labels })
        }
        catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getDonutData(portfolio_name)
    }, [portfolio_name])
    return (
        <div className={classes.cardContainer}>
            <span>SECTOR ALLOCATION</span>

            <div className="d-flex justify-content-center align-items-center">
                {/* <DonutMultiple animate size={mobileView ? 180 : 275} strokeWidth={mobileView ? 14 : 16}>
                    <DonutElement color='#007BFF' >5.6</DonutElement>
                    <DonutElement color='#F45631' >2.2</DonutElement>
                    <DonutElement color='#21CE99' >2.2</DonutElement>
                    <DonutLabel style={{ fontSize: "12px" }}>Sectors</DonutLabel>
                </DonutMultiple> */}
                <div className={classes.donutDiv}>
                    {portfolio_name !== '' && <div>Sectors</div>}
                    {portfolio_name === '' && <div style={{ width: "100%", position: "absolute", top: "50%", left: "10%" }} className="d-flex justify-content-start align-items-start ">Please Select Portfolio Name</div>}

                    <Doughnut
                        data={donut.data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            cutout: 63

                        }}
                    />

                </div>
            </div>
        </div>
    )
}

export default SectorDonut
