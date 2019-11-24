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
          stepNumber: 0,
        };
      }

      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xMovesNext: (step % 2) === 0,
        });
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xMovesNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xMovesNext: !this.state.xMovesNext,
        });
      }
    
    
      render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        const nummoves = isNaN(history.length) ? 0 : history.length
    
        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
    
        let xstatus;
        if (winner) {
          xstatus = 'Move # '+ nummoves + ', Winner: ' + winner;
        } else {
          xstatus = 'Move # '+ nummoves + ', Next player: ' + (this.state.xMovesNext ? 'X' : 'O');
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
              <ol>{moves}</ol>
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