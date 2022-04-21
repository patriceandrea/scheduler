import React from 'react';
import "../Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { Fragment } from "react";


function Appointment(props) {

  const formatTime = (time) => {
    if (!time) {
      return 'No Appointments'
    }
    return `Appointment at ${time}`

  };

  const availabilityAppointment = formatTime(props.time);

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {/* {availabilityAppointment} */}

        {props.interview ? <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer} /> : <Empty />}
      </article >

    </Fragment>
  );
}

export default Appointment;