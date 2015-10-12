import React from 'react';

import NumericInput from './numeric_input.jsx';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {year: "", month: "", day: ""};
  }
  handleChange(elm, e) {
    var newState = {};
    newState[elm] = e;
    this.setState(newState);
    if (this.state.year && this.state.month && this.state.day) {
      let date = new Date(this.state.year, this.state.month - 1, this.state.day)
      console.log(date)
      this.props.handleChange(this.props.id, date)
    }
  }
  render() {
    return (
      <div style={{display: "inherit"}}>
        <NumericInput id="year" label="生年" col="1" value={this.state.year} handleChange={this.handleChange.bind(this)} />
        <NumericInput id="month" label="生月" col="1" value={this.state.month} handleChange={this.handleChange.bind(this)} />
        <NumericInput id="day" label="生日" col="1" value={this.state.day} handleChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

