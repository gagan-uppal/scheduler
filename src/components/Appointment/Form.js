import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props){

const [student, setStudent] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

function reset(){
  setStudent("");
  setInterviewer(null);
}

function cancel(){
  reset();
  props.onCancel();
}
const save = () => {
  props.onSave(student, interviewer);
};
const validate = () => {
  if(!interviewer || !student) {
    alert("Please select interviewer and also write your name")
    return
  }
  props.onSave(student,interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={student}
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}
