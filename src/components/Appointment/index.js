import React from 'react';
import { Fragment } from "react";
import useVisualMode from 'hooks /useVisualMode';
import "../Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from './Status';
import Form from './Form';
import Confirm from './Confirm';


function Appointment(props) {
  // Modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING);
      const interview = {
        student: name,
        interviewer
      };
      props.bookInterview(props.id, interview).then(() => transition(SHOW));
    }
  }

  const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      props.cancelInterview(props.id).then(() => transition(EMPTY));
    }
  }


  const edit = () => {
    transition(EDIT);
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM &&
          (<Confirm
            message="Are you sure you want to cancel this appointment"
            onCancel={back}
            onConfirm={remove} />)}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={remove}
            onEdit={edit}
          />
        )}
        {mode === CREATE && <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onSave={save}
            onCancel={back}
            interviewers={props.interviewers}
          />

        )}

      </article >
    </Fragment>
  );
}
export default Appointment;