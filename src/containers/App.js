import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Menu from "./components/Menu/Menu";

// Action Creators
import { removeNotification } from "../actions/notification";

// UI Components
import Notifications from "./components/Notifications/Notifications";

// Routes
import Routes from "./routes/Routes";

class App extends Component {
  render() {
    return (
      <div id="app">
        <MuiThemeProvider>
          <div>
            <Menu />
            <Notifications
              notifications={this.props.notifications}
              removeFunc={this.props.removeNotification}
            />
            <Routes />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
