import React from 'react';

import {List, ListItem} from 'material-ui/lib/lists';
let TextField = require('material-ui/lib/text-field') // cannot use import
let RadioButtonGroup = require('material-ui/lib/radio-button-group')
let RadioButton = require('material-ui/lib/radio-button-group')
import { DatePicker } from 'material-ui/lib/date-picker' // cannot use let
let RaisedButton = require('material-ui/lib/raised-button')
let FloatingActionButton = require('material-ui/lib/floating-action-button')
let {GridList} = require('material-ui/lib/grid-list')
import Snackbar from 'material-ui/lib/snackbar'

export default class CustomerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], adding: false, q: "", snack_message: "",
      edit_customer: {
        club_number: "",
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
      }};
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
  handleCustomerSubmit() {
    var url = '/api/v1/customers.json';
    var method = 'POST'
    let customer = this.state.edit_customer;
    delete customer.age;
    if (customer.id !== undefined) {
      url = '/api/v1/customers/' + customer.id + '.json';
      method = 'PUT'
    }
    $.ajax({
      url: url,
      dataType: 'json',
      type: method,
      data: {customer: customer},
      success: function(data) {
        if (customer.id == undefined) {
          this.setState({data: this.state.data.concat([customer]), snack_message: "追加しました。"});
        } else {
          this.setState({snack_message: "更新しました。"})
        }
        this.refs.snackbar.show();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadCommentsFromServer();
  }
  clickAdd(value) {
    this.setState({adding: value})
  }
  handleQueryChanged(elm) {
    this.setState({q: elm.target.value});
    this.loadCommentsFromServer();
  }
  onCustomerClick(customer) {
    this.setState({adding: true, edit_customer: customer});
  }
  handleCustomerChange(elm, value) {
    var newState = this.state.edit_customer;
    newState[elm] = value;
    this.setState({edit_customer: newState});
  }
  addButton() {
    if (!this.state.adding) {
      return (
        <FloatingActionButton
          style={{float: "right"}}
          onClick={this.clickAdd.bind(this, true)}>
          <i className="material-icons">add</i>
        </FloatingActionButton>
      )
    } else {
      return (
        <FloatingActionButton
          style={{float: "right"}}
          onClick={this.clickAdd.bind(this, false)} secondary={true}>
          <i className="material-icons">close</i>
        </FloatingActionButton>
    }
  }
  render() {
    return (
      <div className="customerBox">
        <h3>顧客管理
          <span style={{margin: "0 35px"}}>
            <i className="material-icons">search</i>
            <TextField floatingLabelText="検索" value={this.state.q} onChange={this.handleQueryChanged.bind(this)} />
          </span>
          {this.addButton()}</h3>
        <GridList cols="2">
          <CustomerList data={this.state.data} onCustomerClick={this.onCustomerClick.bind(this)} />
          <CustomerForm onCustomerSubmit={this.handleCustomerSubmit.bind(this)}
                        edit_customer={this.state.edit_customer}
                        handleCustomerChange={this.handleCustomerChange.bind(this)}
                        visible={this.state.adding} />
        </GridList>
        <Snackbar ref="snackbar" message={this.state.snack_message} />
      </div>
    );
  }
};

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange(elm, e) {
    this.props.handleCustomerChange(elm, e.target.value)
  }
  handleDateChange(elm, e, date) {
    this.props.handleCustomerChange(elm, date)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onCustomerSubmit();
    return;
  }
  render() {
    let c = this.props.edit_customer;
    var birth = ""
    if (c.birth !== undefined) {
      birth = new Date(c.birth)
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.visible ?  {} : {display: "none"}}>
        <TextField floatingLabelText="会員番号" value={c.club_number} onChange={this.handleChange.bind(this, "club_number")} />
        <br />
        <TextField floatingLabelText="氏" value={c.last_name} onChange={this.handleChange.bind(this, "last_name")} />
        <TextField floatingLabelText="名" value={c.first_name} onChange={this.handleChange.bind(this, "first_name")} />
        <br />
        <TextField floatingLabelText="氏(かな)" value={c.last_name_kana} onChange={this.handleChange.bind(this, "last_name_kana")} />
        <TextField floatingLabelText="名(かな)" value={c.first_name_kana} onChange={this.handleChange.bind(this, "first_name_kana")} />
        <br />
        <RadioButtonGroup onChange={this.handleChange.bind(this, "gender")} defaultSelected={c.gender} valueSelected={c.gender}>
          <RadioButton label="女性" value="female" />
          <RadioButton label="男性" value="man" />
        </RadioButtonGroup>
        <br />
        <DatePicker floatingLabelText="生年月日"
                    autoOk={true}
                    mode="landscape"
                    value={birth}
                    formatDate={(dt) => `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`}
                    onChange={this.handleDateChange.bind(this, "birth")} />
        <br />
        <TextField floatingLabelText="email"   value={c.email} onChange={this.handleChange.bind(this, "email")} type="email" />
        <TextField floatingLabelText="tel"     value={c.tel} onChange={this.handleChange.bind(this, "tel")} />
        <br />
        <TextField floatingLabelText="住所" value={c.address} onChange={this.handleChange.bind(this, "address")} fullWidth={true} />
        <br />
        <TextField floatingLabelText="備考"    value={c.note} onChange={this.handleChange.bind(this, "note")} fullWidth={true} />
        <br />

        <RaisedButton label="Post" primary={true} onClick={this.handleSubmit.bind(this)} />
      </form>
    );
  }
};

class CustomerList extends React.Component {
  render() {
    let self = this;
    var nodes = this.props.data.map(function (customer) {
      return (
        <Customer customer={customer} onCustomerClick={self.props.onCustomerClick.bind(this, customer)}>
        </Customer>
      );
    });
    return (
      <List>
        {nodes}
      </List>
    );
  }
};

class Customer extends React.Component {
  render() {
    let c = this.props.customer;
    let text = c.club_number + ": " + c.last_name + c.first_name + "(" + c.last_name_kana + c.first_name_kana + ")"
    return (
      <ListItem primaryText={text} onClick={this.props.onCustomerClick.bind(this)} />
    );
  }
};

