import classNames from "classnames";
import React from "react";
import "./DayListItem.scss"

//DayListItem
export default function DayListItem(props) {

  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })

  //Function that returns the remaining spots in the Front-End
  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining'
    } else if (spots === 1) {
      return '1 spot remaining'
    }
    return `${spots} spots remaining`

  };

  //This variable returns the remaining spots in the Front-End
  const availabilityMessage = formatSpots(props.spots);

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{availabilityMessage}</h3>
    </li>
  );
}