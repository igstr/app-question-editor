import React, { Component, PropTypes } from 'react';
import QuestionsTable from './questions-table.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        {
          label: "row1",
          image: "",
          cells: [ true, false, false, false ]
        },
        {
          label: "row2",
          image: "",
          cells: [ false, true, false, false ]
        },
        {
          label: "row3",
          image: "",
          cells: [ false, false, true, false ]
        },
        {
          label: "row4",
          image: "",
          cells: [ false, false, false, true ]
        },
      ],
      cols: [
        {
          label: "col1",
          image: ""
        },
        {
          label: "col2",
          image: ""
        },
        {
          label: "col3",
          image: ""
        },
        {
          label: "col4",
          image: ""
        }
      ]
    }

    this.onCellChange = this.onCellChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onInsertRow = this.onInsertRow.bind(this);
    this.onInsertCol = this.onInsertCol.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onInsertRow() {
    const state = this.state;
    state.rows.push({
      label: "row" + (state.rows.length + 1),
      image: "",
      cells: Array(state.rows[0].cells.length).fill(false)
    });
    this.setState(state);
  }

  onInsertCol() {
    const state = this.state;
    state.cols.push({
      label: "col" + (state.cols.length + 1),
      image: "",
    });
    const l = state.rows.length;
    for (let i = 0; i < l; i++) {
      state.rows[i].cells.push(false);
    }
    this.setState(state);
  }

  onCellChange(row, col) {
    const rows = this.state.rows;
    rows[row].cells[col] = !rows[row].cells[col];
    this.setState({ rows });
  }

  onLabelChange(row, col, value) {
    const state = this.state;
    if (col || col === 0) {
      state.cols[col].label = value;
    } else if (row || row === 0) {
      state.rows[row].label = value;
    }
    this.setState(state);
  }

  onImageClick(row, col) {
    console.log(row, col);
  }

  onRemoveClick(row, col) {
    const state = this.state;
    if (col || col === 0) {
      state.cols.splice(col, 1);
      const l = state.rows.length;
      for (let i = 0; i < l; i++) {
        state.rows[i].cells.splice(col, 1);
      }
    } else if (row || row === 0) {
      state.rows.splice(row, 1);
    }
    this.setState(state);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Question editor</h1>
          <hr />
          <div className="col-sm-6 text-center">
            <h2>Question Edition View</h2>
            <QuestionsTable
              rows={ this.state.rows }
              cols={ this.state.cols }
              onCellChange={ this.onCellChange }
              onLabelChange={ this.onLabelChange }
              onImageClick={ this.onImageClick }
              onInsertRow={ this.onInsertRow }
              onInsertCol={ this.onInsertCol }
              onRemoveClick={ this.onRemoveClick } />
          </div>
          <div className="col-sm-6 text-center">
            <h2>Question Summary View</h2>
          </div>
        </div>
      </div>
    );
  }
}
