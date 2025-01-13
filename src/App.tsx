import { useRef, useState } from 'react';

import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Character from './components/Character';
import React, {Component} from 'react';



export interface CheckResults { 
  character: number,
  skill: string,
  roll: number,
  dc: number,
  result: string
}


const App = () => {
  const [num, setNum] = useState<number>(0);
  const [characterList, setCharacterList] = useState([]);
  const [exportedList, setExportedList] = useState([]);

  const childRef = useRef();

  const [checkResultState, setCheckResultState] = useState<CheckResults>({
    character: null,
    skill: null,
    roll: null,
    dc: null,
    result: null
  });

  let characterCount = 0;

  const containerStyle = {
    border: 'solid'
  }

  function saveAllCharacters() {
    

    let exportList = []


    characterList.forEach(character => {
      exportList.push(character.ref.current.export());
    })


    console.log(exportList);


    console.log(JSON.stringify(exportList));
    
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{ash-iwn}/character', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportList)
      })
  }


 

  function onAddCharacter(event) {
    setNum(num+1);
    setCharacterList(characterList.concat(<Character key={num+1} id={num+1} checkResult={setCheckResultState} ref={childRef}></Character>))
  }
  
  return (
    <div className="App">
     
      <section className="App-section">
        <div>
          <button onClick={onAddCharacter} >Add New Character</button>
          <button>Reset All Characters</button>
          <button onClick={saveAllCharacters}>Save All Characters</button>
        </div>

        <div className="container">
          <h1>Skill Check Results</h1>
          <ul className="list-group">
            <li key="1" className="list-group-item">Character: <span defaultValue={checkResultState.character}>{checkResultState.character}</span></li>
            <li key="2"  className="list-group-item">Skill: <span defaultValue={checkResultState.skill}></span>{checkResultState.skill} </li>
            <li key="3" className="list-group-item">You Rolled: <span defaultValue={checkResultState.roll}></span>{checkResultState.roll} </li>
            <li key="4" className="list-group-item">The DC was: <span defaultValue={checkResultState.dc}></span>{checkResultState.dc} </li>
            <li key="5" className="list-group-item">Result: <span defaultValue={checkResultState.result}></span>{checkResultState.result} </li>
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
