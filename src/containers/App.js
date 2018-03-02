import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movie/tt0106062">Matrix movie</Link>
          </li>
          <li>
            <Link to="/something">A broken page link</Link>
          </li>
        </ul>
        <Notifications
          notifications={this.props.notifications}
          removeFunc={this.props.removeNotification}
        />
        <Routes />
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
