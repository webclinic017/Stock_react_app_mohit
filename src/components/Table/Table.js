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
import MuiTableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import Custombutton from "../Button/Custombutton";
import Progressbar from "../Progressbar/Progressbar";
import styles from "./Table.module.css";
import Layout from "../Layout/Layout";
import api from "../../constant";
import CircularProgress from "@material-ui/core/CircularProgress";

var token = localStorage.getItem("token");
console.log("token:", token);

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
  const [total, totalData] = React.useState("");
  const [tabledt, tableData] = React.useState("");
  const [portname, portnameData] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      var port_name = localStorage.getItem("portfolio_name");
      var default_port_name = localStorage.getItem("default_portfolio_name");
      // console.log("dport_name:",port_name);
      // console.log("data_port_name_default:",default_port_name);
      if (port_name) {
        var port_name_data = port_name;
      } else {
        var port_name_data = default_port_name;
      }
      portnameData(port_name_data);
      // console.log("data_port_name:",port_name_data);

      const headers = {
        Authorization: "Token " + token,
      };
      const datapost = {
        portfolio_name: port_name_data,
      };
      const postResponse = api
        .post("dashboard_api_streaming/", datapost, { headers })

        .then(function (response) {
          if (response.status === 200) {
            var dfe = response.data;
            // var grt= Object.keys(dfe['total'])
            // console.log('featch:',dfe['total'])
            // console.log('featchfdf:',dfe['data'])
            totalData(dfe["total"]);
            tableData(dfe["data"]);
            console.log("fetch");
            // window.location.reload();
          }
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    }, MINUTE_MS);
    return () => clearInterval(interval);
  });

  // console.log('get_total:',total)
  // console.log('get_data:',tabledt)

  // if (tabledt=="")
  //   console.log('nooo');
  // else {

  //   {Object.values(tabledt).map((keyName, id) => {
  //     console.log("data:",keyName);
  //   })}
  // }

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
                      {portname === "" ? console.log("wait") : portname}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {tabledt === ""
                        ? console.log("wait")
                        : Object.keys(tabledt).length}
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
                      {tabledt === ""
                        ? console.log("wait")
                        : total["total_qty"]}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹
                      {tabledt === ""
                        ? console.log("wait")
                        : total["total_val"]}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      -----
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹
                      {tabledt === ""
                        ? console.log("wait")
                        : total["total_return"]}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {tabledt === ""
                        ? console.log("wait")
                        : total["total_ctr"]}{" "}
                      %
                    </TableCell>
                  </TableRow>

                  {Object.keys(tabledt).length < 1 ? (
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
                      {Object.values(tabledt).map((row, id) => {
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
                              {row["change"].toFixed(2)}%
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              ₹{numberWithCommas(row["last_price"].toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              <Progressbar position={row["weight"]} />
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {numberWithCommas(row["quantity"])}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              ₹{numberWithCommas(row["value"])}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {/* cost */}₹
                              {numberWithCommas(row["cost"].toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              ₹{row["return"]}
                            </TableCell>
                            <TableCell
                              align="left"
                              className={
                                row["ctr"] < 0
                                  ? classes.tableCellRed
                                  : classes.tableCellGreen
                              }
                            >
                              {row["ctr"]} %
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
