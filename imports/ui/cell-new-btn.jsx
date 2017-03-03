import React, { Component, PropTypes } from 'react';

export default class CellNewBtn extends Component {
  render() {
    return (
      <td className="cell-new-btn">
        <button
          type="button"
          onClick={ this.props.onClick }
          className="btn btn-default">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </td>
    );
  }
}

CellNewBtn.propTypes = {
  onClick: PropTypes.func
};
