import React, { Component, PropTypes } from 'react';
import QuestionsTable from './questions-table.jsx';
import QuestionSummary from './question-summary.jsx';
import QuestionTableLegend from './question-table-legend.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionTitle: "Question title",
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
    this.onImageChange = this.onImageChange.bind(this);
    this.onQuestionTitleChange = this.onQuestionTitleChange.bind(this);
  }

  onInsertRow() {
    const state = this.state;
    state.rows.push({
      label: "row" + (state.rows.length + 1),
      image: "",
      cells: Array(state.cols.length).fill(false)
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

  onImageChange(event, row, col) {
    const file = event.target.files[0];
    if (!file || !file.type.match(/^image\/\w*/)) return;

    const reader = new FileReader();
    reader.onload = () => {
      const state = this.state;
      if (row || row === 0) {
        state.rows[row].image = reader.result;
        this.setState(state);
      } else if (col || col === 0) {
        state.cols[col].image = reader.result;
        this.setState(state);
      }
    }
    reader.readAsDataURL(file);
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

  onQuestionTitleChange(event) {
    this.setState({ questionTitle: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Question editor</h1>
          <hr />
          <div className="col-sm-6">
            <div className="text-center">
              <h2>Question Edition View</h2>
            </div>
            <input
              type="text"
              className="question-title"
              onChange={ this.onQuestionTitleChange }
              value={ this.state.questionTitle } />
            <QuestionsTable
              rows={ this.state.rows }
              cols={ this.state.cols }
              onCellChange={ this.onCellChange }
              onLabelChange={ this.onLabelChange }
              onImageChange={ this.onImageChange }
              onInsertRow={ this.onInsertRow }
              onInsertCol={ this.onInsertCol }
              onRemoveClick={ this.onRemoveClick } />
          </div>
          <div className="col-sm-6">
            <div className="text-center">
              <h2>Question Summary View</h2>
            </div>
            <QuestionSummary
              rows={ this.state.rows }
              cols={ this.state.cols } />
            <div className="col-split hidden-xs"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h3>Legend</h3>
            <QuestionTableLegend />
          </div>
          <div className="col-sm-6">
            <h3>Notes</h3>
            <p><i>Italic</i> text is editable</p>
          </div>
        </div>
      </div>
    );
  }
}
