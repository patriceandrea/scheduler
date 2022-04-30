import classNames from "classnames";
import React from "react";
import "./DayListItem.scss"

//Function that returns the remaining spots in the Front-End
const formatSpots = (spots) => {
  if (spots === 0) {
    return 'no spots remaining'
  } else if (spots === 1) {
    return '1 spot remaining'
  }
  return `${spots} spots remaining`

};

//DayListItem Component 
export default function DayListItem(props) {

  const { selected, spots, setDay, name } = props;

  const listClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  })



  //This variable returns the remaining spots in the Front-End
  const availabilityMessage = formatSpots(spots);

  return (
    <li className={listClass} onClick={() => setDay(name)}>
      <h2 className="text--regular" >{name}</h2>
      <h3 className="text--light">{availabilityMessage}</h3>
    </li>
  );
}