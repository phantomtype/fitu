import React from 'react';
import { Router, Route, Link } from 'react-router';

const AppBar     = require('material-ui/lib/app-bar');
const FlatButton = require('material-ui/lib/flat-button');

import CustomerBox from './components/customer.jsx';
import CustomerSearch from './components/customer_search.jsx';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          title="FitYou"
          iconElementRight={<FlatButton label="Save" />} />
        <main className="mdl-layout__content content">
          {this.props.children}
        </main>
      </div>
    )
  }
};

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="customers" component={CustomerBox} />
      <Route path="customers/search" component={CustomerSearch} />
    </Route>
  </Router>
), document.getElementById('app'));
