import React from 'react';

import {List, ListItem} from 'material-ui/lib/lists';
let TextField = require('material-ui/lib/text-field') // cannot use import
let RadioButtonGroup = require('material-ui/lib/radio-button-group')
let RadioButton = require('material-ui/lib/radio-button-group')
import { DatePicker } from 'material-ui/lib/date-picker' // cannot use let
let RaisedButton = require('material-ui/lib/raised-button')
let FloatingActionButton = require('material-ui/lib/floating-action-button')
let FlatButton = require('material-ui/lib/flat-button')
let {GridList} = require('material-ui/lib/grid-list')
import Snackbar from 'material-ui/lib/snackbar'
import {Card, CardHeader, CardTitle, CardText, CardActions} from 'material-ui/lib/card'

export default class CustomerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], state: "", q: "", snack_message: "", aiueo: true,
      edit_customer: {
        club_number: "",
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
      }};
  }
  loadCommentsFromServer(kana) {
    let url = '/api/v1/customers.json';
    $.ajax({
      url: url + "?q=" + kana,
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
    //this.loadCommentsFromServer();
  }
  clickAdd() {
    this.setState({state: "newCustomer", edit_customer: {}})
  }
  clickClose() {
    this.setState({state: ""})
  }
  handleQueryChanged(elm) {
    this.setState({q: elm.target.value, aiueo: false});
    this.loadCommentsFromServer(elm.target.value);
  }
  onCustomerClick(customer) {
    this.setState({state: "showCustomer", edit_customer: customer});
  }
  onCustomerEditClick(customer) {
    this.setState({state: "editCustomer", edit_customer: customer});
  }
  onKanaClick(kana) {
    this.setState({aiueo: false, q: kana});
    this.loadCommentsFromServer(kana);
  }
  onBackToKana() {
    this.setState({aiueo: true, q: ""});
  }
  handleCustomerChange(elm, value) {
    var newState = this.state.edit_customer;
    newState[elm] = value;
    this.setState({edit_customer: newState});
  }
  addButton() {
    if (this.state.state == "") {
      return (
        <FloatingActionButton
          style={{float: "right"}}
          onClick={this.clickAdd.bind(this)}>
          <i className="material-icons">add</i>
        </FloatingActionButton>
      )
    } else {
      return (
        <FloatingActionButton
          style={{float: "right"}}
          onClick={this.clickClose.bind(this)} secondary={true}>
          <i className="material-icons">close</i>
        </FloatingActionButton>
      )
    }
  }

  rightContent() {
    if (this.state.state == "showCustomer") {
      return (
        <CustomerCard customer={this.state.edit_customer}
                      onCustomerEditClick={this.onCustomerEditClick.bind(this, this.state.edit_customer)} />
      )
    } else if (this.state.state == "editCustomer" || this.state.state == "newCustomer") {
      return (
        <CustomerForm onCustomerSubmit={this.handleCustomerSubmit.bind(this)}
                    edit_customer={this.state.edit_customer}
                    handleCustomerChange={this.handleCustomerChange.bind(this)} />
      )
    } else {
      return (<span />)
    }
  }

  content() {
    if (this.state.aiueo) {
      return (
        <GridList cols={1}>
          <Aiueo onKanaClick={this.onKanaClick.bind(this)} />
        </GridList>
      )
    } else {
      return (
        <GridList cols={2}>
          <div>
            <FlatButton label="Back" secondary={true} onClick={this.onBackToKana.bind(this)} />
            <CustomerList data={this.state.data} onCustomerClick={this.onCustomerClick.bind(this)} />
          </div>
          {this.rightContent()}
        </GridList>
      )
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
        {this.content()}
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
      <form onSubmit={this.handleSubmit.bind(this)}>
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

class CustomerCard extends React.Component {
  gender_text(g) {
    if (g == "female") {
      return '女性'
    } else if (g == "man") {
      return '男性'
    } else {
      return "不明"
    }
  }
  render() {
    let c = this.props.customer
    let name = c.last_name + " " + c.first_name
    let name_kana = c.last_name_kana + " " + c.first_name_kana
    return (
      <Card>
        <CardHeader title={name} subtitle={name_kana} />
        <CardActions>
          <FlatButton label="Edit" secondary={true} onClick={this.props.onCustomerEditClick.bind(this)} />
        </CardActions>
        <CardText>
          {c.club_number}
          <GridList cols={2}>
            <span>{c.age}歳</span>
            <span>{this.gender_text(c.gender)}</span>
            <span>{c.email}</span>
            <span>{c.tel}</span>
          </GridList>
          <GridList cols={1}>
            <span>{c.address}</span>
          </GridList>
        </CardText>
        <CardText>
          {c.note}
        </CardText>
      </Card>
    )
  }
}

class Aiueo extends React.Component {
  render() {
    let self = this;
    let aiueo = [
      "あいうえお",
      "かきくけこ",
      "さしすせそ",
      "たちつてと",
      "なにぬねの",
      "はひふへほ",
      "まみむめも",
      "やゆよ",
      "わを",
    ].map(function (a) {
        return (
          a.split('').map(function (b) {
            return (
              <FlatButton label={b} onClick={self.props.onKanaClick.bind(this, b)} />
            )
          })
        );
      });
    return (
      <GridList cols={5} cellHeight={80}>
        {aiueo}
      </GridList>
    );
  }
}

class CustomerList extends React.Component {
  render() {
    let self = this;
    let nodes = this.props.data.map(function (customer) {
      return (
        <CustomerListItem customer={customer}
                          onCustomerClick={self.props.onCustomerClick.bind(this, customer)}>
        </CustomerListItem>
      );
    });
    return (
      <List>
        {nodes}
      </List>
    );
  }
};

class CustomerListItem extends React.Component {
  render() {
    let c = this.props.customer;
    let text = c.club_number + ": " + c.last_name + c.first_name + "(" + c.last_name_kana + c.first_name_kana + ")"
    return (
      <ListItem primaryText={text} onClick={this.props.onCustomerClick.bind(this)} />
    );
  }
};

