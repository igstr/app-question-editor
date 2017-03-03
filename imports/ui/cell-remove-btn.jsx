import React, { Component, PropTypes } from 'react';

export default class CellRemoveBtn extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.row, this.props.col);
  }

  render() {
    const onClick = this.props.onClick ? this.onClick : null;
    return (
      <td className="cell-remove-btn">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-default">
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </td>
    );
  }
}

CellRemoveBtn.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  onClick: PropTypes.func
};
