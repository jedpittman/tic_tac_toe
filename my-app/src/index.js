import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
      <button className="square" onClick={props.onClick} 
      style={props.mcolor}
      >
          {props.x123value}
      </button>  
    );
}


  class Board extends React.Component {
    renderSquare(i) {
        let mcol = ""
        if (this.props.squares[i] === 'X')
        mcol = {'background-color':'yellow','color':'red'}
        else if (this.props.squares[i] === 'O')
        mcol = {'background-color':'lightblue','color':'black'}
        else 
        mcol = {'background-color':'gray'}
        
        return (
            <Square
              x123value={this.props.squares[i]}
              mcolor = {mcol}
              onClick={() => this.props.onClick(i)}
            />
          );
    }
  
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xMovesNext ? 'X' : 'O';

        this.setState({
            squares: squares,
            xMovesNext: !this.state.xMovesNext,
        });
      }

    render() {
        return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          xMovesNext: true,
        };
      }

      handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xMovesNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          xMovesNext: !this.state.xMovesNext,
        });
      }
    
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let xstatus;
        if (winner) {
            xstatus = 'Winner: ' + winner;
        } else {
            xstatus = 'Next player: ' + (this.state.xMovesNext ? 'X' : 'O');
        }

      return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{xstatus}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
      }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );  