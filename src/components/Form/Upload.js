import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
// import classes2 from "./Login.module.css";
import { Upload } from "antd";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { ExcelRenderer } from "react-excel-renderer";
// import { getDroppedOrSelectedFiles } from "html5-file-selector";
// import Dropzone from "react-dropzone";
// import DropZone from "./dropzone/DropZone";
// import { Link as Links } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import TablePage from "./FormTab";
// import cssstyle from "./Form.module.css";
// import TransitionsModal from "./Modal";
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import { Table, Button, Row, Col, Upload } from "antd";
import { Button as Buttons } from "@material-ui/core";
import classes2 from "./Form.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import api from "../../constant";
// import Custombutton from "../Button/Custombutton";
import Custombutton from "./Tablecustombutton";
import { Alert } from "@material-ui/lab";
import {
  createMuiTheme,
  // MuiThemeProvider,
  ThemeProvider,
} from "@material-ui/core";
import axios from 'axios';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Clock from "react-digital-clock";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { lighten } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import classes3 from "../../App.css";
import sample from "../Form/SampleUpload.xlsx";


const base_url = localStorage.getItem("base_url");


const useStyles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#141629",
    paddingLeft: "65px",
    paddingRight: "65px",
    paddingTop: "0px",
    paddingBottom: "20px",
  },

  containerWidth: {
    maxWidth: "1850px",
    marginTop: "10px",
  },

  title: {
    flex: "1 1 100%",
    fontSize: "20px",
  },

  endIcon: {
    marginTop: "30px",
    marginLeft: "560px",
    marginRight: "",
  },

  textfield: {
    "& > *": {
      //   margin: theme.spacing(1),
      width: "30%",
      //   color:"green",
      marginTop: "40px",
      // borderColor: 'red'
    },
  },

  lineStyle: {
    "&:hover": {
      borderBottom: "#44947",
    },
  },

  drop: {
    color: "#bdbbbb",
    backgroundColor: "#141629",
    marginTop: "76px",
  },
  btn: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: "18",
    borderColor: "#225b54",
    backgroundColor: "#302c3c",
    "&:hover": {
      borderColor: "#225b54",
      backgroundColor: "#302c3c",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      borderColor: "#225b54",
      backgroundColor: "#302c3c",
    },
  },

  containerr: {
    maxHeight: 590,
    height: 530,
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
  // containerWidth: {
  //   maxWidth: "1450px",
  // },
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

  // paginationColor: {
  //   backgroundColor: "#141629",
  // },
  // lineStyle: {
  //   "&:hover": {
  //     borderBottom: "#44947",
  //   },
  // },
});

