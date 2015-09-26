import React from 'react';
var marked = require('marked')

let url = '/api/v1/comments.json';

export default class CommentBox extends React.Component {
  loadCommentsFromServer() {
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
  }
  handleCommentSubmit(comment) {
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
  }
  getInitialState() {
    return {data: []};
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

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

