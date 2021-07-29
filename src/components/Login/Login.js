import React, { useState } from "react";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import classes2 from "./Login.module.css";
// import { green, purple } from '@material-ui/core/colors';
// import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
// import { Link as Links } from "react-router-dom";
import Layout from "../Layout/Layout";
import api from "../../constant";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#141629",
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  endIcon: {
    position: "absolute",
    right: "1rem",
  },

  container: {
    maxHeight: 490,
  },
  paginationColor: {
    backgroundColor: "#141629",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  containerWidth: {
    maxWidth: "600px",
    marginTop: "30px",
  },
  title: {
    flex: "1 1 100%",
  },
  textfield: {
    "& > *": {
      //   margin: theme.spacing(1),
      width: "100%",
      //   color:"green",
      marginTop: "30px",
      // borderColor: 'red'
    },
  },

  placeholder: {
    "& input::placeholder": {
      fontSize: "10px",
      fontWeight: "100",
      color: "green",
    },
  },

  subtext: {
    fontSize: "12px",
    fontWeight: "400",
    letterSpacing: "2px",
    color: "rgb(148, 149, 157)",
    paddingTop: "10px",
  },

  forgetpassword: {
    fontSize: "13px",
    fontWeight: "100",
    // paddingTop: "30px",
    paddingRight: "3px",
    // paddingBottom: "0px",
    color: "green",
  },

  needhelpbutton: {
    fontSize: "13px",
    fontWeight: "100",
    // paddingTop: "30px",
    paddingRight: "3px",
    color: "green",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#438c3f",
      contrastText: "#000000",
    },
    secondary: {
      main: "#438c3f",
      contrastText: "#000000",
    },
  },
});

// const textareauseStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
// }));

// const CssTextField = withStyles({
//     root: {
//         '& label.Mui-focused': {
//             color: 'green',
//         },
//         '& .MuiInput-underline:after': {
//             borderBottomColor: 'green',
//         },
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderColor: 'green',
//             },
//             '&:hover fieldset': {
//                 borderColor: 'green',
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: 'green',
//             },
//         },
//     },
// })(TextField);

const color = "#008000";
const themes = createMuiTheme({
  palette: {
    common: { black: color, white: color },
    primary: { main: color, dark: color, light: color },
    text: { primary: color, secondary: color },
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid ${color}`,
        },
      },
    },
  },
});

export default function Login() {
  // const classe = textareauseStyles();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("no");
  const datapost = {
    email: email,
    password: password,
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email or Password cannot be blank");
    } else {
      setEmail("");
      setPassword("");

      const headers = {
        "Content-Type": "application/json; charset=UTF-8",
      };
 
      const postResponse = await api
        .post("user/login/", datapost, { headers })
        // .post("login_user_register/", datapost, { headers })

        .then(function (response) {
          if (response.status === 200) {
            console.log("success:", response.data["token"]);
            localStorage.setItem("token", response.data["token"]);
            localStorage.setItem("email", email);
            // console.log("email:",email);
            window.location = "/table";
          }
        })
        .catch(function (error) {
          console.log("error:", error);
          console.log("errosr:", error.response.data);
          error.response.status === 400
            ? alert("Please Enter Correct Login Credentials")
            : error.response.status === 500
            ? console.log("bad request")
            : console.log("error");
        });
    }
  };

  const iconHideShow = () => {
    if (icon === "no") {
      setIcon("yes");
    } else {
      setIcon("no");
    }
  };

  return (
    <>
      <Layout flag="login" />
      <MuiThemeProvider theme={themes}>
        <Container className={classes.containerWidth}>
          <div className={classes.root}>
            <Typography
              className={classes.title}
              variant="h5"
              id="tableTitle"
              component="div"
            >
              LOG IN
            </Typography>
            <Typography
              className={classes.subtext}
              // variant="h6"
              // id="tableTitle"
              component="div"
            >
              At vero eos et accusamus et iusto osio diagnissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atquw corrupti
            </Typography>

            {/* <form className={classes.textfield} noValidate autoComplete="off">
                    <Input className={classes.placeholder} color="green"  placeholder="Email Address" inputProps={{ 'aria-label': 'description' }}
                        id="custom-css-outlined-input" variant="outlined" />
                    <Input className={classes.placeholder} color="green"  type="password" placeholder="Password" inputProps={{ 'aria-label': 'description' }} />
                </form> */}

            <form className={classes.textfield} onSubmit={submit} noValidate>
              <TextField
                // className={classe.placeholder}
                label="Email Address"
                variant="standard"
                id="standard-search"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{
                  style: { fontSize: 13, color: "white", marginBottom: "18px" },
                }}
                InputLabelProps={{ className: classes2.text_field }}
              />
              <TextField
                // className={classe.placeholder}
                label="Password"
                style={{display:null}}
                variant="standard"
                type={icon === "yes" ? "text" : "password"}
                // type="password"
                id="standard-search"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ style: { fontSize: 13, color: "white" } }}
                InputLabelProps={{ className: classes2.text_field }}
                InputProps={{
                  color: "white",
                  endAdornment: (
                    <IconButton onClick={iconHideShow}>
                      <LockOpenOutlinedIcon
                        style={{ color: "rgb(148, 149, 157)" }}
                      />
                    </IconButton>
                  ),
                }}
              />
              {/* </form> */}

              <Typography
                className={classes.forgetpassword}
                // variant="h6"
                // id="tableTitle"
                align="right"
                component="div"
              >
                <Link className={classes.forgetpassword} href="#">
                  {/* Forget Password? */}
                </Link>
              </Typography>

              <ThemeProvider theme={theme}>
                <Button
                  classes={{
                    endIcon: classes.endIcon,
                  }}
                  type="submit"
                  // component={Links}
                  // to="/table"
                  endIcon={<ArrowForwardIosIcon />}
                  variant="contained"
                  color="primary"
                  style={{ "min-height": "60px", width: "100%" }}
                >
                  CONTINUE
                </Button>
              </ThemeProvider>

              <Typography
                className={classes.needhelpbutton}
                // variant="h6"
                // id="tableTitle"
                align="right"
                component="div"
              >
                <Link className={classes.needhelpbutton} href="#">
                  {/* Need Help? */}
                </Link>
              </Typography>
            </form>
          </div>
        </Container>
      </MuiThemeProvider>
    </>
  );
}
