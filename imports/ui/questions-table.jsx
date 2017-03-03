import React, { Component, PropTypes } from 'react';
import CellNewBtn from './cell-new-btn.jsx';
import CellRemoveBtn from './cell-remove-btn.jsx';
import CellImage from './cell-image.jsx';
import CellLabel from './cell-label.jsx';
import CellRadio from './cell-radio.jsx';

export default class QuestionsTable extends Component {

  renderHead() {
    const imgCells = [];
    const labelCells = [];

    for (let i = 0, l = this.props.cols.length; i < l; i++) {
      imgCells.push(
        <CellImage
          col={i}
          image={this.props.cols[i].image}
          onChange={this.props.onImageChange} />
      );
      labelCells.push(
        <CellLabel
          col={i}
          value={this.props.cols[i].label}
          onChange={this.props.onLabelChange} />
      );
    }

    return (
      <thead>
        <tr>
          <td colSpan="2"
              rowSpan="2">
          </td>
          { imgCells }
          <CellNewBtn onClick={this.props.onInsertCol} />
        </tr>
        <tr>
          { labelCells }
        </tr>
      </thead>
    );
  }

  renderBody() {
    const rows = this.props.rows.map((row, index) => {

      const cells = row.cells.map((cell, cellIndex) => {
        return (
          <CellRadio
            row={index}
            col={cellIndex}
            value={cell}
            onChange={this.props.onCellChange} />
        );
      });

      cells.push(
        <CellRemoveBtn
          row={index}
          onClick={this.props.onRemoveClick} />
      );

      return (
        <tr>
          <CellImage
            row={index}
            image={row.image}
            onChange={this.props.onImageChange} />
          <CellLabel
            row={index}
            value={row.label}
            onChange={this.props.onLabelChange} />
          { cells }
        </tr>
      );
    });

    // Generate column remove buttons
    const removeBtnsRow = [];
    const l = this.props.rows[0].cells.length;
    for (let i = 0; i < l; i++) {
      removeBtnsRow.push(
        <CellRemoveBtn
          col={i}
          onClick={this.props.onRemoveClick} />
      );
    }

    return (
      <tbody>
        { rows }
        <tr>
          <CellNewBtn onClick={this.props.onInsertRow} />
          <td></td>
          { removeBtnsRow }
        </tr>
      </tbody>
    );
  }

  render() {
    return (
      <table className="questions-table">
        { this.renderHead() }
        { this.renderBody() }
      </table>
    );
  }
}

QuestionsTable.propTypes = {
  onLabelChange: PropTypes.func,
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
