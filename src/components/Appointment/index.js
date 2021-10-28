import React from "react";
//import "components/Appointment/styles.scss";
// import "components/Appointment/styles.scss";
// import Header from "components/Appointment/Header";
// import Show from "components/Appointment/Show";
// import Empty from "components/Appointment/Empty";


export default function Appointment(props) {
  //const {time} = props;

  

  return (

<article className="appointment">

  {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
  </article>
 


  )
}