import React from 'react';

export default class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  handleChange(elm, e) {
    var newState = {};
    newState[elm] = e.target.value;
    this.setState(newState);
  }
  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author;
    var text = this.state.text;
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: "", text: ""});
    return;
  }
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleChange.bind(this, "author")} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleChange.bind(this, "text")} />
        <button type="submit">Post</button>
      </form>
    );
  }
};

