import React, { Component, PropTypes } from 'react';

export default class QuestionSummary extends Component {

  renderSummaryLine(text, number) {
    return <p>{text}: <strong>{number}</strong></p>
  }

  render() {
    const rows = this.props.rows;
    const cols = this.props.cols;
    const rowsLength = rows.length;
    const colsLength = cols.length;

    // Find total image uploaded number
    const imageUploaded = rowOrCol => {
      return rowOrCol.image && rowOrCol.image !== "";
    };
    const imagesNum = rows.filter(imageUploaded).length
      + cols.filter(imageUploaded).length;

    // Find longest labels
    let longestRowLabel = 0;
    let longestColLabel = 0;
    for (let i = 0; i < rowsLength; i++) {
      longestRowLabel = Math.max(rows[i].label.length, longestRowLabel);
    }
    for (let i = 0; i < colsLength; i++) {
      longestColLabel = Math.max(cols[i].label.length, longestColLabel);
    }

    return (
      <div className="view-summary">
        <h3>Summary</h3>
        <div className="summary-lines">
          { this.renderSummaryLine("Number of rows", rowsLength) }
          { this.renderSummaryLine("Number of columns", colsLength) }
          { this.renderSummaryLine("Number of images uploaded", imagesNum) }
          { this.renderSummaryLine("Longest row label", longestRowLabel) }
          { this.renderSummaryLine("Longest column label", longestColLabel) }
        </div>
      </div>
    );
  }
}

QuestionSummary.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.arrayOf(PropTypes.object)
}
