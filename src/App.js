import logo from './logo.svg';
import './styles.css';
import React from 'react';
import Square from './Square';
import TicTacToe from './TicTacToe';
import Game from './Game';

function App() {
  return (
    <>  
      <Game size={4}/>
      <br/>
      <TicTacToe/> 
      <br/>
      <TicTacToe size={4}/> 
      <br/>
      <Square/>
      <br/>
      <Square size={5}/> 
      <br/>
      <Square size={9}/> 
      <br/>
      <Square size={7}/>
    </>
  );
}

export default App;
