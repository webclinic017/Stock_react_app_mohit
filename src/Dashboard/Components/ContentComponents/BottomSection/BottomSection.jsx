import React, { useEffect, useState, useRef, useContext } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { Donut, DonutValue, DonutLabel } from 'react-donut-component';
import { Line } from "react-chartjs-2";
import { data, options } from '../../../../Data/lineChart';
import AddIcon from '@material-ui/icons/Add';
import { useStyles as useStyles2 } from './../MiddleSection/IndexMiddleSection';
import DashboardContext from '../../dashboardContext/dashboardContext';
import { getBuyingPower, performanceApiLineGraph, performanceApiLineGraphComparison, performanceApiLineGraphComparisonDefault } from './../../../../Services/dashboardService';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: "15px",
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        alignItems: "center",
        gap: "15px",
        [theme.breakpoints.down('sm')]: {
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap-reverse"
        }

    },
    flexItem1: {
        flexGrow: 2,
        background: "#141629",
        borderRadius: "7px",
        minHeight: "320px",
        padding: "8px",
        boxSizing: "border-box",
        [theme.breakpoints.down('xs')]: {
            minHeight: "200px",

        }
    },
    flexItem2: {
        flexGrow: 0.9,
        background: "#141629",
        borderRadius: "7px",
        minHeight: "320px",
        padding: "8px",
        boxSizing: "border-box",
        clip: "inset(0px 50% 0px 0px)",
        [theme.breakpoints.down('xs')]: {
            minHeight: "0px",
        },

        '& > div:nth-child(2)': {
            width: '520px',
            height: "100%",
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        },
        '& > div:nth-child(1)': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }

    },
    donutDiv: {
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: '30px'
    },
    donutLabelDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& > span:nth-child(2)': {

        }
    },
    donutLabelItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        '& > span:nth-child(2)': {
            fontSize: "11px"
        }
    },
    labelContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    borderPlus: {
        padding: "2px",
        borderRadius: "8px",
        border: "1px solid #343778",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: 'pointer'
    },
    performanceClasses: {
        position: 'absolute',
        width: "140px",
        background: "#070A1B",
        minHeight: "30px",
        top: 30,
        borderRadius: "5px",
        padding: "10px",
        flexDirection: "column",
        right: '5px',
        display: "none",
        gap: "5px",
        color: "grey"
    }
}))

