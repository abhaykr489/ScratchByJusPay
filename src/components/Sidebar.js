import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";

import {
  motionComponents,
  looksComponents,
  controlComponents,
  eventsComponents,
} from "./SidebarConstants";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200 bg-gray-100">
      <div className="font-bold mb-5 text-center text-pink bg-green-500 rounded-md p-2 w-auto">
        CodeArea
      </div>

      {/* Motion */}
      <div className="font-bold mt-5 bg-blue-500 rounded-md p-2 w-auto">Motion</div>
      <Droppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion mt-3 w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {motionComponents.map((x, i) => (
              <Draggable key={`${x}-sideArea`} draggableId={`${x}-sideArea`} index={i}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="my-2 px-2 py-1 bg-white rounded-md shadow-md cursor-pointer w-full"
                  >
                    {getComponent(x)}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {/* Looks */}
      <div className="font-bold mt-5 rounded-md p-2 w-auto bg-purple-500">Looks</div>
      <Droppable droppableId="sideArea-looks" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-looks mt-3 w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {looksComponents.map((x, i) => (
              <Draggable key={`${x}-sideArea`} draggableId={`${x}-sideArea`} index={i}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="my-2 px-2 py-1 bg-white rounded-md shadow-md cursor-pointer w-full"
                  >
                    {getComponent(x)}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {/* Control */}
      <div className="font-bold mt-5 rounded-md p-2 w-auto bg-red-400">Control</div>
      <Droppable droppableId="sideArea-control" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-control mt-3 w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {controlComponents.map((x, i) => (
              <Draggable key={`${x}-sideArea`} draggableId={`${x}-sideArea`} index={i}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="my-2 px-2 py-1 bg-white rounded-md shadow-md cursor-pointer w-full"
                  >
                    {getComponent(x)}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {/* Events */}
      
      <div className="font-bold mt-5 rounded-md p-2 w-auto bg-yellow-400">Events </div>      
      <Droppable droppableId="sideArea-events" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-events mt-3 w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {eventsComponents.map((x, i) => (
              <Draggable key={`${x}-sideArea`} draggableId={`${x}-sideArea`} index={i}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="my-2 px-2 py-1 bg-white rounded-md shadow-md cursor-pointer w-full"
                >
                  {getComponent(x)}
                </li>
              )}
            </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

