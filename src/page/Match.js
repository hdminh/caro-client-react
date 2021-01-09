import React, { useEffect, useState } from 'react';
import '../App.css';
import Board from '../components/Board';
import {handleClickInMatch} from '../socket/matchSocket';
import {ioClient} from '../socket/index';
import { ContactSupportOutlined } from '@material-ui/icons';
// import  calculateWinner  from '../api/GameService';


function Game(props) {
  const [history, setHistory] = useState([{ squares: Array(400).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [canMove,setCanMove] =useState(true);
  const[oponentMove,setOponentMove]=useState();

  //   function jumpTo(step) {
  //   setStepNumber(step);
  //   setXIsNext((step % 2) === 0);
  // }


  function handleNewMove(i){
    const clickhistory = history.slice(0, stepNumber + 1);
    const current = clickhistory[clickhistory.length - 1];
    const squares = current.squares.slice();
    // console.log(calculateWinner(1 + Math.floor(i / 20),1+ i%20,"X",squares));
    // if (calculateWinner(squares).winner || squares[i]) {
    //   return;
    // }
    squares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    console.log(i);
    console.log(xIsNext);
    setHistory(clickhistory.concat([
      {
        squares: squares,
        latestMoveSquare: i
      }
    ]));
    setStepNumber(clickhistory.length);
  }
  ioClient.off("opponent_move");
  ioClient.on("opponent_move",(data) =>{
    console.log(data);
    // console.log(ioClient);
    // setOponentMove(JSON.stringify(data.i));
    // console.log(oponentMove);
    handleNewMove(JSON.stringify(data.i));
    setCanMove(true);
  })
 

//    useEffect(() => {


      
//  },[])


  const  handleClick= (i) => {
      if(canMove){
      handleClickInMatch(i);
      handleNewMove(i);
        setCanMove(false);
      }
  }

  //move
  const current = history[history.length-1];
//   console.log(current);
//   const squares = current.squares.slice();
//   const moves = history.map((step, move) => {
//     const latestMoveSquare = step.latestMoveSquare;
//     const col = 1 + latestMoveSquare % 20;
//     const row = 1 + Math.floor(latestMoveSquare / 20);
//     const desc = move ?
//       `Go to move #${move} (${col}, ${row})` :
//       'Go to game start';
//     return (
//       <li key={move}>
//         <button className={move === stepNumber ? 'bold-selected-item' : ''}
//           onClick={() => jumpTo(move)}>{desc}</button>
//       </li>
//     );
//   });


  
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          />
          {/* winLine={winStruct.line} /> */}
      </div>
      <div className="game-info">
        {/* <div>{status}</div> */}
        {/* <button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'descending' : 'ascending'}
        </button>
        <ol>{moves}</ol> */}
      </div>
    </div>
  );
}



export default Game;
