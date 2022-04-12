// import { useState, useEffect } from "react";
// import classes from "./ProjectItem.module.css";
import RoomItem from "./RoomItem";

function ProjectItem(props) {

  return (
    <div>
      {props.project.rooms.map((room) => (
        <RoomItem
          room={room}
          projectNum={props.project.woProjectNum}
          projectName={props.project.projectName}
          dealerCode={props.project.dealerCode}
        />
      ))}
    </div>
  );
}

export default ProjectItem;
