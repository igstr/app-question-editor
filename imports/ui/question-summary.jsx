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

    // Find longest and shortest labels
    let longestRowLabel = 0;
    let longestColLabel = 0;
    let shortestRowLabel = rows[0] && rows[0].label ? rows[0].label.length : 0;
    let shortestColLabel = cols[0] && cols[0].label ? cols[0].label.length : 0;
    for (let i = 0; i < rowsLength; i++) {
      const length = rows[i].label.length;
      longestRowLabel = Math.max(length, longestRowLabel);
      shortestRowLabel = Math.min(length, shortestRowLabel);
    }
    for (let i = 0; i < colsLength; i++) {
      const length = cols[i].label.length;
      longestColLabel = Math.max(length, longestColLabel);
      shortestColLabel = Math.min(length, shortestColLabel);
    }

    return (
      <div className="view-summary">
        <h3>Summary</h3>
        <div className="summary-lines">
          { this.renderSummaryLine("Number of rows", rowsLength) }
          { this.renderSummaryLine("Number of columns", colsLength) }
          { this.renderSummaryLine("Number of images uploaded", imagesNum) }
          { this.renderSummaryLine("Longest row label", longestRowLabel) }
          { this.renderSummaryLine("Shortest row label", shortestRowLabel) }
          { this.renderSummaryLine("Longest column label", longestColLabel) }
          { this.renderSummaryLine("Shortest column label", shortestColLabel) }
        </div>
      </div>
    );
  }
}

QuestionSummary.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.arrayOf(PropTypes.object)
}
