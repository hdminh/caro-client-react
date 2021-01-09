import React  from 'react';
import Square from './Square'

function Board(props)  {
    function renderSquare(i) {
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
          highlight={props.winLine && props.winLine.includes(i)}
        />
      );
    }
    
      // Use two loops to make the squares
      let squares = [];
      for(let i=0; i<20; ++i) {
        let row = [];
        for(let j=0; j<20; ++j) {
          row.push(renderSquare(i * 20 + j));
        }
        squares.push(<div key={i} className="board-row">{row}</div>);
      }
  
      
    return(
      <div>{squares}</div>
    );
  }
export default Board;
