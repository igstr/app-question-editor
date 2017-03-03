import React, { Component, PropTypes } from 'react';

export default class CellRadio extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const props = this.props;
    props.onChange(props.row, props.col, event.target.value);
  }

  render() {
    const id = `cell-${this.props.row}-${this.props.col}`;
    return (
      <td className="cell-radio">
        <input
          type="radio"
          id={id}
          key={this.props.col}
          onChange={this.onChange}
          checked={this.props.value} />
        <label htmlFor={id}>
        </label>
      </td>
    );
  }
}

CellRadio.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  value: PropTypes.bool,
  onChange: PropTypes.func
};

