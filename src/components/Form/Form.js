import React from "react";
// import Container from "@material-ui/core/Container";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
// import classes2 from "./Form.module.css";
// import {
//   createMuiTheme,
  // MuiThemeProvider,
//   ThemeProvider,
// } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import Clock from "react-digital-clock";
// import { DropzoneAreaBase } from "material-ui-dropzone";
import ExcelPage from "./Upload";
import Layout from "../Layout/Layout";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     backgroundColor: "#141629",
//     paddingLeft: theme.spacing(8),
//     paddingRight: theme.spacing(8),
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(10),
//   },

//   containerWidth: {
//     maxWidth: "1850px",
//     marginTop: "10px",
//   },

//   title: {
//     flex: "1 1 100%",
//     fontSize: "20px",
//   },

//   endIcon: {
//     marginTop: "30px",
//     marginLeft: "560px",
//     marginRight: "",
//   },

//   textfield: {
//     "& > *": {
//       //   margin: theme.spacing(1),
//       width: "30%",
//       //   color:"green",
//       marginTop: "40px",
//       // borderColor: 'red'
//     },
//   },

//   drop: {
//     color: "#bdbbbb",
//     backgroundColor: "#141629",
//     marginTop: "76px",
//   },

//   lineStyle: {
//     "&:hover": {
//       borderBottom: "#44947",
//     },
//   },
// }));

export default function Form() {
  // const classes = useStyles();

  return (
    <>
      <Layout flag="form" />
      {/* <Container className={classes.containerWidth} id="centerstyle"> */}
      {/* <div className={classes.root}> */}
      <ExcelPage />
      {/* </div> */}
      {/* </Container> */}
    </>
  );
}
