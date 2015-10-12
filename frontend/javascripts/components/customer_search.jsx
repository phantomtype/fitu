import React from 'react';

import TextInput    from './text_input.jsx';

export default class CustomerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], q: ''};
  }
  loadCommentsFromServer() {
    let url = '/api/v1/customers.json';
    $.ajax({
      url: url + "?q=" + this.state.q,
      dataType: 'json',
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  handleChange(elm, e) {
    this.setState({q: e});
    this.loadCommentsFromServer();
  }
  render() {
    return (
      <div>
        <h3>顧客</h3>
        <TextInput id="q" label="なまえ" value={this.state.q} handleChange={this.handleChange.bind(this)} />
        <CustomerList data={this.state.data} />
      </div>
    );
  }
}

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
