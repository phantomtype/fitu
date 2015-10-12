import React from 'react';

export default class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
  }
  handleChange(elm, e) {
    this.setState({value: e.target.value});
    this.props.handleChange(this.props.id, e.target.value);
  }
  render() {
    return (
      <div className={"mdl-cell mdl-cell--" + this.props.col + "-col"}>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id={this.props.id}
                 value={this.state.value} onChange={this.handleChange.bind(this, "")} />
          <label className="mdl-textfield__label" for={this.props.id}>{this.props.label}</label>
          <span className="mdl-textfield__error">数字を入力してください。</span>
        </div>
      </div>
    );
  }
};

