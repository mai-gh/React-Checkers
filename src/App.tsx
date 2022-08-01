import React from 'react';

const board = new Array(8).fill(0).map(() => new Array(8).fill(0));

const initBoard = () => {
  const cells = [];
  let colorTile = false;
  let tileKey = '';
  let pieceKey = '';
  for (let i = 0, row = 0, col = 0, pc = 0; i < 64; i++, col++) {
    if (col  >= 8) {
      colorTile = !colorTile;
      col = 0;
      row++;
    }
    colorTile = !colorTile;
    tileKey = `tile_${i}`;
    if (colorTile) {
      if (row < 2) {
        board[row][col] = 1;
        pieceKey = `player_one_${pc}`;
        cells.push(<div key={tileKey} className="tile darkTile"> <div key={pieceKey} className="circle whitePiece" /> </div>);
        pc++;
      } else if (row >= 6) {
        board[row][col] = 2;
        pieceKey = `player_two_${pc - 8}`;
        cells.push(<div key={tileKey} className="tile darkTile"> <div key={pieceKey} className="circle blackPiece" /> </div>);
        pc++;
      } else {
        board[row][col] = 0;
        cells.push(<div key={tileKey} className="tile darkTile" />);
      }
    } else {
      cells.push(<div key={tileKey} className="tile lightTile" />);
    }
  };
  return cells;
}


const App = () => {
  return (
    <div className="container">
      <div className="box">  
        { initBoard() }
      </div>
    </div>
  );
}

export default App;
