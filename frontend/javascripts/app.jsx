import React from 'react';
import { Router, Route, Link } from 'react-router';

import CustomerBox from './components/customer.jsx';

class App extends React.Component {
  render() {
    return (
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <Link to="/customers">cs</Link>
          {this.props.children}
        </div>
      </main>
    )
  }
};

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="customers" component={CustomerBox} />
    </Route>
  </Router>
), document.getElementById('app'));
