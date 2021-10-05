
import "./App.css";
import Table from "./components/Table/Table";
import Login from "./components/Login/Login";
import Form from "./components/Form/Form";
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from './Theme/DarkModeTheme';
// import TablePage from "./components/Form/FormTab";

var token = localStorage.getItem("token");

function check(component) {
  if (token) {
    return component;
  } else {
    return Login;
  }
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/table" component={check(Table)} />
            <Route path="/form" component={check(Form)} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/form">
            <Form />
          </Route> */}
            {/* <Route path="/showtable">
              <TablePage  />
            </Route> */}
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
