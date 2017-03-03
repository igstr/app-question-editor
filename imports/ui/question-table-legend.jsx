import React, { Component, PropTypes } from 'react';
import CellNewBtn from './cell-new-btn.jsx';
import CellRemoveBtn from './cell-remove-btn.jsx';
import CellImage from './cell-image.jsx';
import CellLabel from './cell-label.jsx';
import CellRadio from './cell-radio.jsx';

export default class QuestionTableLegend extends Component {

  render() {
    return (
      <table className="questions-table table-legend">
        <tbody>
          <tr>
            <CellNewBtn />
            <td><Dash />Add new table row/column</td>
          </tr>
          <tr>
            <CellRemoveBtn />
            <td><Dash />Remove table row/column</td>
          </tr>
          <tr>
            <CellImage />
            <td><Dash />Add image to table row/column</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Dash extends Component {
  render() {
    return <span className="legend-dash">-</span>;
  }
}

QuestionTableLegend.propTypes = {
}
