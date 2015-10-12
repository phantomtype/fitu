import React from 'react';

export default class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }
  handleChange(elm, e) {
    this.setState({value: e.target.value});
    this.props.handleChange(this.props.id, e.target.value);
  }
  render() {
    let rs = this.props.labels.map((label) => {
      return (
        <label for={this.props.id} className="mdl-radio mdl-js-radio">
          <input
            className="mdl-radio__button"
            type="radio"
            value={label.v}
            id={label.v}
            checked={this.state.value == label.v}
            onChange={this.handleChange.bind(this, "")} />
          <span className="mdl-radio__label">{label.l}</span>
        </label>
      )
    });
    return (
      <div>
        {rs}
      </div>
    );
  }
};

