import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    /*
    Note

    In JavaScript classes, you need to always call super when defining
    the constructor of a subclass. All React component classes that
    have a constructor should start it with a super(props) call.
    */
    
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
  
  class Board extends React.Component {
    //We can use any normal variable name here. 
    //That is part of this.props of the component.
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        return (
            <Square
              x123value={this.state.squares[i]}
              mcolor = {this.state.squares[i] === 'X' ? {'background-color':'yellow'} : {'background-color':'gray'}}
              onClick={() => this.handleClick(i)}
            />
          );
    }
  
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (squares[i] === 'X')
        { squares[i] = 'Y'}
        else
        {squares[i] = 'X';}
        this.setState({squares: squares});
      }

    render() {
      const status = 'Next player: X';
  
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );  