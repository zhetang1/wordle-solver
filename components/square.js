import React from 'react';
import utilStyles from '../styles/utils.module.css'

export default class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      items: [],
      status: "",
    }
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleClick() {
    var items = this.state.items;
    var status = this.state.status;

    switch (status) {
        case "":
            status = "no hit";
            break;
        case "no hit":
            status = "wrong position";
            break;
        case "wrong position":
            status = "hit";
            break;
        case "hit":
            status = "";
            break;
        default:
            alert('Default case');
    }

    this.setState({
      items: items,
      message: "",
      status: status
    });

    if (this.props.onChange) {
      this.props.onChange({status: status, char: this.props.char, position: this.props.position});
    }
  }

  render() {
    var btn_class = utilStyles.square;

    switch (this.state.status)
    {
        case "":
            btn_class = utilStyles.square;
            break;
        case "no hit":
            btn_class = utilStyles.squareNoHit;
            break;
        case "wrong position":
            btn_class = utilStyles.squareWrongPosition;
            break;
        case "hit":
            btn_class = utilStyles.squareHit;
            break;
        default:
            alert('Default case');
    }

    return (
        <div>
          <button className={btn_class}
            onClick={() => this.handleClick()}
          >
            <span className={utilStyles.text}>{this.props.char}</span>
          </button>
        </div>
    );
  }
}