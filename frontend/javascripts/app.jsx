import React from 'react';
//import {CommentBox} from './components/comment.jsx';
import CustomerBox from './components/customer.jsx';

import { Router, Route, Link } from 'react-router';

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
