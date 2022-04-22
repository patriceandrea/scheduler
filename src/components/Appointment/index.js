import React from 'react';
import "../Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { Fragment } from "react";
import useVisualMode from "hooks /useVisualMode";
import Form from './Form';


function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
        {/* {availabilityAppointment}

        {props.interview ? <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer} /> : <Empty />} */}

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form
          interviewers={[]}
          onCancel={() => back(EMPTY)}
        />}
      </article >

    </Fragment>
  );
}

export default Appointment;