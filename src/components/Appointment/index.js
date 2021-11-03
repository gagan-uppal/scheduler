import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode  from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interviewers, interview, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  const onAdd = function () {
    transition(CREATE);
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch((err) => {
    transition(ERROR_SAVE, true)
    console.log(err.message)
    })
  };
   
  function onEdit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
      transition(SAVING)
      bookInterview(id, interview)
      .then(() => {
      transition(SHOW)
      })
      .catch((err) => {
      transition(ERROR_SAVE, true)
      console.log(err.message)
      })
  }

  const deleteAppointment = () => {
    transition(DELETING, true);
    cancelInterview(id)
    .then(() => {
    transition(EMPTY);
    })
    .catch((err) => {
    transition(ERROR_DELETE, true)
    console.log(err.message)
    })
  };

  return (
        <article className="appointment"> 
          <Header time={time} />
          {mode === CREATE && (<Form interviewers={interviewers} onSave={save} onCancel={() => back(EMPTY)} />)}
          {mode === SAVING && <Status message="Saving" />}
          {mode === EMPTY && <Empty onAdd={onAdd} />}
          {mode === SHOW && (
                            <Show
                              student={interview.student}
                              interviewer={interview.interviewer}
                              onDelete={() =>  transition(CONFIRM) }
                              onEdit={() => { transition(EDIT) }}
                            />
                            )}
          {mode === DELETING && <Status message="Deleting" />}
          {mode === CONFIRM && (
                               <Confirm
                                onConfirm={deleteAppointment}
                                onCancel={back}
                                message="Are you sure you want to delete?"
                              />
                              )}
          {mode === EDIT && <Form name={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onSave={onEdit} onCancel={back} />}
          {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back} />}
          {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back} />}
        </article>
      )
};