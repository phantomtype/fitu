import React from 'react';
import { Router, Route, Link } from 'react-router';

const RaisedButton = require('material-ui/lib/raised-button');

import CustomerBox from './components/customer.jsx';
import CustomerSearch from './components/customer_search.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">FitYou</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <Link className="mdl-navigation__link" to="/customers">顧客管理</Link>
              <Link className="mdl-navigation__link" to="/customers/search">検索</Link>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">FitYou</span>
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" to="/customers">顧客管理</Link>
            <Link className="mdl-navigation__link" to="/customers/search">検索</Link>
          </nav>
        </div>
        <main className="mdl-layout__content content">
          <RaisedButton label="aieuo" primary={true} />
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
