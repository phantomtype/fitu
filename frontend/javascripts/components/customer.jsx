import React from 'react';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/lib/table';
let TextField = require('material-ui/lib/text-field') // cannot use import
let RadioButtonGroup = require('material-ui/lib/radio-button-group')
let RadioButton = require('material-ui/lib/radio-button-group')
import { DatePicker } from 'material-ui/lib/date-picker' // cannot use let
let RaisedButton = require('material-ui/lib/raised-button')

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
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: customer,
      success: function(data) {
        this.setState({data: this.state.data.concat([customer.customer])});
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
  clickClose() {
    this.setState({adding: false})
  }
  render() {
    var addButton = "";
    if (!this.state.adding) {
      addButton =
        <button
          className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--right"
          onClick={this.clickAdd.bind(this)}>
          <i className="material-icons">add</i>
        </button>
    } else {
      addButton =
        <button
          className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--right"
          onClick={this.clickClose.bind(this)}>
          <i className="material-icons">close</i>
        </button>
    }
    return (
      <div className="customerBox">
        <h3>顧客管理 {addButton}</h3>
        <CustomerForm onCustomerSubmit={this.handleCustomerSubmit.bind(this)} visible={this.state.adding} />
        <CustomerList data={this.state.data} />
      </div>
    );
  }
};

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {club_number: '', gender: "female"};
  }
  handleChange(elm, e) {
    var newState = {};
    newState[elm] = e.target.value;
    this.setState(newState);
  }
  handleDateChange(elm, e, date) {
    var newState = {};
    newState[elm] = date;
    this.setState(newState);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onCustomerSubmit({customer: this.state});
    this.setState({
      club_number: '', last_name: "", first_name: "", last_name_kana: '', first_name_kana: '',
      gender: 'female', birth: '', email: '', tel: '', address: '', note: ''
    });
    return;
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.visible ?  {} : {display: "none"}}>
        <TextField floatingLabelText="会員番号" value={this.state.club_number} onChange={this.handleChange.bind(this, "club_number")} />
        <br />
        <TextField floatingLabelText="氏" value={this.state.last_name} onChange={this.handleChange.bind(this, "last_name")} />
        <TextField floatingLabelText="名" value={this.state.first_name} onChange={this.handleChange.bind(this, "first_name")} />
        <br />
        <TextField floatingLabelText="氏(かな)" value={this.state.last_name_kana} onChange={this.handleChange.bind(this, "last_name_kana")} />
        <TextField floatingLabelText="名(かな)" value={this.state.first_name_kana} onChange={this.handleChange.bind(this, "first_name_kana")} />
        <br />
        <RadioButtonGroup onChange={this.handleChange.bind(this, "gender")} defaultSelected={this.state.gender}>
          <RadioButton label="女性" value="female" />
          <RadioButton label="男性" value="man" />
        </RadioButtonGroup>
        <br />
        <DatePicker hintText="生年月日" autoOk={true} mode="landscape" value={this.state.birth} onChange={this.handleDateChange.bind(this, "birth")} />
        <br />
        <TextField floatingLabelText="email"   value={this.state.email} onChange={this.handleChange.bind(this, "email")} type="email" />
        <TextField floatingLabelText="tel"     value={this.state.tel} onChange={this.handleChange.bind(this, "tel")} />
        <br />
        <TextField floatingLabelText="住所" value={this.state.address} onChange={this.handleChange.bind(this, "address")} fullWidth={true} />
        <br />
        <TextField floatingLabelText="備考"    value={this.state.note} onChange={this.handleChange.bind(this, "note")} fullWidth={true} />
        <br />

        <RaisedButton label="Post" primary={true} />
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
      <Table>
        <TableHeader>
        <TableRow>
          <TableHeaderColumn>会員番号</TableHeaderColumn>
          <TableHeaderColumn>氏名</TableHeaderColumn>
          <TableHeaderColumn>かな</TableHeaderColumn>
          <TableHeaderColumn>性別</TableHeaderColumn>
          <TableHeaderColumn>年齢</TableHeaderColumn>
          <TableHeaderColumn>email</TableHeaderColumn>
          <TableHeaderColumn>tel</TableHeaderColumn>
          <TableHeaderColumn>address</TableHeaderColumn>
          <TableHeaderColumn>note</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody>
        {nodes}
        </TableBody>
      </Table>
    );
  }
};

class Customer extends React.Component {
  render() {
    let c = this.props.customer;
    return (
      <TableRow>
        <TableRowColumn>{c.club_number}</TableRowColumn>
        <TableRowColumn>{c.last_name} {c.first_name}</TableRowColumn>
        <TableRowColumn>{c.last_name_kana} {c.first_name_kana}</TableRowColumn>
        <TableRowColumn>{c.gender}</TableRowColumn>
        <TableRowColumn>{c.age}</TableRowColumn>
        <TableRowColumn>{c.email}</TableRowColumn>
        <TableRowColumn>{c.tel}</TableRowColumn>
        <TableRowColumn>{c.address}</TableRowColumn>
        <TableRowColumn>{c.note}</TableRowColumn>
      </TableRow>
    );
  }
};

