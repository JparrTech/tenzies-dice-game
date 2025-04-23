import Die from "./Die.jsx"
import { useState } from "react"

export default function App() {
  function generateAllNewDice(){
    let dieValues = []
    for(let i = 0; i < 10; i++){
      dieValues[i] = Math.floor(Math.random() * 6) + 1
    }
    return dieValues
  } 

  const [die, setDice] = useState(generateAllNewDice)

  function rollDice (){
    setDice(generateAllNewDice)
  }
  const dieComponents = die.map(dieVal => (
    <Die value = {dieVal} />
  ))

  return (
    <>
      <main>
        <h2 className="game-title" > Tenzies </h2>
        <p className="game-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {/* Rendering 10 Dice */}
        <div className="all-dice-container">
          {dieComponents}
        </div>
        <button className= "roll" onClick = {rollDice}> Roll </button>
      </main>
    </>
  )

}

