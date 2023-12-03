import React from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import Paper from "@material-ui/core/Paper";
import { addList } from "../redux/midarea/actions";

function MidArea({ area_list, event_values }) {
  
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };
  
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let repeat = 1;
    let isPaused = false;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    var cnt = setInterval(() => {
      if (isPaused) return; // If paused, don't proceed with event firing

      if (i === arr.length) {
        clearInterval(cnt);
        return;
      }
    
     
      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();


        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
     // handle spritClicked case
     if (arr[i] === "spritClicked") {
     // setIsPaused(true); // Pause the automatic firing
      return; // Exit the interval until manually resumed
    }
    }, 2000);
  };

  return (
    <div className="flex-1 h-full overflow-auto p-3">
    <div className="flex justify-between items-center">
      <div
        onClick={() => handleClick(area_list.midAreaLists[0].comps, area_list.midAreaLists[0].id)}
        className="cursor-pointer flex items-center justify-center w-auto mb-5 bg-purple-500 text-white rounded-md p-2"
      >
        <img
          src="/run.png"
          alt="Run Icon"
          className="h-6 w-6 mr-2"
        />
        <span className="text-lg font-semibold">Run</span>
      </div>
      <div className="font-bold mb-5 border-r border-gray-200 bg-green-500 text-right text-pink rounded-md p-2 w-auto">
        Workspace
      </div>
    </div>
    <Paper elevation={2} className="p-4 mt-4">
      {area_list.midAreaLists.map((l) => (
        <Droppable droppableId={l.id} type="COMPONENTS">
        {(provided) => {
          return (
            <ul
              className={`${l.id} w-48 h-full`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {l.comps &&
                l.comps.map((x, i) => {
                  let str = `${x}`;
                  let component_id = `comp${str}-${l.id}-${i}`;

                  return (
                    <Draggable
                      key={`${str}-${l.id}-${i}`}
                      draggableId={`${str}-${l.id}-${i}`}
                      index={i}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {getComponent(str, component_id)}
                          {provided.placeholder}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </ul>
          );
        }}
        </Droppable>  
      ))}
    </Paper>
    </div>
  );
  
} 
// mapStateToProps and mapDispatchToProps remain the same
// ...

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
    event_values: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
