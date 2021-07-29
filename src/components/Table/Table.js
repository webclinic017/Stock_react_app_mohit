import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MuiTableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import Custombutton from "../Button/Custombutton";
import Progressbar from "../Progressbar/Progressbar";
import styles from "./Table.module.css";
import Layout from "../Layout/Layout";
import api from "../../constant";
import config from "../../Firebase";
import Firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

var token = localStorage.getItem("token");

function createData(
  id,
  ticker,
  securityname,
  change,
  lastprice,
  weight,
  quantity,
  value,
  cost,
  totalreturn,
  ctr
) {
  return {
    id,
    ticker,
    securityname,
    change,
    lastprice,
    weight,
    quantity,
    value,
    cost,
    totalreturn,
    ctr,
  };
}
const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);
const secondHeader = [
  createData(50, 2005, 20, 5087, "80%", 734760, 36777, 55563, 5788, 80, 20),
];
const rows = [
  createData(
    1,
    <Custombutton bankName="BANKBARODA" dChange={false} />,
    "BANK OF BARODA",
    -1.0,
    25,
    <Progressbar position={20} />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    2,
    <Custombutton bankName="BAJAJHIND" dChange={true} />,
    "BAJAJ AUTO",
    1.0,
    223,
    <Progressbar position={85} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    3,
    <Custombutton bankName="NAUKRI" dChange={false} />,
    "NAUKRI",
    -1.0,
    222,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    4,
    <Custombutton bankName="NAUKRI" dChange={false} />,
    "NAUKRI",
    -1.0,
    224,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    5,
    <Custombutton bankName="HDFCBANK" dChange={true} />,
    "HDFC",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    6,
    <Custombutton bankName="HDFCBANK" dChange={true} />,
    "HDFC",
    1.0,
    228,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    7,
    <Custombutton bankName="AXISBANK" dChange={true} />,
    "AXIS BANK",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    8,
    <Custombutton bankName="HDFCBANK" dChange={false} />,
    "HDFC",
    -1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    9,
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    10,
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    11,
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    12,
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    13,
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    1.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    14,
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    22.0,
    22,
    <Progressbar position={50} />,
    734760,
    36777,
    36781,
    20,
    20
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  var array2 = array;
  const stabilizedThis = array2.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "ticker", numeric: true, disablePadding: false, label: "TICKER" },
  {
    id: "securityname",
    numeric: true,
    disablePadding: false,
    label: "SECURITY NAME",
  },
  { id: "change", numeric: true, disablePadding: false, label: "%1D CHANGE" },
  {
    id: "lastprice",
    numeric: true,
    disablePadding: false,
    label: "LAST PRICE",
  },
  { id: "weight", numeric: true, disablePadding: false, label: "WEIGHT" },
  { id: "quantity", numeric: true, disablePadding: false, label: "QUANTITY" },
  { id: "value", numeric: true, disablePadding: false, label: "VALUE" },
  { id: "cost", numeric: true, disablePadding: true, label: "COST" },
  {
    id: "totalreturn",
    numeric: true,
    disablePadding: true,
    label: "TOTAL RETURN",
  },
  { id: "ctr", numeric: true, disablePadding: false, label: "CTR" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{
              fontSize: "12px",
              fontWeight: "450",
              letterSpacing: "1px",
            }}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(0),
    backgroundColor: "#141629",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  filterIcon: {
    height: "31px",
    width: "31px",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        SECURITY OVERVIEW
      </Typography>

      {/* <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <img
            src="https://res.cloudinary.com/de1v32nv0/image/upload/v1620350560/icons/filter-1634626_johksw.png"
            alt="filtericon"
            className={classes.filterIcon}
          />
        </IconButton>
      </Tooltip> */}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#141629",
    paddingRight: theme.spacing(5),
  },

  containerr: {
    maxHeight: 590,
  },
  paginationColor: {
    backgroundColor: "#141629",
  },
  paper: {
    width: "100%",
  },
  table: {
    minWidth: 750,
    backgroundColor: "#141629",
    color: "red",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  containerWidth: {
    maxWidth: "1450px",
  },
  tableCell: {
    color: "#94959D!important",
    fontSize: "13px",
    letterSpacing: "1px",
  },
  tableCellSticky: {
    color: "#94959D!important",
    backgroundColor: "#070A1B",
    fontSize: "13px",
    letterSpacing: "1px",
    // position: "sticky",
    top: "56px",
    zIndex: "99999",
  },
  tableCellRed: {
    color: "#DA4F30",
    fontSize: "12px",
  },
  tableCellGreen: {
    color: "#21CE99",
    fontSize: "12px",
  },
  firstRow: {
    backgroundColor: "#070A1B",
  },
}));

