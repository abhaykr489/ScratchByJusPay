import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";

console.log("inside sprit Clicked");
const SpritClicked = ({ comp_id }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      const elementsBelow = document.querySelectorAll(`#${comp_id} ~ .workspace-element`);
      
      // Add a class to prevent further automatic click triggering
      elementsBelow.forEach((element) => {
        element.classList.add('clicked-sprit');
      });
    }
  };


  return (
    <Paper elevation={2}>
      <div className="rounded text-center bg-yellow-400 p-2 my-3" onClick={handleClick}>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">whenSpritClicked</div>
        </div>
      </div>
    </Paper>
  );
};

export default SpritClicked;
