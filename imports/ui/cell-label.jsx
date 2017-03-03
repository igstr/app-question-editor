import React, { Component, PropTypes } from 'react';

export default class CellLabel extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const props = this.props;
    props.onChange(props.row, props.col, event.target.value);
  }

  render() {
    return (
      <td className="cell-label">
        <input
          type="text"
          onChange={this.onChange}
          value={this.props.value} />
      </td>
    );
  }
}

CellLabel.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func
};