const BottomSection = React.memo(() => {
    const classes = useStyles();
    const classes2 = useStyles2();
    const mobileView = useMediaQuery('(max-width:768px)');
    const [dropDown, setDropDown] = useState(false);
    const [currentDropDown, setCurrentDropDown] = useState([]);
    const [apiData, setApiData] = useState({ labels: [], values: [] });
    const [apiDataComparidon, setApiDataComparison] = useState({ labels: [], values: [] });
    const [lineChartData, setLineChartData] = useState(data([], []));
    const [buyingPower, setBuyingPower] = useState([]);
    const dropDownWrapperRef = useRef();
    const currentGraphData = useRef([]);
    const graphDataset = useRef([]);
    const letRefArray = useRef([]);
    const [activeElement, setActiveElement] = useState('6M');
    const { portfolio_name, dashboardStreaming } = useContext(DashboardContext);
    const activeHandler = (element) => {

        setActiveElement(element);

        setCurrentDropDown(letRefArray.current)

        console.log(letRefArray.current);
    }

    const handleDropdown = () => {
        setDropDown(!dropDown);
    }

    const performanceApiLineGraphComparisonHandler = async (elementDropDown) => {
        try {
            let defaultGraphCheckerIndex = graphDataset.current.findIndex(element => {
                return element.label === portfolio_name
            })
            if (defaultGraphCheckerIndex !== -1) {
                graphDataset.current.splice(defaultGraphCheckerIndex, 1);
            }
            const { data: dataApi } = await performanceApiLineGraphComparison(elementDropDown, activeElement.toLocaleLowerCase());
            const labels = Object.keys(dataApi);
            const values = Object.values(dataApi)
            // setApiDataComparison({ labels, values });
            let findDefault = graphDataset.current.find(element => {
                return element.label === "Comparison"
            })
            if (!findDefault) {
                const { data: dataApi } = await performanceApiLineGraphComparisonDefault(portfolio_name, activeElement.toLocaleLowerCase());
                const labelsComp = Object.keys(dataApi);
                const valuesComp = Object.values(dataApi);
                console.log(dataApi, "dataApi::::::::::::");
                graphDataset.current.push({
                    label: "Comparison",
                    data: valuesComp,
                    fill: false,
                    borderColor: "#555ACA"
                })
            }
            if (elementDropDown === 'SENSEX') {

                graphDataset.current.push({
                    label: "SENSEX",
                    data: values,
                    fill: false,
                    borderColor: "#21CE99"
                })
                setLineChartData(null)
                setTimeout(() => {
                    setLineChartData(data(labels, values, graphDataset.current))
                    currentGraphData.current = data(labels, [], graphDataset.current)
                }, 100);
                letRefArray.current.push(elementDropDown);
                setCurrentDropDown([...letRefArray.current])

            } else if (elementDropDown === 'NIFT 50') {

                setLineChartData(null)
                setTimeout(() => {
                    graphDataset.current.push(
                        {
                            label: "NIFT 50",
                            data: values || [],
                            fill: false,
                            borderColor: "#dedede"
                        }
                    )
                    setLineChartData(data(labels, [], graphDataset.current))

                    currentGraphData.current = data(labels, [], graphDataset.current)
                }, 100);
                letRefArray.current.push(elementDropDown);
                setCurrentDropDown([...letRefArray.current])
            }
            else if (elementDropDown === 'NIFTY BANK') {

                setLineChartData(null)
                setTimeout(() => {
                    graphDataset.current.push(
                        {
                            label: "NIFTY BANK",
                            data: values,
                            fill: false,
                            borderColor: "#dedede"
                        }
                    )
                    setLineChartData(data(labels, [], graphDataset.current))

                    currentGraphData.current = data(labels, [], graphDataset.current)
                }, 100);
                letRefArray.current.push(elementDropDown);
                setCurrentDropDown([...letRefArray.current])
            }


        } catch (error) {
            console.log(error);
        }
    }

    const handleElementClickDropDown = (element) => {
        console.log(element);

        if (letRefArray.current.includes(element)) {
            let objArr = letRefArray.current.findIndex(arr => {
                return arr === element;
            });
            console.log(objArr);
            if (objArr === -1) return
            if (graphDataset.current.length > 0) {
                let graphIndex = graphDataset.current.findIndex(obj => {
                    return obj.label === element
                })
                console.log(graphIndex);

                if (graphIndex === -1) return

                graphDataset.current.splice(graphIndex, 1);
            }


            let objArrIndex = currentGraphData.current.datasets.findIndex(arr => {
                return arr.label === element;
            });
            console.log(objArrIndex);

            if (objArrIndex === -1) return
            currentGraphData.current.datasets.splice(objArrIndex, 1);
            console.log("Running");


            letRefArray.current.splice(objArr, 1)
            setLineChartData(null);
            setTimeout(() => {
                setLineChartData(data([], [], graphDataset.current))
                setCurrentDropDown([...letRefArray.current]);

            }, 100)
            if (letRefArray.current.length === 0) {
                performanceApiLineGraphHandler()
            }



            // let objArr = letRefArray.current.findIndex(arr => {
            //     return arr === element;
            // });
            // if (objArr === -1) return
            // letRefArray.current.splice(objArr, 1)
            // setLineChartData(null);
            // setTimeout(() => {
            //     console.log(currentGraphData.current, 'currentGraphData.current)');
            //     setLineChartData(data([], [], graphDataset.current))
            //     setCurrentDropDown([...letRefArray.current]);
            // }, 100)

        } else {
            performanceApiLineGraphComparisonHandler(element)

        }

        setCurrentDropDown([...currentDropDown,element])
    }
    const performanceApiLineGraphHandler = async () => {
        try {
            graphDataset.current = [];
            // setCurrentDropDown([]);
            letRefArray.current = [];

            // let defaultGraphCheckerIndex = graphDataset.current.findIndex(element => {
            //     return element.label === 'Comparison'
            // })
            // if (defaultGraphCheckerIndex !== -1) {
            //     graphDataset.current.splice(defaultGraphCheckerIndex, 1);
            // }



            // graphDataset.current = [];
            const { data: ApiData } = await performanceApiLineGraph(portfolio_name, activeElement.toLocaleLowerCase());

            const labels = Object.keys(ApiData);
            const values = Object.values(ApiData);
            // setApiData({ labels, values });
            graphDataset.current.push(
                {
                    label: portfolio_name,
                    data: [...values],
                    fill: false,
                    borderColor: "#555ACA"
                }
            )
            localStorage.setItem('labels', JSON.stringify(labels));
            setLineChartData(null);
            setTimeout(() => {

                setLineChartData(data(labels, [], graphDataset.current))
            }, 100)

        } catch (error) {

        }
    }

    const buyPowerHandler = async () => {
        try {
            const { data } = await getBuyingPower();
            setBuyingPower(data);
        } catch (error) {
            console.log(error);
        }
    }
    const runDropDown = () => {
        if (currentDropDown.length === 0) {
            performanceApiLineGraphHandler()

        } else {
        }
    }
    useEffect(() => {
        window.addEventListener('resize', setWindowSize);
    }, []);



    // useEffect(() => {
    //     // runDropDown();

    // }, [])
    useEffect(() => {
        performanceApiLineGraphHandler();

    }, [portfolio_name, activeElement])
    useEffect(() => {

        buyPowerHandler();

    }, [portfolio_name, dashboardStreaming])

    useEffect(() => {
        window.addEventListener('mousedown', handleCloseOutside);

        return () => {
            window.removeEventListener('mousedown', handleCloseOutside);
        }
    })
    function handleCloseOutside(e) {
        const { current: wrap } = dropDownWrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setDropDown(false)
        }
    }
    function setWindowSize() {
        let canvas = document.querySelector('.chartjs-render-monitor');
        canvas?.setAttribute('style', "display: block; height: 203px; width: 206px;")
    }
    const donutValue = () => {
        if (buyingPower && dashboardStreaming) {
            return Math.floor((Number(dashboardStreaming?.total?.total_val) / Number((dashboardStreaming?.total?.total_val) + Number(buyingPower?.[0]?.buyingpower)) * 100));
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.flexItem1}>
                <span>INVESTING</span>
                <div className={classes.donutDiv}>
                    {dashboardStreaming && <Donut
                        color="rgba(0,0,0,1)"
                        indicatorColor="rgba(121,210,222,1)"
                        // linecap="round"
                        size={mobileView ? 130 : 192}
                        strokeWidth={mobileView ? 18 : 20}
                        trackColor="rgba(100,111,135,1)"
                    >
                        <DonutValue style={{ fontWeight: 'bold' }}
                            symbol='%'
                            styleSymbol={{ fontWeight: 'bold', fontSize: mobileView ? "16px" : "24px", color: "white" }}
                            style={{ color: "white", fontSize: mobileView ? "16px" : "24px" }}
                            symbolPosition='center'>
                            {Number(donutValue())}


                        </DonutValue>
                        {/* {Number(donutValue())} */}

                    </Donut>
                    }
                    <div className={classes.labelContainer}>
                        <div className={classes.donutLabelDiv}>
                            <div className={classes.donutLabelItem}>
                                <span style={{ color: "#79D2DE", fontSize: "44px" }}>&bull;</span>
                                <span>Total Market Value</span>
                            </div>
                            <span style={{ position: "relative", top: "-15px" }}>₹ {dashboardStreaming?.total?.total_val}</span>

                        </div>
                        <div style={{ position: "relative", top: "-15px" }} className={classes.donutLabelDiv}>
                            <div className={classes.donutLabelItem}>
                                <span style={{ color: "#646F87", fontSize: "44px" }}>&bull;</span>
                                <span>Buying Power</span>
                            </div>
                            <span style={{ position: "relative", top: "-15px", left: "10px" }}>₹ {buyingPower?.[0]?.buyingpower} </span>

                        </div>
                    </div>

                </div>
            </div>
            <div className={classes.flexItem2}>
                <div>
                    <span>PORTFOLIO PERFORMANCE</span>
                    <div ref={dropDownWrapperRef} className={classes.borderPlus}>
                        <AddIcon onClick={handleDropdown} style={{ fontSize: "20px" }} />
                        <div style={{ display: dropDown && 'flex' }} className={classes.performanceClasses}>
                            {['SENSEX', 'NIFT 50', 'NIFTY BANK'].map(element => {
                                return <span key={element} onClick={() => handleElementClickDropDown(element)} style={{ color: currentDropDown.includes(element) && 'white' }}>{element}</span>
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: "30px" }} className={classes2.dayList}>
                    {['1D', '1W', '1M', '6M', '1Y', '2Y', '3Y'].map(element => {
                        return <span onClick={() => activeHandler(element)} className={activeElement === element && classes2.activeClass}>{element}</span>
                    })}
                </div>
                <div className="mt-16">
                    <Line height={!mobileView ? "188px" : 'auto'} className="chartjs-render-monitor" data={lineChartData} options={options} />
                </div>

            </div>
        </div>
    )
})

export default BottomSection
