import React, { Component, PropTypes } from 'react';

export default class QuestionsTable extends Component {
  constructor(props) {
    super(props);

    this.onCellChange = this.onCellChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
  }

  onCellChange(row, col) {
    this.props.onCellChange(row, col);
  }

  onLabelChange(event) {
    const target = event.target;
    const row = parseInt(target.getAttribute("data-row-index"));
    const col = parseInt(target.getAttribute("data-col-index"));
    this.props.onLabelChange(attr.row, attr.col, target.value);
  }

  onImageClick(row, col) {
    this.props.onImageClick(row, col);
  }

  onRemoveClick(row, col) {
    this.props.onRemoveClick(row, col);
  }

  renderImageCell(row, col, image) {
    return (
      <td className="cell-image">
        <button
          type="button"
          onClick={ this.onImageClick.bind(this, row, col) }
          style={{ backgroundImage: image }}
          className="btn">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </td>
    );
  }

  renderLabelCell(row, col, label) {
    return (
      <td className="cell-label">
        <input
          type="text"
          data-row-index={ row }
          data-col-index={ col }
          onChange={ this.onLabelChange }
          value={label} />
      </td>
    );
  }

  renderInsertBtnCell(onClick) {
    return (
      <td className="cell-insert-btn">
        <button
          type="button"
          onClick={ onClick }
          className="btn btn-default">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </td>
    );
  }

  renderRemoveBtnCell(row, col) {
    return (
      <td className="cell-remove-btn">
        <button
          type="button"
          onClick={this.onRemoveClick.bind(this, row, col)}
          className="btn btn-default">
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </td>
    );
  }

  renderHead() {
    const images = [];
    const labels = [];

    for (let i = 0, l = this.props.cols.length; i < l; i++) {
      images.push(this.renderImageCell(null, i, this.props.cols[i].image));
      labels.push(this.renderLabelCell(null, i, this.props.cols[i].label));
    }

    return (
      <thead>
        <tr>
          <td colSpan="2"
              rowSpan="2">
          </td>
          { images }
          { this.renderInsertBtnCell(this.props.onInsertCol) }
        </tr>
        <tr>
          { labels }
        </tr>
      </thead>
    );
  }

  renderRadioCell(row, col, value) {
    const id = `cell-${row}-${col}`;
    return (
      <td className="cell-radio">
        <input
          type="radio"
          id={id}
          key={col}
          onChange={this.onCellChange.bind(this, row, col)}
          checked={value} />
        <label htmlFor={id}>
        </label>
      </td>
    );
  }

  renderBody() {
    const rows = this.props.rows.map((row, index) => {

      const cells = row.cells.map((cell, cellIndex) => {
        return this.renderRadioCell(index, cellIndex, cell);
      });

      cells.push(this.renderRemoveBtnCell(index, null));

      return (
        <tr>
          { this.renderImageCell(index, null, row.image) }
          { this.renderLabelCell(index, null, row.label) }
          { cells }
        </tr>
      );
    });

    // Generate column remove buttons
    const removeBtnsRow = [];
    const l = this.props.rows[0].cells.length;
    for (let i = 0; i < l; i++) {
      removeBtnsRow.push(this.renderRemoveBtnCell(null, i));
    }


    return (
      <tbody>
        { rows }
        <tr>
          { this.renderInsertBtnCell(this.props.onInsertRow) }
          <td></td>
          { removeBtnsRow }
        </tr>
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <table className="questions-table">
          { this.renderHead() }
          { this.renderBody() }
        </table>
      </div>
    );
  }
}

QuestionsTable.propTypes = {
  onLabelChange: PropTypes.func,
  onImageClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.arrayOf(PropTypes.object)
};

QuestionsTable.defaultProps = {
  rows: [
    {
      _id: "1",
      label: "row1",
      image: "",
      cells: [ true, false, false ]
    },
    {
      _id: "2",
      label: "row2",
      image: "",
      cells: [ false, true, false ]
    },
    {
      _id: "3",
      label: "row3",
      image: "",
      cells: [ false, false, true ]
    },
  ],
  cols: [
    {
      _id: "1",
      label: "col1",
      image: ""
    },
    {
      _id: "2",
      label: "col2",
      image: ""
    },
    {
      _id: "3",
      label: "col3",
      image: ""
    }
  ]
};
