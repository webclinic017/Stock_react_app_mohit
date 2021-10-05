import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import classes2 from "./Navbar.module.css";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { Link as Links, useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import api from "../../../constant";
import Table from "../../Table/Table";

var email = localStorage.getItem("email");
console.log("email:", email);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [indents, setindentsData] = React.useState([]);
  React.useEffect(() => {
    var token = localStorage.getItem("token");
    // console.log("nav_token:", "Authorization" + token);
    const headers = {
      Authorization: "Token " + token,
    };

    const postResponse = api
      .get("dashboard/me/portfolio/", { headers })

      .then(function (response) {
        if (response.status === 200) {
          // console.log("success:", response.data);

          setindentsData(response.data);
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
  }, [props.flag]);

  // console.log("successdata:", indents);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const [val, setVal] = React.useState("");
  const handleMenuStock = (e) => {
    var data = e.target.id;
    // setVal(data)
    // console.log("iam in:",data);
    localStorage.setItem("portfolio_name", data);
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push("/table");
    window.location.reload();
    // return <Table dt={data}/>
  };
  // console.log("iam out:",val);


  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("token");
    // window.location.href = "/"
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // indents.map((stock) => {
  //   console.log("data:",stock['name']);
  // });

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <Divider /> */}
      <MenuItem style={{color:"#21CE99"}}>Portfolio Name -</MenuItem>
      {/* <Divider /> */}
      {indents.map((stock, index) => {
        // {index===0?
        //   console.log("dataasda:", index);
        //   localStorage.setItem("default_portfolio_name", stock["name"]):('')
        // }
        if (index === 0) {
          localStorage.setItem("default_portfolio_name", stock["name"]);
        }
        else {

        }

        // console.log("qqqqdataasda:", stock["name"]);
        return <MenuItem id={stock["name"]} onClick={handleMenuStock}>{stock["name"]}</MenuItem>;
      })}
      <Divider />
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}

      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={logOut} style={{color:"#21CE99"}}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <SearchIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Grid style={{ textAlign: "right", paddingTop: 12, paddingLeft: 15 }}>
          <Grid className={classes2.userName}>.</Grid>
          <Grid className={classes2.email}>{email}</Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes2.userIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );

  return (<>
    {/* <Table data={val}/> */}
    <div className={classes.grow}>
      <AppBar className={classes2.navbarColor} position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            component={Links}
            to="/"
          >
            LOGO
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Company Name
          </Typography> */}

          {props.flag === "login" ?
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                component={Links}
                to="/"
              >
                LOGO
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Company Name
              </Typography></> : <div> <Typography className={classes.title} variant="h6" noWrap>
                Company Name
              </Typography></div>}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.flag === "login" ? (
              <ThemeProvider theme={theme}>
                {/* <Button variant="outlined" color="primary">
                  SIGN UP
                </Button> */}
              </ThemeProvider>
            ) : (
              <>
                <IconButton
                  component={Links}
                  to="/form"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <FileCopyIcon className={classes2.iconColor} />
                </IconButton>
                {/* <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon className={classes2.iconColor} />
                  </Badge>
                </IconButton> */}

                <Grid
                  style={{
                    textAlign: "right",
                    paddingTop: 12,
                    paddingLeft: 15,
                  }}
                >
                  <Grid className={classes2.userName}>.</Grid>
                  <Grid className={classes2.email}>{email}</Grid>
                </Grid>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle className={classes2.userIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div></>
  );
}
