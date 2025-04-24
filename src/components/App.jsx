import Die from "./Die.jsx"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {
  const [die, setDice] = useState(generateAllNewDice)
  
  // generates a number 1-6 inclusive. 
  function generateRandRoll(){
    return Math.floor(Math.random() * 6) + 1
  }

  function generateAllNewDice() {
    let initDice = []
    for (let i = 0; i < 10; i++) {
      initDice.push({
        value: generateRandRoll(),
        isHeld: false,
        id: nanoid()
      })
    }
    return initDice
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }
    ))
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : {...die, value: generateRandRoll()}
    }))
  }

  const dieComponents = die.map(dieObj => (
    <Die value={dieObj.value}
      isHeld={dieObj.isHeld}
      key={dieObj.id}
      hold={hold}
      id={dieObj.id} />
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

        <button className="roll" onClick={rollDice}> Roll </button>
      </main>
    </>
  )

}

