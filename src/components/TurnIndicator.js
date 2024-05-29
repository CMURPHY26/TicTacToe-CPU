import React from "react";
import { ReactComponent as XIcon } from '../images/icon-x.svg'
import { ReactComponent as OIcon } from '../images/icon-o.svg'

const TurnIndicator = ({ activePlayer }) => {
  return (
    <div className="board__turn-indicator">
      {activePlayer === "X" ?
        <XIcon />
      :
       <OIcon />
      }
      <h4>Turn</h4>
    </div>
  )
}

export default TurnIndicator;
