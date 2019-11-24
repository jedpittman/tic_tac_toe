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

/*
class Square extends React.Component {
    
    Note

    In JavaScript classes, you need to always call super when defining
    the constructor of a subclass. All React component classes that
    have a constructor should start it with a super(props) call.
    
    render() {
        //pass in a name-value pair (the actual value of the this.state)
      return (
        <button className="square" 
        onClick={() => this.props.onClick()}
        style={this.props.mcolor}
        >
          {this.props.x123value}
        </button>
      );
    }
  }
  */

  class Board extends React.Component {
    //We can use any normal variable name here. 
    //That is part of this.props of the component.
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xMovesNext: true,
        };
    }

    renderSquare(i) {
        let mcol = ""
        if (this.state.squares[i] === 'X')
        mcol = {'background-color':'yellow','color':'red'}
        else if (this.state.squares[i] === 'O')
        mcol = {'background-color':'lightblue','color':'black'}
        else 
        mcol = {'background-color':'gray'}
        
        return (
            <Square
              x123value={this.state.squares[i]}
              mcolor = {mcol}
              onClick={() => this.handleClick(i)}
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
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xMovesNext ? 'X' : 'O');
        }
      
        return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
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