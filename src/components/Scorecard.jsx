import React from "react";


export default function Scorecard(props){
    return (
        <div className="score-card">
           <div className="chumma">
                <span> Roll count</span>
                <div className="roll-count">{props.rollCount}</div>
           </div>
           <div className="chumma">
                <span>Roll record</span>
                <div className="roll-record">{props.rollRecord}</div>
                {console.log(props)}
           </div>
        </div>
    )
}