class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      files: [],
      data: "NO",
      error: [],
      fileList: [],
      FileList: "",
      data2: "",
      open: false,
      err: "",
      newe: "",
      name: "",
      btn: "no",
      arraydata: [],
      errorMessage: null,
      columns: [
        {
          title: "TICKER",
          dataIndex: "name",
          editable: false,
        },
        {
          title: "SHORTNAME",
          dataIndex: "age",
          editable: false,
        },
        {
          title: "STOCKPRICE",
          dataIndex: "gender",
          editable: false,
        },
        {
          title: "QUANTITY",
          dataIndex: "age2",
          editable: false,
        },
        {
          title: "ASSET TYPE",
          dataIndex: "assettype",
          editable: false,
        },
      ],
    };






  }

  handleCallback = (childData) => {

    this.setState({ data: childData });

  };


  handleCallback2 = (childData) => {

    this.setState({ data2: "DELETE" });


    if (this.state.data === "DELETE") {
      // console.log("dgdfgt");
      this.setState({ open: true });
    }

  };

  handleUploaderChange = (info) => {
    let fileList = [...info.fileList];
    // fileList = fileList.slice(-2);
    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
        // console.log(222, fileList)
      }
      return file;
    });


    // this.setState({ FileList:info.fileList });
    // console.log(999,FileList);
    this.setState({ fileList });
    // console.log(999, fileList);
  };


  fileHandler = (FileList) => {
    this.setState({ btn: "yes" });
    var self = this;

    // this.setState({files : FileList});
    // console.log("asdada:", this.state.btn);
    // console.log("fileListHere", FileList);

    var FormDatas = new FormData();
    FormDatas.append('file', FileList);
    FormDatas.append('portfolio_name', this.state.name);

    // console.log(this.state.name);
    axios({
      method: "post",
      url: base_url + "dashboard/upload_err/",
      // url: "https://sabertoothdashboard.herokuapp.com/dashboard/upload_err/",
      // url:"http://127.0.0.1:8000/dashboard/upload_err/",
      data: FormDatas,
      headers: { "Content-Type": "multipart/form-data", "Authorization": `token ${localStorage.getItem("token")}` }
    })
      .then(function (response) {
        console.log("testing________:", response.data);
        localStorage.setItem("table_error", response.data);
        // console.log("ASDASD:", response.data);
        self.setState({ resp: response.data });
      }).catch(function (error) {
        console.log("error:", error);

        // console.log("errosr:", error.response.data);
        // error.response.status === 400
        //   ? console.log("400")
        //   : error.response.status === 500
        //     ? console.log("bad request")
        //     : console.log("error");
      });







    // console.log(this.state.FileList);
    // var bodyFormData = new FormData();

    // bodyFormData.append('file', FileList); 

    // axios({
    //   method: "post",
    //   url: "http://sabertoothdashboard.herokuapp.com/dashboard/upload/",
    //   data: bodyFormData,
    //   headers: { "Content-Type": "multipart/form-data",   "Authorization": 'Token ad34cc86b5dcf2beaaeb637eb5635b33f5768929'}
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //   }).catch(function (error) {
    //     console.log("error:", error);
    //     console.log("errosr:", error.response.data);
    //     error.response.status === 400
    //       ? alert("Please Enter Correct Login Credentials")
    //       : error.response.status === 500
    //       ? console.log("bad request")
    //       : console.log("error");
    //   });




    let fileObj = FileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!",
      });
      return false;
    }
    // console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!",
      });
      return false;
    }

    ExcelRenderer(fileObj, (err, resp) => {
      // let respp = localStorage.getItem("table_error");
      // console.log("something went wrongASADASD:",respp);

      // let array = [];
      // let reach = 0;
      // console.log("error_test:", resp);


      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        let newerror = [];
        resp.rows.slice(1).map((row, index) => {
          // console.log('asdsadasdasdasd:',row);
          if (row && row !== "undefined") {
            if (row[0] && row[2]) {

              // let fg = ((row[0]).toString()).split(/\s/).join('')
              // if (dt.includes(fg)) {
              //   console.log("error in excel data");
              // }
              // else {
              newRows.push({
                key: index,
                name: row[0],
                age: row[0],
                gender: row[2],
                age2: row[1],
                assettype: "asset",
              });
              // }
              //   }
              // })
              // console.log("now_test:",row[0]);

            } else {
              if (!row[0] && !row[2]) {
                // console.log("heree");
                newerror.push(
                  "Incomplete Data at ticker and price" + index + "row"
                );
              } else if (row[0] && !row[2]) {
                newerror.push("Incomplete Data at price  of" + index + "row");
              } else if (!row[0] && row[2]) {
                newerror.push("Incomplete Data at ticker  of" + index + "row");
              }
            }
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!",
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            error: newerror,
            errorMessage: null,
          });
        }
      }
    });
    return false;
  };

  storename(e) {
    this.setState({ name: e.target.value });
    // console.log("here" + this.state.name);
  }
  render() {
    const columns = this.state.columns.map((col) => {
      return col;
    });

    const color = "#008000";
    const theme = createMuiTheme({
      palette: {
        common: { black: color, white: color },
        primary: {
          main: "#bdbbbb",
          contrastText: "#ffffff",
        },
        text: { primary: color, secondary: color },
      },
      overrides: {
        MuiInputBase: {
          root: {
            color: "#449474",
          },
        },
        MuiInput: {
          underline: {
            "&:before": {
              borderBottom: `1px solid #449474`,
            },
            "&:hover": {
              borderBottom: `2px solid #449474`,
            },
          },
          placeholder: {
            opacity: "1px",
          },
        },
        MuiDropzoneArea: {
          root: {
            minHeight: "184px",
          },
        },
      },
    });

    const headCells = [
      { id: "ticker", numeric: true, disablePadding: false, label: "TICKER" },
      {
        id: "shortname",
        numeric: true,
        disablePadding: false,
        label: "SECURITY NAME",
      },
      {
        id: "quantity",
        numeric: true,
        disablePadding: false,
        label: "QUANTITY",
      },
      {
        id: "price",
        numeric: true,
        disablePadding: false,
        label: "COST",
      },
      {
        id: "assettype",
        numeric: true,
        disablePadding: false,
        label: "ASSET TYPE",
      },
    ];

    function EnhancedTableHead() {
      // const { classes } = props;
      const classes = useStyles();

      return (
        <TableHead>
          <TableRow hover className={classes.firstRow}>
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
                <TableSortLabel>{headCell.label}</TableSortLabel>
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
        paddingLeft: theme.spacing(0),
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
            UPLOADED SECURITIES
          </Typography>

          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              {/* <img
                src="https://res.cloudinary.com/de1v32nv0/image/upload/v1620350560/icons/filter-1634626_johksw.png"
                alt="filtericon"
                className={classes.filterIcon}
              /> */}
            </IconButton>
          </Tooltip>
        </Toolbar>
      );
    };

    function returnerror(error, data, name, resp) {
      var x = "";
      var array = [];
      var reach = 0;
      // console.log("error_test:", resp);
      if (resp === undefined) {
        console.log("something went wrong");
      }
      else if (resp === null) {
        console.log("something went wrong");
      }
      else {
        for (var i = 0; i < resp.length; i++) {

          if (reach === 1) {
            if (resp[i] === '[') {
              if (x !== "") {
                x = x.replace(/'/g, '');
                array.push(x);
              }
              x = "";
            }
            else if (resp[i] === ',') {
              if (x !== "") {
                x = x.replace(/'/g, '');
                array.push(x);
              }
              x = "";
            }
            else if (resp[i] === ']') {
              if (x !== "") {
                x = x.replace(/'/g, '');
                array.push(x);
              }
              x = "";
            }
            else {
              if (resp[i] !== ':') {
                x = x + resp[i];
              }
            }
          }

          if (resp[i] === '|') {
            reach = 1;
          }

        }
      }
      // console.log("error here:" + error);
      if (data === "YES") {
        return (
          <>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginLeft: "0px",

                  // margin: "auto",
                  // width: "50%",
                  // padding: "10px",
                }}
              >
                <form>
                  <label for="lfname" style={{ fontSize: "15px" }}>
                    Portfolio Name:
                  </label>
                  <input
                    id="lfname"
                    name="fname"
                    type="text"
                    value={name}
                    style={{
                      backgroundColor: "#141629",
                      margin: "8px",
                      height: "35px",
                      border: "1px solid #6E6E95",
                      width: 300,
                      color: "#ffffff",
                      fontSize: "15px",
                    }}
                  />
                </form>
              </div>

              <div
                style={{
                  width: 750,
                  height: 95,
                  whiteSpace: "nowrap",
                  marginLeft: "5%",
                }}
              >
                <Box
                  component="div"
                  // my={2}
                  overflow="auto"
                  bgcolor="background.paper"
                >
                  <Alert
                    severity="error"
                    style={{
                      maxHeight: 95,
                      overflow: "auto",
                      backgroundColor: "#070A1B",
                    }}
                  >
                    Error !
                    {array.map((er) => (
                      <li style={{ color: "#ffffff" }}>{er}</li>
                    ))}
                    {/* {resp} */}
                  </Alert>
                </Box>
              </div>
            </div>
          </>
        );
      } else {
        return <></>;
      }
    }

    const check = (data, fileList, name) => {
      let respp = localStorage.getItem("table_error");
      console.log("table error while replacing:", respp);
      let x = "";
      let array = [];
      let reach = 0;
      if (respp === undefined) {
        console.log("something went wrong");
      }
      else if (respp === null) {
        console.log("something went wrong");
      }
      else {
        for (var i = 0; i < respp.length; i++) {

          if (reach === 1) {
            if (respp[i] === '[') {
              if (x !== "") {
                x = x.replace(/'/g, '');
                array.push(x);
                // this.setState({ arraydata: [...this.state.arraydata, x] })
              }
              x = "";
            }
            else if (respp[i] === ',') {
              if (x !== "") {
                x = x.replace(/'/g, '');
                array.push(x);
                // this.setState({ arraydata: [...this.state.arraydata, x] })
              }
              x = "";
            }
            else if (respp[i] === ']') {
              if (x !== "") {
                x = x.replace(/'/g, '');
                array.push(x);
                // this.setState({ arraydata: [...this.state.arraydata, x] })
              }
              x = "";
            }
            // else if (respp[i] === '(Invalid Tranding Symbol)') {
            //   if (x !== "") {
            //     x = x.replace(/'/g, '');
            //     array.push(x);
            //   }
            //   x = "";
            // }
            // else if (respp[i] === '(Invalid Quantity)') {
            //   if (x !== "") {
            //     x = x.replace(/'/g, '');
            //     array.push(x);
            //   }
            //   x = "";
            // }

            else {
              if (respp[i] !== ':') {
                x = x + respp[i];
              }
            }
          }

          if (respp[i] === '|') {
            reach = 1;
          }

        }
      }
      // console.log("testinggggggggggg:", this.state.rows);
      let dt = []
      array.map((r) => {
        let dtt = (r.replace('(Invalid Tranding Symbol)', '').replace('(Invalid Quantity)', '').replace(' ', '')).toString()
        dt.push(dtt.split(/\s/).join(''))
      })
      // console.log("error in excel dataasdasd:", dt);

      {
        this.state.rows.map((row, index) => {
          if (dt.includes(((row.name).toString()).split(/\s/).join(''))) {
            console.log("error in excel data", row.name, index);
            this.state.rows.splice(index)
            console.log("check correct data");
            return null
          } else {
            console.log("correct data", row.name);
          }
        })
      }

      console.log("TESTING");
      // console.log("ppppppppppppppp:", this.state.rows);

      // {this.state.rows.map((row, index) => {
      //   console.log("asdsdsdhhhhhhhhh:",row.name)
      // })}
      // {dt.includes(((row.name).toString()).split(/\s/).join(''))?console.log("error in excel data"):

      // let fg = ((row[0]).toString()).split(/\s/).join('')

      if (data === "YES") {

        return (
          <div>
            <Container
              // className={classes.containerWidth}
              id="centerstyle"
              style={{ maxWidth: "1850px", marginTop: "5px" }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#141629",
                  paddingLeft: "75px",
                  paddingRight: "75px",
                  paddingTop: "25px",
                  paddingBottom: "70px",
                }}
              //  className={classes.root}
              >
                <div>
                  {returnerror(
                    this.state.error,
                    this.state.data,
                    this.state.name,
                    this.state.resp
                  )}
                </div>
                <Paper
                  className={classes.paper}
                // style={{ width: "100%" }}
                >
                  <EnhancedTableToolbar />
                  <TableContainer
                    className={classes.containerr}
                    style={{ height: 350, backgroundColor: "#141629" }}
                  >
                    <Table
                      stickyHeader
                      className={classes.table}
                      style={{
                        minWidth: 750,
                        backgroundColor: "#141629",
                        color: "red",
                      }}
                    >
                      <EnhancedTableHead
                        classes={this.useStyles}
                        rowCount={this.state.rows.length}
                      />
                      <TableBody>

                        {this.state.rows.map((row, index) => {


                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.key}
                            >
                              <TableCell
                                className={classes.tableCell}
                                align="cen"
                                style={{ borderBottom: "none" }}
                              >
                                {/* {row.name} */}
                                <Custombutton
                                  bankName={row.name}
                                  dChange={false}
                                />
                              </TableCell>

                              <TableCell
                                className={classes.tableCell}
                                align="left"
                                style={{ borderBottom: "none" }}
                              >
                                {row.age}
                              </TableCell>

                              <TableCell
                                align="left"
                                className={classes.tableCell}
                                style={{ borderBottom: "none" }}
                              >
                                {row.gender}
                              </TableCell>

                              <TableCell
                                align="left"
                                className={classes.tableCell}
                                style={{ borderBottom: "none" }}
                              >
                                {row.age2}
                              </TableCell>

                              <TableCell
                                align="left"
                                className={classes.tableCell}
                                style={{ borderBottom: "none" }}
                              >
                                {row.assettype}
                              </TableCell>
                            </TableRow>
                          );
                          {/* </> */ }
                          // )}
                        })}

                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <TableSubmitModal file={fileList} portfolio_name={name} />
              </div>
            </Container>
          </div>
        )
        // })}
      } else {
        return <div></div>;
      }
    };




    const checkfordissaperingform = (data) => {
      if (data === "NO") {
        return (
          <div>
            <Container
              // className={classes.containerWidth}
              style={{ maxWidth: "1850px", marginTop: "30px" }}
              id="centerstyle"
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#141629",
                  paddingLeft: "95px",
                  paddingRight: "95px",
                  paddingTop: "65px",
                  paddingBottom: "25px",
                }}
              // className={classes.root}
              >
                <Typography
                  className={classes.title}
                  variant="h5"
                  id="tableTitle"
                  component="div"
                >
                  FILL BELOW FORM
                </Typography>

                <ThemeProvider theme={theme}>
                  <form className={classes.textfield} noValidate>
                    <TextField
                      label="Enter Portfolio name"
                      autoComplete="off"
                      variant="standard"
                      id="standard-search"
                      value={this.state.name}
                      onChange={this.storename.bind(this)}
                      inputProps={{
                        style: {
                          fontSize: "15px",
                          color: "#ffffff",
                          // marginBottom: "10px",
                        },
                        maxLength: 50,
                      }}
                      InputLabelProps={{ className: classes2.text_field }}
                      className={classes.lineStyle}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp; </span>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ "min-height": "45px", width: "15%" }}
                    >
                      <Clock hour12={false} /> IST
                    </Button>
                  </form>
                </ThemeProvider>

                <div>
                  <div style={{ marginTop: "25px" }}>
                    <DropzoneAreaBase
                      dropzoneClass={classes.drop}
                      Icon="disable"
                      acceptedFiles={[
                        "application/vnd.ms-excel",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      ]}
                      filesLimit={1}
                      dropzoneProps={{ disabled: true }}
                      // showAlerts={false}
                      // onAdd={()=>customMe()}
                      // onChange={(files) => console.log('Files:', files)}
                      dropzoneText={
                        <>
                          <Upload
                            id='file'
                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            name="file"
                            beforeUpload={this.fileHandler}
                            // onRemove={() => this.setState({ rows: [] })}
                            onChange={this.handleUploaderChange}
                            onRemove={() =>
                              this.setState({ btn: "no", rows: [], error: [] })
                            }
                            multiple={false}
                            // className={classes2.upload}
                            className={classes3}
                          // component={Links} to="/showtable"
                          >
                            {this.state.btn === "no" ? (
                              <Buttons
                                // disabled='true'
                                // onClick={handleBtn}
                                className={classes.btn}
                                variant="outlined"
                                style={{
                                  marginTop: "3%",
                                  background: "#302c3c",
                                }}
                              >
                                Attach or drop file here
                              </Buttons>
                            ) : (
                              <Buttons
                                disabled="true"
                                // onClick={handleBtn}
                                className={classes.btn}
                                variant="outlined"
                                style={{
                                  marginTop: "3%",
                                  background: "#302c3c",
                                }}
                              >
                                Attach or drop file here
                              </Buttons>
                            )}
                          </Upload>
                          <Typography
                            variant="body2"
                            style={{
                              marginTop: "2%",
                              color: "#86838B",
                              fontSize: "12px",
                            }}
                          >
                            Use the specified format to successfully submit the
                            file.
                            <br />
                            <i>
                              {" "}
                              <a
                                href={sample}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                style={{
                                  color: "#20A45C",
                                  textDecoration: "none",
                                }}
                              >
                                Click here
                              </a>{" "}
                            </i>{" "}
                            to download the sample file.
                          </Typography>
                        </>
                      }
                    ></DropzoneAreaBase>
                  </div>
                </div>
                <div>
                  <div>
                    <TransitionsModal
                      rows={this.state.rows}
                      cols={columns}
                      parentCallback={this.handleCallback}
                      parentCallback2={this.handleCallback2}
                      errors={this.state.error}
                      newer={this.state.newe}
                      portfolio={this.state.name}
                      err={this.state.err}
                      resp={this.state.resp}
                      file_check={this.state.fileList}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        );
      } else {

        const handleClose = () => {
          // console.log(this.state.data)
          this.setState({ open: false, data: "NO" });

        };
        return <div></div>;
      }
    };
    const handleClose = () => this.setState({ open: false });
    const handleShow = () => this.setState({ open: true });

    //   const returnmodal=(data2)=>
    //   {
    //     var array=[];
    //     axios({
    //       method: "get",
    //       url: "https://sabertoothdashboard.herokuapp.com/dashboard/me/portfolio",
    //       headers: { "Content-Type": "multipart/form-data",   "Authorization": 'token 98b64eeeae1fac8b5a8a1b6093860e5a5e00bff9'}
    //     })
    //       .then(function (response) {
    //       //   console.log(response.data[0].name);
    //       // array.push(response.data[0].name);
    //       // array.push(response.data[1].name);
    //       // array.push(response.data[2].name);
    //       }).catch(function (error) {
    //         console.log("error:", error);     
    //         console.log("errosr:", error.response.data);
    //         error.response.status === 400
    //           ? console.log("400")
    //           : error.response.status === 500
    //           ? console.log("bad request")
    //           : console.log("error");
    //       });
    //     if(data2=="DELETE")
    //     {
    // return  <div>
    // {
    // array.map((data)=>{ <li>{data}</li>})
    // }
    // </div>;
    //     }
    //     else
    //     {
    //       return <div></div>;
    //     }
    //   };



    const { classes } = this.props;

    return (
      <>
        {checkfordissaperingform(this.state.data)}

        {check(this.state.data, this.state.fileList, this.state.name)}

        {/* {returnmodal(this.state.data2)} */}

      </>
    );
  }
}

