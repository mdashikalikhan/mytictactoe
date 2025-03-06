import logo from './logo.svg';
import './styles.css';
import React from 'react';
import Square from './Square';

function App() {
  return (
    <>  
      <Square/>
      <br/>
      <Square size={5}/> 
      <br/>
      <Square size={9}/> 
    </>
  );
}

export default App;
