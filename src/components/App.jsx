import Die from "./Die.jsx"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  // Lazy Initialization 
  const [dice, setDice] = useState(() => generateAllNewDice())
  const restartGameButton = useRef(null)
  //Determine if a game is won if all dice are held and all dice have the same value. 
  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  //Automatically focus on the new game button when the game is won so user can just press enter to start new game. 
  useEffect(()=> {
    restartGameButton.current.focus()
  }, [gameWon])

  // generates a number 1-6 inclusive. 
  function generateRandRoll() {
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
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }
    ))
  }

  function rollDice() {
    if(!gameWon){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : { ...die, value: generateRandRoll() }
      }))
    } else {
      setDice(generateAllNewDice())
    }
  }

  const dieComponents = dice.map(dieObj => (
    <Die value={dieObj.value}
      isHeld={dieObj.isHeld}
      key={dieObj.id}
      hold={hold}
      id={dieObj.id} />
  ))

  return (
    <>
      <main>
        <div aria-live = "polite" className="sr-only">
          {gameWon && <p> Congratulations you won!</p>}
        </div>
        <h2 className="game-title"> Tenzies </h2>
        <p className="game-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {/* Rendering 10 Dice */}
        <div className="all-dice-container">
          {dieComponents}
        </div>

        <button className="roll" onClick={rollDice} ref= {restartGameButton}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>


      {gameWon ?
        <Confetti />
        : null}

    </>
  )
}

