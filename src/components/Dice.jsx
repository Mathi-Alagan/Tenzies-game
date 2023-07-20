import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Dice(props){
    let number = ''

    switch(props.value){
        case 1:
            number = "fa-solid fa-dice-one"
            break;
        case 2:
            number = "fa-solid fa-dice-two"
            break;
        case 3:
            number = "fa-solid fa-dice-three"
            break;
        case 4:
            number = "fa-solid fa-dice-four"
            break;
        case 5:
            number = "fa-solid fa-dice-five"
            break;
        case 6:
            number = "fa-solid fa-dice-six"
            break;

    }
    return(
        <div 
            className={props.isHeld?"dice dice-held": "dice"} 
            onClick={ ()=>props.holdDice(props.id) }>

            <p className="dice-value"><FontAwesomeIcon icon={number} /></p>

        </div>
    )
}