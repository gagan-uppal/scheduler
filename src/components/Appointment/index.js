import React from "react";
import "components/Appointment/styles.scss";
// import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

const CREATE = "CREATE";

export default function Appointment(props) {
  //const {time} = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = function () {
    transition(CREATE);
  }

  return (

<article className="appointment">

  {/* {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>} */}
  {/* <Header time={props.time} />
  { props.interview ? <Show 
  student={props.interview.student}
  interviewer={props.interview.interviewer} */}
  {mode === EMPTY && <Empty onAdd={onAdd} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
{mode === CREATE && <Form interviewers={[]} onCancel={back} />}
   
  </article>
 


  )
} 