import React from 'react';
var marked = require('marked')
import { Router, Route, Link } from 'react-router';

import { Grid, Col, Row, Button } from 'react-bootstrap';

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
      <Grid className="commentList">
        {commentNodes}
      </Grid>
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
        <Button type="submit" bsStyle="success" block>Post</Button>
      </form>
    );
  }
});

let Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <Row>
        <Col xs={3}>{this.props.author}</Col>
        <Col xs={6} dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </Row>
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
        <h1>Customers</h1>
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
      <Grid className="commentList">
        {nodes}
      </Grid>
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
      <Row>
        <Col xs={2}>{c.last_name} {c.first_name}</Col>
        <Col xs={2}>{c.last_name_kana} {c.first_name_kana}</Col>
      </Row>
    );
  }
});

var App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to={`/comments`}>comments</Link></li>
          <li><Link to={`/customers`}>customers</Link></li>
        </ul>
        {this.props.children}
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
