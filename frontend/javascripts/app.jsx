import React from 'react';
import { Router, Route, Link } from 'react-router';

const AppBar     = require('material-ui/lib/app-bar');
const FlatButton = require('material-ui/lib/flat-button');

import CustomerBox from './components/customer.jsx';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          title="FitYou"
          iconElementRight={<FlatButton label="顧客" onClick={this.get_customers.bind(this)} />} />
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

  get_customers() {
    this.props.history.pushState(null, "/customers");
  }
};

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="customers" component={CustomerBox} />
    </Route>
  </Router>
), document.getElementById('app'));
