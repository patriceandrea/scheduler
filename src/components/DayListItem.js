import classNames from "classnames";
import React from "react";
import "./DayListItem.scss"

export default function DayListItem(props) {

  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })

  const formatSpots = (spots) => {
    if (!spots) {
      return `no spots remaining`
    } else if (spots === 1) {
      return `${spots} spot remaining`
    }
    return `${spots} spots remaining`

  };

  const availabilityMessage = formatSpots(props.spots);

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{availabilityMessage}</h3>
    </li>
  );
}