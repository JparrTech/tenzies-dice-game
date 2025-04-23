import Die from "./Die.jsx"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {
  const [die, setDice] = useState(generateAllNewDice)

  function generateAllNewDice() {
    let initDice = []

    for (let i = 0; i < 10; i++) {
      initDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: true,
        id: nanoid()
      })
    }

    return initDice
  }
  function hold(id) {
    console.log(id)
  }

  function rollDice() {
    setDice(generateAllNewDice)
  }
  const dieComponents = die.map(dieObj => (
    <Die value={dieObj.value} isHeld={dieObj.isHeld} key={dieObj.id} hold={hold} id={dieObj.id} />
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

