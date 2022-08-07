import React, { useState } from 'react';

const board = new Array(8).fill(0).map(() => new Array(8).fill(0));
let selectedPieceId: string = '';
let turn = 0;

/*
interface gameStateObj {
  selectedPiece: string;
}


declare global {
  interface Window {
    gameState: gameStateObj;
  }
}

window.gameState = window.gameState || {};
*/

//interface Checker {
//  readonly prop: string;
//}


const clickWhitePiece = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (turn % 2 === 1) {
    deselectAll();
    const e: {[index: string]:any} = event.target
    //  console.log(e['id']);
    const piece = document.querySelector<HTMLElement>(`#${e['id']}`); // redundant, fix later
    piece!.style['border'] = '2px groove blue';
    //  window.gameState.selectedPiece = e['id'];
    selectedPieceId = e['id'];
  }
}

const clickBlackPiece = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (turn % 2 === 0) {
    deselectAll();
    const e: {[index: string]:any} = event.target
    //  console.log(e['id']);
    const piece = document.querySelector<HTMLElement>(`#${e['id']}`); // redundant, fix later
    piece!.style['border'] = '2px groove blue';
    //  window.gameState.selectedPiece = e['id'];
    selectedPieceId = e['id'];
  }
}

const clickDarkTile = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  event.stopPropagation();
  //console.dir(event);
  let e: {[index: string]:any} = event.target;
  if (e.classList.contains('circle')) e = e.parentElement;
  //console.log(e['id']);
  const tile = document.querySelector<HTMLElement>(`#${e['id']}`); // redundant, fix later
  if (selectedPieceId !== '') {
    if (tile?.childNodes.length === 0) {
      const piece = document.querySelector<HTMLElement>(`#${selectedPieceId}`)
      tile!.appendChild(piece as Node);
      deselectAll();
      turn++;
    }
  }
//  const p7 = document.querySelector<HTMLElement>(`#player_two_7`);
//  tile!.appendChild(p7 as Node);
  
}

const deselectAll = () => {
  //const allPieces = document.querySelectorAll('.circle').style['border'] = '0px groove blue';
  const allPieces = document.querySelectorAll<HTMLElement>('.circle');
//  allPieces.forEach.style['border'] = '0px groove blue';
//  Array.from(allPieces).forEach( (e as HTMLElement) => {e!.style['border'] = '0px groove blue'});
  allPieces.forEach( (e) => {e!.style['border'] = '0px groove blue'});
  selectedPieceId = ''
}

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
        cells.push(<div id={tileKey} key={tileKey} className="tile darkTile" onClick={clickDarkTile}><div id={pieceKey} key={pieceKey} className="circle whitePiece" onClick={clickWhitePiece} /></div>);
        pc++;
      } else if (row >= 6) {
        board[row][col] = 2;
        pieceKey = `player_two_${pc - 8}`;
        cells.push(<div id={tileKey} key={tileKey} className="tile darkTile" onClick={clickDarkTile}><div id={pieceKey} key={pieceKey} className="circle blackPiece" onClick={clickBlackPiece} /></div>);
        pc++;
      } else {
        board[row][col] = 0;
        cells.push(<div id={tileKey} key={tileKey} className="tile darkTile" onClick={clickDarkTile} />);
      }
    } else {
      cells.push(<div id={tileKey} key={tileKey} className="tile lightTile" />);
    }
  };
  return cells;
}


const App = () => {
//  const [count, setCount] = useState(0)
  return (
    <div className="container">
      <div className="box">  
        { initBoard() }
      </div>
    </div>
  );
}

export default App;