const useStyless = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function TransitionsModal(props) {
  const classes = useStyless();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [array, setArray] = React.useState([]);
  const [stock, setStock] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [delet, setDelet] = React.useState([]);

  axios({
    method: "get",
    url: base_url + 'dashboard/me/portfolio',
    // url: "https://sabertoothdashboard.herokuapp.com/dashboard/me/portfolio",
    // url:"http://127.0.0.1:8000/dashboard/me/portfolio",
    headers: { "Content-Type": "multipart/form-data", "Authorization": `token ${localStorage.getItem("token")}` }
  })
    .then(function (response) {
      var arr = [];
      // console.log("dasdasdasdsdasdasd:",response.data.length);
      // arr.push(response.data[0].name);
      // arr.push(response.data[1].name);
      // arr.push(response.data[2].name);

      for (var i = 0; i < response.data.length; i++) {
        arr.push(response.data[i].name)
      }

      setArray(arr);

    }).catch(function (error) {

      console.log(error);
    });




  const handleOpen3 = () => {
    setOpen3(true);
  };



  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };


  let resp_table_err = localStorage.getItem("table_error");
  const returnstatement = (name, file_check) => {

    if (!name) {
      return "Please enter portfolio name and then submit";
    }
    else if (!file_check.length) {
      return "Please attach excel file and then submit";
    }
    else if (resp_table_err == "Upload file is not in proper format please refer from sample file") {
      return "Upload file is not in proper format please refer from sample file";
    }
    else {
      var ans = "This table have ";
      ans = ans + props.rows.length;
      ans = ans + " rows and ";
      ans = ans + props.resp;
      ans = ans + " errors found based on matching tickers from database.";
      return ans;
    }
    // if (name) {
    //   var ans = "This table have ";
    //   ans = ans + props.rows.length;
    //   ans = ans + " rows and ";
    //   ans = ans + props.resp;
    //   ans = ans + " errors found based on matching tickers from database.";
    //   return ans;
    // } else {
    //   return "Please fill portfolio Name And Then Submit";
    // }
  };



  const handleEntailmentRequest = (e) => {
    window.location.reload(false);
    // console.log("aasdfad");
  };

  function deletestocks() {


    delet.map((item) => {

      var data = new FormData();
      data.append('portfolio_name', item);
      data.append('action', 'delete');

      var config = {
        method: 'post',
        url: base_url + 'dashboard/my_stocks/',
        // url: 'https://sabertoothdashboard.herokuapp.com/dashboard/my_stocks/',
        // url:'http://127.0.0.1:8000/dashboard/my_stocks/',
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `token ${localStorage.getItem("token")}`
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          localStorage.removeItem("default_portfolio_name");
          localStorage.removeItem("portfolio_name");

        })
        .catch(function (error) {
          console.log(error);
        });



    });
    setOpen4(true);

  }


  // const [isOpen, setIsOpen] = useState(false);
  // function toggleModal() {
  //   setIsOpen(!isOpen);
  // }

  return (
    <div style={{ padding: "0% 0% 0% 42%" }}>
      <button
        type="button"
        onClick={handleOpen}
        // onClick={() => { func1(); func2();}}
        style={{
          "min-height": "40px",
          width: "14vw",
          backgroundColor: "#20a45c",
          fontSize: "17px",
          fontWeight: "600",
          marginTop: "40px",
        }}
      >
        Submit
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade lg={3} sm={6} xs={12} in={open}>
          <div
            className={classes.paper}
            style={{
              // position: "fixed",
              // width: "30%",
              // height: "20%",
            }}
          >
            <p id="transition-modal-description" style={{ width: "300px" }}>
              {/* This table have {props.rows.length} rows and {props.errors.length}{" "}
              errors found based on matching tickers from database. */}
              {returnstatement(props.portfolio, props.file_check)}
            </p>
            <div style={{ marginTop: 8 }}>
              <div className="actions">
                <Buttons
                  type="button"
                  onClick={() => {
                    // props.parentCallback("YES");
                    // handleClose();
                    if (props.portfolio) {
                      // console.log(props.resp);
                      if (props.resp === "You already have 3 active portfolios. Inorder to create new please delete previous portfolio.") {

                        // props.parentCallback2("DELETE");
                        // handleClose();
                        setOpen2(true);
                        // handleClose();
                        // console.log("here",array);
                      }
                      else if (!props.file_check.length) {
                        handleClose();
                      }
                      else if (resp_table_err == "Upload file is not in proper format please refer from sample file") {
                        handleClose();
                      }
                      else {
                        props.parentCallback("YES");
                        handleClose();
                      }
                    }
                    else {
                      handleClose();
                    }
                  }}
                  style={{
                    "min-height": "20px",
                    width: "40%",
                    backgroundColor: "#449474",
                    fontSize: "15px",
                    fontWeight: "500",
                    marginTop: "8px",
                    padding: "1px",
                    borderRadius: "4px",
                    color: "black",
                    marginLeft: "30%",
                  }}
                >
                  {props.portfolio ? props.resp === "You already have 3 active portfolios. Inorder to create new please delete previous portfolio." ? "DELETE SOME" : "OK" : "SUBMIT AGAIN"}
                </Buttons>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open2}
                  onClose={handleClose2}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade lg={3} sm={6} xs={12} in={open2}>
                    <div
                      className={classes.paper}
                      style={{
                        // position: "fixed",

                        // width: "30%",
                        // height: "25%",
                      }}
                    >
                      {/* <h2 id="transition-modal-title">DELETE</h2> */}
                      <p id="transition-modal-description" style={{ width: "300px" }}>
                        DELETE PORTFOLIO NAME
                      </p>
                      <div style={{ marginTop: 20 }}>
                        <div className="actions">
                          <ul>
                            {array.map((stock, index) => {
                              return <li><input type="checkbox" id={stock} onChange={() => { delet.push(stock); setDelet(delet); }} ></input> <span>{stock}</span></li>
                            })}
                            {/* <li><input type="checkbox" id={array[0]} onChange={() => { delet.push(array[0]); setDelet(delet); }} ></input> <span>{array[0]}</span></li> */}
                            {/* <li><input type="checkbox" id={array[1]} onChange={() => { delet.push(array[1]); setDelet(delet); }} ></input> <span>{array[1]}</span></li> */}
                            {/* <li><input type="checkbox" id={array[2]} onChange={() => { delet.push(array[2]); setDelet(delet); }} ></input> <span>{array[2]}</span></li> */}

                          </ul>
                          {/* <ForDeletestocks  array={array} /> */}



                        </div>
                        <Buttons
                          type="button"
                          onClick={handleOpen3}
                          style={{
                            "min-height": "10px",
                            height: "30px",
                            width: "85%",
                            backgroundColor: "#20a45c",
                            fontSize: "15px",
                            fontWeight: "500",
                            marginTop: "20px",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "black",
                            marginLeft: "20px",
                            // float: 'right',
                            // marginRight: "5px",
                            // marginBottom: "10px",
                            // textTransform: "none"
                          }}
                        >
                          DELETE
                        </Buttons>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              </div>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open3}
                onClose={handleClose3}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade lg={3} sm={6} xs={12} in={open3}>
                  <div
                    className={classes.paper}
                    style={{
                      // position: "fixed",

                      // width: "30%",
                      // height: "25%",
                    }}
                  >
                    <h2 id="transition-modal-title" style={{ marginTop: "40px" }}>Alert</h2>

                    <p id="transition-modal-description" style={{ width: "300px" }}>
                      Are you sure want to delete these Portfolio name
                      {array.map((arr) => { <p>{arr}</p> })}
                    </p>
                    <div style={{ marginTop: 8 }}>
                      <div className="actions">
                        <Buttons
                          onClick={deletestocks}
                          // component={Links}
                          // to="/form"
                          type="button"
                          // onClick={() => {}}
                          // onClick={() => { func1(); func2();}}
                          style={{
                            "min-height": "20px",
                            width: "50%",
                            backgroundColor: "#449474",
                            fontSize: "15px",
                            fontWeight: "500",
                            marginTop: "10px",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "black",
                          }}
                        >
                          DELETE
                        </Buttons>&nbsp;&nbsp;
                        {/* <span> &nbsp;&nbsp; </span> */}
                        <Buttons
                          onClick={(e) => {
                            handleEntailmentRequest(e);
                          }}
                          type="button"
                          style={{
                            "min-height": "20px",
                            width: "45%",
                            backgroundColor: "#449474",
                            fontSize: "15px",
                            fontWeight: "500",
                            marginTop: "10px",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "black",
                          }}
                        >
                          CANCEL
                        </Buttons>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={classes.modal}
                          open={open4}
                          onClose={handleClose4}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade lg={3} sm={6} xs={12} in={open4}>
                            <div
                              className={classes.paper}
                              style={{
                                // position: "fixed",

                                // width: "30%",
                                // height: "25%",
                              }}
                            >
                              <h2 id="transition-modal-title" style={{ marginTop: "55px", textAlign: "center" }}>Success</h2>
                              <p id="transition-modal-description" style={{ width: "300px", textAlign: "center" }}>Completed !</p>
                              <div style={{ marginTop: 10 }}>
                                <div className="actions">
                                  <Buttons
                                    onClick={(e) => {
                                      handleEntailmentRequest(e);
                                    }}
                                    type="button"
                                    style={{
                                      "min-height": "20px",
                                      width: "40%",
                                      backgroundColor: "#449474",
                                      fontSize: "15px",
                                      fontWeight: "500",
                                      marginTop: "10px",
                                      padding: "1px",
                                      borderRadius: "4px",
                                      color: "black",
                                      marginLeft: "30%",
                                      // verticalAlign:"center"
                                    }}
                                  >
                                    OK
                                  </Buttons>

                                </div>
                              </div>
                            </div>
                          </Fade>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </Fade>
              </Modal>


            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

