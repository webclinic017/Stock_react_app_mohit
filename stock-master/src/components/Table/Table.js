import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MuiTableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import Chartt from "../Chart/Chart";
import Custombutton from "../Button/Custombutton";
import Progressbar from "../Progressbar/Progressbar";

function createData(
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
const rows = [
  createData(50, 2005, 20, 5087, "80%", 734760, 36777, 55563, 5788, 80),
  createData(
    <Custombutton bankName="BANKBARODA" dChange={false} />,
    "BANK OF BARODA",
    -1.0,
    22,
    <Progressbar position="20" />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    <Custombutton bankName="BAJAJHIND" dChange={true} />,
    "BAJAJ AUTO",
    1.0,
    22,
    <Progressbar position="85" />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    <Custombutton bankName="NAUKRI" dChange={false} />,
    "NAUKRI",
    -1.0,
    22,
    <Progressbar position="50" />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    <Custombutton bankName="NAUKRI" dChange={false} />,
    "NAUKRI",
    -1.0,
    22,
    <Progressbar position="50" />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    <Custombutton bankName="HDFCBANK" dChange={true} />,
    "HDFC",
    1.0,
    22,
    <Progressbar position="50" />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    <Custombutton bankName="HDFCBANK" dChange={true} />,
    "HDFC",
    1.0,
    22,
    <Progressbar position="50" />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    <Custombutton bankName="AXISBANK" dChange={true} />,
    "AXIS BANK",
    1.0,
    22,
    <Progressbar position="50" />,
    734760,
    36777,
    36781,
    20,
    20
  ),
  createData(
    <Custombutton bankName="HDFCBANK" dChange={false} />,
    "HDFC",
    -1.0,
    22,
    <Progressbar position="50" />,
    734760,
    36777,
    36781,
    20,
    -20
  ),
  createData(
    <Custombutton bankName="ABBOTBANK" dChange={true} />,
    "ABBOT",
    1.0,
    22,
    <Progressbar position="50" />,
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
  const stabilizedThis = array.map((el, index) => [el, index]);
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
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
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

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <img
            src="https://res.cloudinary.com/de1v32nv0/image/upload/v1620350560/icons/filter-1634626_johksw.png"
            alt="filtericon"
            className={classes.filterIcon}
          />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#141629",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  paginationColor: {
    backgroundColor: "#141629",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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
    pointerEvents: "none",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Container className={classes.containerWidth}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        className={isNaN(row.ticker) ? "" : classes.firstRow}
                      >
                        <TableCell className={classes.tableCell} align="left">
                          {row.ticker}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {row.securityname}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={
                            row.change < 1
                              ? classes.tableCellRed
                              : classes.tableCell
                          }
                        >
                          {row.change}.00%
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          $ {row.lastprice}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          {row.weight}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          {numberWithCommas(row.quantity)}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          $ {numberWithCommas(row.value)}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          $ {numberWithCommas(row.cost)}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          $ {row.totalreturn}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={
                            row.ctr < 0 && isNaN(row.ticker)
                              ? classes.tableCellRed
                              : !isNaN(row.ticker)
                              ? classes.tableCell
                              : classes.tableCellGreen
                          }
                        >
                          {row.ctr}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className={classes.paginationColor}
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Container>
  );
}
