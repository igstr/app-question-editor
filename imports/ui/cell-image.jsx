import React, { Component, PropTypes } from 'react';

export default class CellImage extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event, this.props.row, this.props.col);
  }

  render() {
    const props = this.props;
    const labelStyle = props.image ? { backgroundImage: "url(" + props.image + ")" } : { };
    const labelClass = props.image ? "btn image-uploaded" : "btn";
    const input = props.onChange ?
      <input
        type="file"
        accept="image/*"
        onChange={this.onChange} />:
      null;

    return (
      <td className="cell-image">
        <label
          className={labelClass}
          style={labelStyle} >
          <i className="fa fa-plus" aria-hidden="true"></i>
          {input}
        </label>
      </td>
    );
  }
}

CellImage.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  image: PropTypes.string,
  onChange: PropTypes.func
};

