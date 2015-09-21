import React from 'react';
var marked = require('marked')
import { Router, Route, Link } from 'react-router';

let url = '/api/v1/comments.json';

let CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    this.setState({data: this.state.data.concat([comment])});
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

let CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

let CommentForm = React.createClass({
  getInitialState: function () {
    return {
      author: "",
      text: ""
    };
  },
  handleChange: function (elm, e) {
    var newState = {};
    newState[elm] = e.target.value;
    this.setState(newState);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author;
    var text = this.state.text;
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: "", text: ""});
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleChange.bind(this, "author")} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleChange.bind(this, "text")} />
        <button type="submit">Post</button>
      </form>
    );
  }
});

let Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div>
        <span xs={3}>{this.props.author}</span>
        <span xs={6} dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

let CustomerBox = React.createClass({
  loadCommentsFromServer: function() {
    let url = '/api/v1/customers.json';
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCustomerSubmit: function(customer) {
    this.setState({data: this.state.data.concat([customer])});
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: customer,
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    //<CommentForm onCustomerSubmit={this.handleCustomerSubmit} />
    return (
      <div className="customerBox">
        <h3>Customers</h3>
        <CustomerList data={this.state.data} />
      </div>
    );
  }
});

let CustomerList = React.createClass({
  render: function() {
    var nodes = this.props.data.map(function (customer) {
      return (
        <Customer customer={customer}>
        </Customer>
      );
    });
    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">氏名</th>
          <th>かな</th>
        </tr>
        </thead>
        <tbody>
          {nodes}
        </tbody>
      </table>
    );
  }
});

let CustomerForm = React.createClass({
  getInitialState: function () {
    return {
      first_name: "",
      last_name: "",
      first_name_kana: "",
      last_name_kana: "",
      birth: "",
      address: "",
      gender: "",
      email: "",
      tel: "",
      note: "",
    };
  },
  handleChange: function (elm, e) {
    var newState = {};
    newState[elm] = e.target.value;
    this.setState(newState);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var first_name = this.state.first_name;
    var last_name = this.state.last_name;
    var first_name_kana = this.state.first_name_kana;
    var last_name_kana = this.state.last_name_kana;
    var birth = this.state.birth;
    var address = this.state.address;
    var gender = this.state.gender;
    var email = this.state.email;
    var tel = this.state.tel;
    var note = this.state.not;
    this.props.onCommentSubmit({
      first_name: first_name, last_name: last_name,
      first_name_kana: first_name_kana, last_name_kana: last_name_kana,
      birth: birth, address: address, gender: gender,
      email: email, tel: tel, note: note
    });
    this.setState(this.getInitialState());
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleChange.bind(this, "author")} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleChange.bind(this, "text")} />
        <Button type="submit" bsStyle="success" block>Post</Button>
      </form>
    );
  }
});

let Customer = React.createClass({
  render: function() {
    let c = this.props.customer;
    return (
      <tr>
        <td>{c.last_name} {c.first_name}</td>
        <td>{c.last_name_kana} {c.first_name_kana}</td>
      </tr>
    );
  }
});

var App = React.createClass({
  render() {
    return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <header className="demo-header mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Home</span>
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
            <label className="mdl-button mdl-js-button mdl-button--icon" for="search">
              <i className="material-icons">search</i>
            </label>
            <div className="mdl-textfield__expandable-holder">
              <input className="mdl-textfield__input" type="text" id="search" />
              <label className="mdl-textfield__label" for="search">Enter your query...</label>
            </div>
          </div>
        </div>
      </header>
      <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="demo-drawer-header">
          <div className="demo-avatar-dropdown">
            <span>hello@example.com</span>
            <div className="mdl-layout-spacer"></div>
            <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons" role="presentation">arrow_drop_down</i>
              <span className="visuallyhidden">Accounts</span>
            </button>
            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
              <li className="mdl-menu__item">hello@example.com</li>
              <li className="mdl-menu__item">info@example.com</li>
            </ul>
          </div>
        </header>
        <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          <Link className="mdl-navigation__link" to={`/comments`}>comments</Link>
          <Link className="mdl-navigation__link" to={`/customers`}>customers</Link>
        </nav>
      </div>
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          {this.props.children}
        </div>
      </main>
      </div>
    );
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="comments" component={CommentBox} />
      <Route path="customers" component={CustomerBox} />
    </Route>
  </Router>
), document.getElementById('app'));
