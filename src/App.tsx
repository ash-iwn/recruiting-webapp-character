import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Character from './components/Character';
import React, {Component} from 'react';


function App() {
  const [num, setNum] = useState<number>(0);
  const [characterList, setCharacterList] = useState([]);
  let characterCount = 0;

  const containerStyle = {
    border: 'solid'
  }

 

  const onAddCharacter = (event) => {
    setNum(num+1);
    setCharacterList(characterList.concat(<Character key={num+1} id={num+1} ></Character>))
  }
  
  return (
    <div className="App">
     
      <section className="App-section">
        <div>
          <button onClick={onAddCharacter} >Add New Character</button>
          <button>Reset All Characters</button>
          <button>Save All Characters</button>
        </div>

        <div className="container">
          <h1>Skill Check Results</h1>
          <ul className="list-group">
            <li key="1" className="list-group-item">Character: </li>
            <li key="2"  className="list-group-item">Skill: </li>
            <li key="3" className="list-group-item">You Rolled: </li>
            <li key="4" className="list-group-item">The DC was: </li>
            <li key="5" className="list-group-item">Result: </li>
          </ul>
        </div>

        <div className="container">
          {characterList}
         
        </div>
      </section>

    </div>
  );
}

export default App;
