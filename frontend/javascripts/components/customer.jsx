import React from 'react';

import DateInput    from './date_input.jsx';
import RadioGroup   from './radio_group.jsx';
import TextInput    from './text_input.jsx';

export default class CustomerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], adding: false};
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
    let url = '/api/v1/customers.json';
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
  clickAdd() {
    this.setState({adding: true})
  }
  render() {
    return (
      <div className="customerBox">
        <h3>顧客管理
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--right" onClick={this.clickAdd.bind(this)}>
            <i className="material-icons">add</i>
          </button>
        </h3>
        <CustomerForm onCustomerSubmit={this.handleCustomerSubmit.bind(this)} visible={this.state.adding} />
        <CustomerList data={this.state.data} />
      </div>
    );
  }
};

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gender: "female"};
  }
  handleChange(elm, e) {
    var newState = {};
    newState[elm] = e;
    this.setState(newState);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onCustomerSubmit({customer: this.state});
    this.setState({});
    return;
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.visible ?  {} : {display: "none"}}>
        <div className="mdl-grid">
          <TextInput id="club_number" label="会員番号" col="4" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <TextInput id="last_name" label="氏" col="3" handleChange={this.handleChange.bind(this)} />
          <TextInput id="first_name" label="名" col="3" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <TextInput id="last_name_kana" label="氏(かな)" col="3" handleChange={this.handleChange.bind(this)} />
          <TextInput id="first_name_kana" label="名(かな)" col="3" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col">
            <RadioGroup id="gender" labels={[{v: "female", l: "女性"}, {v: "man", l: "男性"}]} handleChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="mdl-grid">
            <DateInput id="birth" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <TextInput id="email" label="email" col="4" handleChange={this.handleChange.bind(this)} />
          <TextInput id="tel" label="tel" col="4" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <TextInput id="address" label="住所" width="550px" col="8" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <TextInput id="note" label="備考" col="8" handleChange={this.handleChange.bind(this)} />
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col">
            <button className="mdl-button mdl-js-button mdl-button--raised">Post</button>
          </div>
        </div>
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
          <th>email</th>
          <th>tel</th>
          <th>address</th>
          <th>note</th>
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
        <td>{c.club_number}</td>
        <td>{c.last_name} {c.first_name}</td>
        <td>{c.last_name_kana} {c.first_name_kana}</td>
        <td>{c.gender}</td>
        <td>{c.age}</td>
        <td>{c.email}</td>
        <td>{c.tel}</td>
        <td>{c.address}</td>
        <td>{c.note}</td>
      </tr>
    );
  }
};

