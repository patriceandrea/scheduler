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
import Error from './Error';

function Appointment(props) {
  // Modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DESTROY = "ERROR_DESTROY";

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
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }
  }

  //original remove 
  const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DESTROY, true));
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
        {mode === ERROR_SAVE && (
          <Error
            message="Could not save appointment"
            onClose={back}
          />
        )}
        {mode === ERROR_DESTROY && (
          <Error
            message="Could not delete appointment"
            onClose={back}
          />
        )}
      </article >
    </Fragment>
  );
}
export default Appointment;