// function ForDeletestocks(props)
// {
//   const classes = useStyless();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <div
//         style={{
//           float: "right",
//           marginRight: "0px",
//           display: "flex",
//           width: "30%",
//         }}
//       >
//         <Buttons
//           style={{
//             "min-height": "10px",
//             width: "85%",
//             backgroundColor: "#20a45c",
//             fontSize: "15px",
//             fontWeight: "500",
//             marginTop: "20px",
//             borderRadius: "4px",
//             color: "black",
//             height: "30px",
//             // marginLeft: "850px",
//             // float: 'right',
//             marginRight: "10px",
//             marginBottom: "10px",
//             // textTransform: "none"
//           }}
//           className="button"

//         >
//           Cancel
//         </Buttons>
//         <span> &nbsp;&nbsp; </span>
//         <Buttons
//           type="button"
//           onClick={handleOpen}
//           style={{
//             "min-height": "10px",
//             height: "30px",
//             width: "85%",
//             backgroundColor: "#20a45c",
//             fontSize: "15px",
//             fontWeight: "500",
//             marginTop: "20px",
//             padding: "1px",
//             borderRadius: "4px",
//             color: "black",
//             // marginLeft: "5px",
//             // float: 'right',
//             marginRight: "5px",
//             marginBottom: "10px",
//             // textTransform: "none"
//           }}
//         >
//           Submit
//         </Buttons>
//       </div>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <div
//             className={classes.paper}
//             style={{
//               position: "fixed",
//               // background: "lightblue",
//               width: "30%",
//               height: "25%",
//             }}
//           >
//             <h2 id="transition-modal-title">Alert</h2>
//             <p id="transition-modal-description">
//               Ignore The Errors And Submit?
//             </p>
//             <div style={{ marginTop: 20 }}>
//               <div className="actions">
//                 <AlertSubmitModal file={props.file} portfolio_name={props.portfolio_name}/>
//               </div>
//             </div>
//           </div>
//         </Fade>
//       </Modal>
//     </div>
//   );



