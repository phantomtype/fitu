import React from 'react';
import { Router, Route, Link } from 'react-router';

import CustomerBox from './components/customer.jsx';
import CustomerForm from './components/customer_form.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Title</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
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
      <Route path="customers/new" component={CustomerForm} />
    </Route>
  </Router>
), document.getElementById('app'));
