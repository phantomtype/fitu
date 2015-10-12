import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }
  handleChange(elm, e) {
    this.setState({value: e.target.value});
    this.props.handleChange(this.props.id, e.target.value);
  }
  render() {
    return (
      <div className={"mdl-cell mdl-cell--" + this.props.col + "-col"}>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: this.props.width}}>
          <input className="mdl-textfield__input" type="text" id={this.props.id}
                 value={this.state.value} onChange={this.handleChange.bind(this, "")} />
          <label className="mdl-textfield__label" for={this.props.id}>{this.props.label}</label>
        </div>
      </div>
    );
  }
};
