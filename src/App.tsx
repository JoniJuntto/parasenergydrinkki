import { useState } from 'react'
import './App.css'
import drinks from './drinks.json'
import logo from './logo.png'
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

type Drink = {
  name: string
  pic: string
}

function App({ signOut }) {

  const [drink1, setDrink1] = useState<Drink>(drinks[0])
  const [drink2, setDrink2] = useState<Drink>(drinks[1])
  const [remainingDrinks, setRemainingDrinks] = useState<Drink[]>(drinks)

  const pickWinner = (winner: number) => {
    if(remainingDrinks.length === 1) {
      if(winner === 1) {
        alert(`You picked ${drink1.name}!`)
      } else {
        alert(`You picked ${drink2.name}!`)
      }
      return
    }
    //remove the  loser from the array
    if(winner === 1) {
      setRemainingDrinks(remainingDrinks.filter((d) => d.name !== drink2.name))
      setDrink2(remainingDrinks[Math.floor(Math.random() * remainingDrinks.length)])
    } else if (winner === 2){
      setRemainingDrinks(remainingDrinks.filter((d) => d.name !== drink1.name))
      setDrink1(remainingDrinks[Math.floor(Math.random() * remainingDrinks.length)])
    }
  }

  return (
    <div style={{
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }}>
      <img src={logo} alt="logo" />
      <h1>Remaining drinks{remainingDrinks.length}</h1>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        

        <div onClick={()=>pickWinner(1)}>
          <img src={drink1.pic} alt={drink1.name} />
          <h2>{drink1.name}</h2>
        </div>
        <div onClick={()=>pickWinner(2)}>
          <img src={drink2.pic} alt={drink2.name} />
          <h2>{drink2.name}</h2>
        </div>
      </div>
      <Button onClick={signOut}>Sign Out</Button>
  </div>
  )
}

export default withAuthenticator(App);