// }





function TableSubmitModal(props) {
  const classes = useStyless();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEntailmentRequest = (e) => {
    window.location.reload(false);
    // console.log("aasdfad");
  };

  return (
    <div>
      <div
        style={{
          float: "right",
          marginRight: "0px",
          display: "flex",
          width: "30%",
        }}
      >
        <Buttons
          style={{
            "min-height": "10px",
            width: "85%",
            backgroundColor: "#20a45c",
            fontSize: "15px",
            fontWeight: "500",
            marginTop: "20px",
            borderRadius: "4px",
            color: "black",
            height: "30px",
            // marginLeft: "850px",
            // float: 'right',
            marginRight: "10px",
            marginBottom: "10px",
            // textTransform: "none"
          }}
          className="button"
          onClick={(e) => {
            handleEntailmentRequest(e);
          }}
        >
          Cancel
        </Buttons>&nbsp;&nbsp;
        {/* <span> &nbsp;&nbsp; </span> */}
        <Buttons
          type="button"
          onClick={handleOpen}
          style={{
            "min-height": "10px",
            height: "30px",
            width: "85%",
            backgroundColor: "#20a45c",
            fontSize: "15px",
            fontWeight: "500",
            marginTop: "20px",
            padding: "1px",
            borderRadius: "4px",
            color: "black",
            // marginLeft: "5px",
            // float: 'right',
            marginRight: "5px",
            marginBottom: "10px",
            // textTransform: "none"
          }}
        >
          Submit
        </Buttons>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade lg={3} sm={6} xs={12} in={open}>
          <div
            className={classes.paper}
            style={{
              // position: "fixed",

              // width: "30%",
              // height: "25%",
            }}
          >
            <h2 id="transition-modal-title">Alert</h2>
            <p id="transition-modal-description" style={{ width: "300px" }}>
              {/* Ignore The Errors And Submit? */}
              Are you sure want to submit?
            </p>
            <div style={{ marginTop: 20 }}>
              <div className="actions">
                <AlertSubmitModal file={props.file} portfolio_name={props.portfolio_name} />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function AlertSubmitModal(props) {
  const classes = useStyless();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const posts = () => {
    // console.log(props.file[0].originFileObj);
    var bodyFormData = new FormData();

    bodyFormData.append('file', props.file[0].originFileObj);
    bodyFormData.append('portfolio_name', props.portfolio_name);
    // console.log(props.portfolio_name);
    axios({
      method: "post",
      url: base_url + 'dashboard/upload/',
      // url: "https://sabertoothdashboard.herokuapp.com/dashboard/upload/",
      // url:'http://127.0.0.1:8000/dashboard/upload/',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data", "Authorization": `token ${localStorage.getItem("token")}` }
    })
      .then(function (response) {
        // console.log(response.data);
      }).catch(function (error) {

        console.log("error:", error);
        // console.log("errosr:", error.response.data);
        // error.response.status === 400
        //   ? console.log("400")
        //   : error.response.status === 500
        //     ? console.log("bad request")
        //     : console.log("error");
      });
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleEntailmentRequest = (e) => {
    window.location.reload(false);
    // console.log("aasdfad");
  };

  return (
    <div>
      <Buttons
        onClick={(e) => {
          handleEntailmentRequest(e);
        }}
        // component={Links}
        // to="/form"
        type="button"
        // onClick={() => {}}
        // onClick={() => { func1(); func2();}}
        style={{
          "min-height": "20px",
          width: "50%",
          backgroundColor: "#449474",
          fontSize: "15px",
          fontWeight: "500",
          marginTop: "10px",
          padding: "1px",
          borderRadius: "4px",
          color: "black",
        }}
      >
        Re Upload
      </Buttons>&nbsp;&nbsp;
      {/* <span> &nbsp;&nbsp; </span> */}
      <Buttons
        onClick={posts}
        type="button"
        style={{
          "min-height": "20px",
          width: "45%",
          backgroundColor: "#449474",
          fontSize: "15px",
          fontWeight: "500",
          marginTop: "10px",
          padding: "1px",
          borderRadius: "4px",
          color: "black",
        }}
      >
        Yes
      </Buttons>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade lg={3} sm={6} xs={12} in={open}>
          <div
            className={classes.paper}
            style={{
              // position: "fixed",

              // width: "30%",
              // height: "25%",
            }}
          >
            <h2 id="transition-modal-title" style={{ marginTop: "55px", textAlign: "center" }}>Success</h2>
            <p id="transition-modal-description" style={{ width: "300px", textAlign: "center" }}>Completed !</p>
            <div style={{ marginTop: 10 }}>
              <div className="actions">
                <Buttons
                  onClick={(e) => {
                    handleEntailmentRequest(e);
                  }}
                  type="button"
                  style={{
                    "min-height": "20px",
                    width: "40%",
                    backgroundColor: "#449474",
                    fontSize: "15px",
                    fontWeight: "500",
                    marginTop: "10px",
                    padding: "1px",
                    borderRadius: "4px",
                    color: "black",
                    marginLeft: "30%",
                  }}
                >
                  OK
                </Buttons>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default withStyles(useStyles)(ExcelPage);