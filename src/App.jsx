import React from 'react'
import Dice from './components/Dice'
import Scorecard from './components/Scorecard'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)


export default function App() {

  const [dice, setDice] = React.useState(newDiceValues())
  const [tenzies, setTenzies] = React.useState(false)
  const [rollCount, setRollCount] = React.useState(0)
  let [rollRecord, setRollRecord] = React.useState()
  
  React.useEffect(()=>{
    let total = 0
    if(!dice.find(die => die.isHeld === false)){
      for(let i=0; i<10; i++)
      {
        total+=dice[i].value
      }
      if(total/10 === dice[0].value){
        setTenzies(true)
      }
    }

  }, [dice])

  React.useEffect(()=>{    
    let record = JSON.parse(localStorage.getItem("roll-record"))

    //setting the localstorage for first time
    if(record === null){
      localStorage.setItem("roll-record", JSON.stringify("Set it!"))
      setRollRecord("Set it!")
    }
    else{
        setRollRecord(record)  //retriving the existing record
    }
  }, [])

  React.useEffect(()=>{
    
    //if it is the first record Or if the roll count is not zero and roll count is less than record
    if(rollRecord === "Set it!" || rollCount && (rollCount < rollRecord))
    {
      localStorage.setItem("roll-record", JSON.stringify(rollCount))
      setRollRecord(JSON.parse(localStorage.getItem("roll-record")))
    }
    setRollCount(0)
    
  }, [tenzies])

 
  

  function newDiceValues(){
    const dice_values = []
    for(let i=0; i<10; i++){
      dice_values.push(
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        })
    }

    return dice_values
  }

  function rollDice(){
    if(tenzies === true)
    {
      setDice(oldDice => oldDice.map(
        die => {
        return {...die, isHeld:!die.isHeld, value:Math.ceil(Math.random() * 6)}
         }                   
      ))
      setTenzies(false)
    }
    else {
      setDice(oldDice => oldDice.map(
        die =>  die.isHeld? {...die} : {...die, value:Math.ceil(Math.random() * 6)}                    
      ))
      setRollCount(prevState => prevState + 1)
    }
   
  }

  function holdDice(id){
    setDice(prevState => prevState.map(
      die=>{
        if(die.id === id){
          return {...die, isHeld: !die.isHeld}
        }
        return die
      }))
  }

  const dice_elements = dice.map(
    die => <Dice 
              key={die.id} 
              {...die}
              holdDice = {holdDice}/>
    )


  return (
    <main>
      {tenzies && <Confetti width={screen.width} height={screen.height}/>}
      <div className='game'>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-collection">
          {dice_elements}
        </div>
        <button className="roll-button" onClick={rollDice}>
          {tenzies? "New Game" : "Roll"}
        </button>
      </div>
      <Scorecard rollCount={rollCount} rollRecord={rollRecord}/>
    </main>
  )
}


