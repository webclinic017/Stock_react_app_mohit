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
import styles from "../Table/Table.module.css";
import Layout from "../Layout/Layout";
import { Table as Tables } from "antd";




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
  
];

function EnhancedTableHead(props) {
  const { classes } = props;
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
            
          >
            <TableSortLabel>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
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
        TABLE
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

const useStyles1 = makeStyles((theme) => ({
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
    position: "sticky",
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

export default function EnhancedTable(props) {
 
  
  
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(rows.length + 1);

  
  return (
    <>
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
                      {secondHeader[0].ticker}%
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {secondHeader[0].securityname}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {secondHeader[0].change}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {secondHeader[0].lastprice}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {secondHeader[0].weight}%
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {secondHeader[0].quantity}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹{secondHeader[0].value}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹{secondHeader[0].cost}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      ₹{secondHeader[0].totalreturn}
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellSticky}>
                      {secondHeader[0].ctr}%
                    </TableCell>
                  </TableRow>

                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
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
                                : isNaN(row.ticker)
                                ? classes.tableCell
                                : ""
                            }
                          >
                            {row.change}.00%
                          </TableCell>
                          <TableCell align="left" className={classes.tableCell}>
                            ₹{row.lastprice}
                          </TableCell>
                          <TableCell align="left" className={classes.tableCell}>
                            {row.weight}
                          </TableCell>
                          <TableCell align="left" className={classes.tableCell}>
                            {numberWithCommas(row.quantity)}
                          </TableCell>
                          <TableCell align="left" className={classes.tableCell}>
                            ₹{numberWithCommas(row.value)}
                          </TableCell>
                          <TableCell align="left" className={classes.tableCell}>
                            ₹{numberWithCommas(row.cost)}
                          </TableCell>
                          <TableCell align="left" className={classes.tableCell}>
                            ₹{row.totalreturn}
                          </TableCell>
                          <TableCell
                            align="left"
                            className={
                              row.ctr < 0 && isNaN(row.ticker)
                                ? classes.tableCellRed
                                : !isNaN(row.ticker)
                                ? ""
                                : classes.tableCellGreen
                            }
                          >
                            {row.ctr}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </Container>
    </>
  );
}
