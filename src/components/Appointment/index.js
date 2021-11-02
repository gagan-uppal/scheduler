import React from "react";
import "components/Appointment/styles.scss";
// import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode  from "hooks/useVisualMode";


export default function Appointment(props) {
  const { id, time, interviewers, interview, bookInterview, cancelInterview } =
  props;
  // //const {time} = props;
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
  }
  const deleteAppointment = () => {
    transition(DELETING);
    cancelInterview(id).then(() => transition(EMPTY));
  };

  return (

<article className="appointment">

  {/* {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>} */}
   <Header time={time} />
  {/* { props.interview ? <Show 
  student={props.interview.student}
  interviewer={props.interview.interviewer} */} 
  {mode === CREATE && (<Form interviewers={interviewers}
   onSave={save}
   onCancel={() => back(EMPTY)} />)}
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

   
  </article>
 


  )
} 