export default function EnhancedTable() {
  // console.log("ggggggg:",localStorage.getItem("default_portfolio_name"));

  var port_name = localStorage.getItem("portfolio_name");
  var default_port_name = localStorage.getItem("default_portfolio_name");

  if (port_name) {
    var port_name_data = port_name;
  } else {
    var port_name_data = default_port_name;
  }

  // console.log("data_port_name:",port_name_data);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(rows.length + 1);
  const MINUTE_MS = 10000;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [test, settestData] = React.useState({});
  const [indents, setindentsData] = React.useState([]);
  const [ticks, ticksData] = React.useState();
  React.useEffect(() => {
    // console.log("table_token:", "Authorization" + token);
    const headers = {
      Authorization: "Token " + token,
    };
    const datapost = {
      portfolio_name: port_name_data,
      action: "view",
    };
    const postResponse = api
      .post("dashboard/my_stocks/", datapost, { headers })

      .then(function (response) {
        if (response.status === 200) {
          // console.log("iam in my_stock api:");

          ticksData(response.data);
        }
      })
      .catch(function (error) {
        console.log("error:", error);
        // console.log("errosr:", error.response.data);
        // error.response.status === 400
        //   ? alert("Something went wrong from server side")
        //   : error.response.status === 500
        //   ? console.log("bad request")
        //   : console.log("error");
      });
  }, []);
  // console.log("final:", indents);
  React.useEffect(() => {
    const interval = setInterval(() => {
      // console.log("success_after:", ticks);
      // console.log("final:", indents);

      if (!Firebase.apps.length) {
        Firebase.initializeApp(config);
      }
      indents.splice();
      let ref = Firebase.database().ref().child("Stock");

      // start
      // let refe = Firebase.database().ref();
      // refe
      //     // .ref("Stock")
      //     .once("value")
      //     .then(function (snapshot) {
      //       console.log("dat_ddget:", snapshot.val());

      //     });
      // end
      // start
      // let refe = Firebase.database().ref().child("Stock");
      // refe
      //   // .ref("Stock")
      //   .child("897537")
      //   .on("value", (snapshot) => {
      //     console.log("dat_ddget:", snapshot.val());
      //   });
      // end
      setindentsData([]);

      // {indents.length === 0 ? (console.log("error in api dashboard/my_stocks")
      // ) : (
      //   <>
      // console.log("ticks:", ticks);
      // console.log("iam in testing mode:")
      {
        {
          ticks === undefined
            ? window.location.reload()
            : ticks.map((r) => {
                // {r.length<0?(console.log("error in api dashboard/my_stocks")):(
                ref.child(r.instrument_token).on("value", (snapshot) => {
                  const state = snapshot.val();

                  const ch = {
                    tradingsymbol: r.tradingsymbol,
                    name: r.name,
                    quantity: r.quantity,
                    buy_price: r.buy_price,
                  };
                  const act_data = Object.assign({}, state, ch);

                  // console.log("asda:", act_data['instrument_token']);
                  if (state === null) {
                    return null;
                  } else {
                    // console.log("data:", state);
                    test[act_data["instrument_token"]] = act_data;
                    // setindentsData((indents) => [...indents, act_data]);
                  }
                });
                // )}
              });
        }
      }

      // </>
      // )}
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [ticks]);

  // if (Object.keys(test).length === 0) {
  //   console.log("no data:", Object.keys(test).length);
  // } else {
  //   console.log("have data:", Object.keys(test).length);

  // return (
  //   <div
  //     className="loader"
  //     style={{
  //       backgroundColor: "transparent",
  //       alignItems: "center",
  //       display: "flex",
  //       justifyContent: "center",
  //       height: "100vh",
  //       width: "100vw",
  //     }}
  //   >
  //     <CircularProgress
  //       color="secondary"
  //       style={{ backgroundColor: "transparent" }}
  //     />

  //     <span
  //       style={{
  //         backgroundColor: "transparent",
  //         justifyContent: "center",
  //         position: "fixed",
  //         top: "55%",
  //       }}
  //     >
  //       Loading...please wait
  //     </span>
  //   </div>
  // )
  // }

  // console.log("test:",test);
  // console.log("gg:",Object.keys(test).length)
  // console.log("finalresult:", indents);

  // {Object.values(test).map((keyName, id) => {
  //   console.log("data:",keyName);
  // })}

  // console.log("finalresultcount:", indents.length);
  // {indents.length === 0 ? (console.log("erter")
  //   ) : (console.log("werwerw")
  //     )};
  function calWeight(val) {
    // var weight1 = 0;
    // indents.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price);
    // });
    // var y = (val / weight1) * 100;
    // return y.toFixed(2);
    var weight1 = 0;
    // indents.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price * stock.quantity);
    // });
    {
      Object.values(test).map((stock, id) => {
        weight1 = weight1 + parseFloat(stock["last_price"] * stock["quantity"]);
      });
    }
    var y = (val / weight1) * 100;
    return y.toFixed(2);
  }

  function calCtr(val, totalreturn, cost, quantity) {
    var weight1 = 0;
    // indents.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price * stock.quantity);
    // });
    {
      Object.values(test).map((stock, id) => {
        weight1 = weight1 + parseFloat(stock["last_price"] * stock["quantity"]);
      });
    }
    var weight = (val / weight1) * 100;
    var ctr = weight * (totalreturn / (cost * quantity));
    return ctr.toFixed(2);
    // var weight1 = 0;
    // indents.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price);
    // });
    // var y = ((val / weight1) * 100).toFixed(2);
    // var ctr = (y * (totalreturn / (val * 10).toFixed(2))).toFixed(2);

    // return ctr;
  }
  // (row.last_price)*(row.quantity)
  // (row.last_price - row.close) * row.quantity)

  function totalcalCtr(val) {
    var weight1 = 0;
    // val.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price * stock.quantity);
    // });
    {
      Object.values(val).map((stock, id) => {
        weight1 = weight1 + parseFloat(stock["last_price"] * stock["quantity"]);
      });
    }
    var tot = 0;
    // val.map((row) => {
    //   tot =
    //     tot +
    //     parseFloat(
    //       ((row.last_price * row.quantity) / weight1) *
    //         100 *
    //         (((row.last_price - row.close) * row.quantity) /
    //           (row.close * row.quantity))
    //     );
    // });
    {
      Object.values(val).map((row, id) => {
        tot =
          tot +
          parseFloat(
            ((row["last_price"] * row["quantity"]) / weight1) *
              100 *
              (((row["last_price"] - row["close"]) * row["quantity"]) /
                (row["close"] * row["quantity"]))
          );
      });
    }
    return tot.toFixed(2);

    //new
    // var weight1 = 0;
    // indents.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price * stock.quantity);
    // });
    // var tot = 0;
    // indents.map((row) => {
    //   tot =
    //     tot +
    //     parseFloat(
    //       ((row.last_price * row.quantity) / weight1) *
    //         100 *
    //         (((row.last_price - row.close) * row.quantity) /
    //           (row.close * row.quantity))
    //     );
    // });
    // return tot.toFixed(2);

    //old
    // var weight1 = 0;
    // indents.map((stock) => {
    //   weight1 = weight1 + parseFloat(stock.last_price);
    // });
    // var tot = 0;
    // indents.map((row) => {
    //   tot =
    //     tot +
    //     parseFloat(
    //       (
    //         ((row.last_price / weight1) * 100).toFixed(2) *
    //         (((row.last_price - row.close) * row.quantity).toFixed(2) /
    //           (row.last_price * 10).toFixed(2))
    //       ).toFixed(2)
    //     );
    // });
    // console.log("eeee:", tot);
    // return tot.toFixed(2);
  }

  function secNameCount() {
    var res = 0;
    indents.map((stock, id) => {
      res = id;
    });
    return res + 1;
  }

  function totalQuanCount(data) {
    var totq = 0;
    // data.map((row) => {
    //   totq = totq + parseFloat(row.quantity);
    // });
    {
      Object.values(data).map((row, id) => {
        totq = totq + parseFloat(row["quantity"]);
      });
    }
    return totq;

    // var totq = 0;
    // indents.map((row) => {
    //   totq = totq + parseFloat(row.quantity);
    // });
    // return totq;
  }

  function totalValCount(val) {
    var totv = 0;
    // val.map((row) => {
    //   totv = totv + parseFloat(row.last_price * row.quantity);
    // });
    {
      Object.values(val).map((row, id) => {
        totv = totv + parseFloat(row["last_price"] * row["quantity"]);
      });
    }
    return numberWithCommas(totv.toFixed(2));

    // var totv = 0;
    // indents.map((row) => {
    //   totv = totv + parseFloat(row.last_price * row.quantity);
    // });
    // return numberWithCommas(totv.toFixed(2));
  }
  function totalReturnCount(val) {
    var totr = 0;
    // val.map((row) => {
    //   totr = totr + parseFloat((row.last_price - row.close) * row.quantity);
    // });
    {
      Object.values(val).map((row, id) => {
        totr =
          totr +
          parseFloat((row["last_price"] - row["close"]) * row["quantity"]);
      });
    }
    return numberWithCommas(totr.toFixed(2));

    // var totr = 0;
    // indents.map((row) => {
    //   totr = totr + parseFloat((row.last_price - row.close) * row.quantity);
    // });
    // return numberWithCommas(totr.toFixed(2));
  }

  //   indents.map((stock) => {
  //   console.log("hekk:",stock.length)
  // });
  // const key = "instrument_token";

  // const arrayUniqueByKey = [
  //   ...new Map(indents.map((item) => [item[key], item])).values(),
  // ];

  // console.log("count:",arrayUniqueByKey.length);

  return (
    <>
      <Layout flag="dashboard" />
      <Container className={classes.containerWidth}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar />
            <TableContainer className={classes.containerr}>
              <Table stickyHeader className={classes.table}>
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  <TableRow
                    hover
                    role="checkbox"
                    className={classes.firstRow}
                    tabIndex={-1}
                  >
                    <TableCell
                      align="left"
                      className={`${classes.tableCellSticky} ${styles.paddingLeft}`}
                    >
                      {port_name_data}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {/* {secNameCount()} */}
                      {Object.keys(test).length}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      -----
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      -----
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      100 %
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {totalQuanCount(test)}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹{totalValCount(test)}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      -----
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹{totalReturnCount(test)}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {totalcalCtr(test)} %
                    </TableCell>
                  </TableRow>

                  {/* {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => { */}
                  {Object.keys(test).length < 1 ? (
                    // console.log("error in table ")

                    <>
                      <div
                        className="loader"
                        style={{
                          backgroundColor: "transparent",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          height: "100vh",
                          width: "100vw",
                        }}
                      >
                        {/* <CircularProgress
                          color="secondary"
                          style={{ backgroundColor: "transparent" }}
                        /> */}

                        <span
                          style={{
                            backgroundColor: "transparent",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "fixed",
                            top: "55%",
                            color: "#21CE99",
                          }}
                        >
                          <CircularProgress
                            color="#21CE99"
                            style={{ backgroundColor: "transparent" }}
                          />
                          <br></br>
                          Loading..
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {Object.values(test).map((row, id) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={id}
                          >
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                            >
                              {/* {row.tradingsymbol} */}
                              {row["change"] < 0 ? (
                                <Custombutton
                                  bankName={row["tradingsymbol"]}
                                  dChange={false}
                                />
                              ) : (
                                <Custombutton
                                  bankName={row["tradingsymbol"]}
                                  dChange={true}
                                />
                              )}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                            >
                              {/* security name */}
                              {row["name"]}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={
                                row.change < 0
                                  ? classes.tableCellRed
                                  : classes.tableCell
                              }
                            >
                              {/* %1d change */}
                              {row["change"].toFixed(2)}%
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* last price */}₹
                              {numberWithCommas(row["last_price"].toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* weight */}
                              <Progressbar
                                position={calWeight(
                                  row["last_price"] * row["quantity"]
                                )}
                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* quantity */}
                              {numberWithCommas(row["quantity"])}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* value */}₹
                              {numberWithCommas(
                                (row["last_price"] * row["quantity"]).toFixed(2)
                              )}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* cost */}₹
                              {numberWithCommas(row["close"].toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* total return */}₹
                              {(
                                (row["last_price"] - row["close"]) *
                                row["quantity"]
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={
                                calCtr(
                                  row["last_price"] * row["quantity"],
                                  (row["last_price"] - row["close"]) *
                                    row["quantity"],
                                  row["close"],
                                  row["quantity"]
                                ) < 0
                                  ? classes.tableCellRed
                                  : classes.tableCellGreen
                              }
                            >
                              {/* CTR */}
                              {calCtr(
                                row["last_price"] * row["quantity"],
                                (row["last_price"] - row["close"]) *
                                  row["quantity"],
                                row["close"],
                                row["quantity"]
                              )}{" "}
                              %
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </Container>
    </>
  );
}
