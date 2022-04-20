import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {


  const scheduleDay = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.value === day.name}
        setDay={props.onChange}
      />
    )
  });

  return (
    <ul>
      {scheduleDay}
    </ul>
  );
}

export default DayList; 