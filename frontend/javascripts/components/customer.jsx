import React from 'react';

export default class CustomerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  loadCommentsFromServer() {
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
  }
  handleCustomerSubmit(customer) {
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
  }
  componentDidMount() {
    this.loadCommentsFromServer();
  }
  render() {
    return (
      <div className="customerBox">
        <h3>顧客管理</h3>
        <CustomerList data={this.state.data} />
        <CustomerForm onCustomerSubmit={this.handleCustomerSubmit.bind(this)} />
      </div>
    );
  }
};

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    this.props.onCustomerSubmit({author: author, text: text});
    this.setState({author: "", text: ""});
    return;
  }
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleChange.bind(this, "author")} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleChange.bind(this, "text")} />
        <button type="submit">Post</button>
      </form>
    );
  }
};

class CustomerList extends React.Component {
  render() {
    var nodes = this.props.data.map(function (customer) {
      return (
        <Customer customer={customer}>
        </Customer>
      );
    });
    return (
      <table className="mdl-data-table">
        <thead>
        <tr>
          <th>会員番号</th>
          <th>氏名</th>
          <th>かな</th>
          <th>性別</th>
          <th>年齢</th>
        </tr>
        </thead>
        <tbody>
        {nodes}
        </tbody>
      </table>
    );
  }
};

class Customer extends React.Component {
  render() {
    let c = this.props.customer;
    return (
      <tr>
        <td>{c.last_name} {c.first_name}</td>
        <td>{c.last_name_kana} {c.first_name_kana}</td>
      </tr>
    );
  }
};

