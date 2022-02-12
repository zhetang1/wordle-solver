import React from 'react';
import Square from './square'
import utilStyles from '../styles/utils.module.css'

export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
        const testWords = ["audio"];
        import(/*webpackIgnore: true*/ 'https://assets.codepen.io/1581715/fivewords.js')
            .then( result => {
                     const state = {
                       items: [
                         ["", "", "", "", ""],
                         ["", "", "", "", ""],
                         ["", "", "", "", ""],
                         ["", "", "", "", ""],
                         ["", "", "", "", ""],
                         ["", "", "", "", ""],
                       ],
                       row: 0,
                       column: 0,
//                       allWords: testWords, filteredWords: testWords,
                       allWords: result.allWords, filteredWords: result.allWords,
                       filters: []
                     };
                     this.setState(state);
                  }, function(error) {
                     console.log(error);
                  });
  }

  handleClick(char) {
    var items = this.state.items;
    var row = this.state.row
    var column = this.state.column

    items[row][column] = char;

    if (column < 5) {
        column++;
    }

    this.setState({
        items: items,
        row: row,
        column: column
    });
  }

  handleEnterClick() {
    var row = this.state.row;
    var column = this.state.column;

    if (row < 5 && column == 5) {
        row++;
        this.setState({
          items: this.state.items,
          row: row,
          column: 0
        });
    }
  }

    handleDelClick() {
        var items = this.state.items;
        var row = this.state.row
        var column = this.state.column

        if (column > 0) {
            column--;
        }

        items[row][column] = "";

        this.setState({
            items: items,
            row: row,
            column: column
        });
    }

    filterWords(status, char, position) {
        const state = this.state;
        const filters = state.filters;
        // filters: [{char: "A", status: "hit}, {char: "B", status: "no hit"}, {char: "C", status: "wrong position"}]

        filters[position] = {char: char, status: status};
        const words = [];

        this.state.allWords.map( word => {
            let include = true;

            for (var i=0; i<filters.length; i++) {
                const c = filters[i].char.toLowerCase();
                const p = i % 5;

                switch (filters[i].status){
                    case "":
                        break;
                    case "no hit":
                        if (word.includes(c)) include = false;
                        break;
                    case "wrong position":
                        if (!word.includes(c)) include = false;
                        if (word[p] === c) include = false;
                        break;
                    case "hit":
                        if (word[p] !== c) include = false;
                        break;
                    default:
                        alert('Default case');
                }
            }

            if (include) words.push(word);
        });

        state.filters = filters;
        state.filteredWords = words;
        this.setState(state);
    }

    renderRows() {
        const eventHandler = ({status, char, position}) => {
            this.filterWords(status, char, position);
        }

        return this.state.items.map(function(o, i) {
            return (
                <tr key={"row-" + i}>
                    <td key="column-0">
                        <Square char={o[0]} onChange={eventHandler} position={i*5 + 0} />
                    </td>
                    <td key="column-1">
                        <Square char={o[1]} onChange={eventHandler} position={i*5 + 1} />
                    </td>
                    <td key="column-2">
                        <Square char={o[2]} onChange={eventHandler} position={i*5 + 2} />
                    </td>
                    <td key="column-3">
                        <Square char={o[3]} onChange={eventHandler} position={i*5 + 3} />
                    </td>
                    <td key="column-4">
                        <Square char={o[4]} onChange={eventHandler} position={i*5 + 4} />
                    </td>
                </tr>
            );
        });
    }

  renderWords() {
    return this.state.filteredWords.map(function(o, i) {
        return (
            <p key={o}>{o}</p>
        );
    });
  }

  render() {
    if (!this.state) return  (<span>Loading...</span>);

    return (
      <div>
        <table className="">
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <table className="">
          <tbody>
            <tr key="button row 1">
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("Q")}
                    >
                      Q
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("W")}
                    >
                      W
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("E")}
                    >
                      E
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("R")}
                    >
                      R
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("T")}
                    >
                      T
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("Y")}
                    >
                      Y
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("U")}
                    >
                      U
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("I")}
                    >
                      I
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("O")}
                    >
                      O
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("P")}
                    >
                      P
                    </button>
                </td>
            </tr>
            <tr key="button row 2">
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("A")}
                    >
                      A
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("S")}
                    >
                      S
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("D")}
                    >
                      D
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("F")}
                    >
                      F
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("G")}
                    >
                      G
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("H")}
                    >
                      H
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("J")}
                    >
                      J
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("K")}
                    >
                      K
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("L")}
                    >
                      L
                    </button>
                </td>
            </tr>
            <tr key="button row 3">
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleEnterClick()}
                    >
                      #
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("Z")}
                    >
                      Z
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("X")}
                    >
                      X
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("C")}
                    >
                      C
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("V")}
                    >
                      V
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("B")}
                    >
                      B
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("J")}
                    >
                      J
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("N")}
                    >
                      N
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleClick("M")}
                    >
                      M
                    </button>
                </td>
                <td>
                    <button className={utilStyles.charButton}
                      onClick={() => this.handleDelClick()}
                    >
                      DEL
                    </button>
                </td>
            </tr>
          </tbody>
        </table>
        {this.renderWords()}
      </div>
    );
  }
}