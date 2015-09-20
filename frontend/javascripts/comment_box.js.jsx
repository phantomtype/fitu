import React from 'react/addons';
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
  handleAuthorChange: function (e) {
    this.setState({author: e.target.value})
  },
  handleTextChange: function (e) {
    this.setState({text: e.target.value})
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
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
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

var App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to={`/comments`}>comments</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

React.render((
  <Router>
  <Route path="/" component={App}>
    <Route path="comments" component={CommentBox} url={url} />
  </Route>
  </Router>
), document.getElementById('app'));
