import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props){
  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset(){
  setStudent("");
  setError("");
  setInterviewer(null);
}

  function cancel(){
  reset();
  props.onCancel();
}
// const save = () => {
//   props.onSave(student, interviewer);
// };

// validate form
const validate = () => {
  if (student === "") {
  setError("Student name cannot be blank");
  return;
  }
  student === "" && setError("Student name cannot be blank");

  if(!interviewer){
  setError("You have to choose an interviewer");
  return;
  }

  setError("")
  props.onSave(student, interviewer);
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
            data-testid="student-name-input"
          />
      </form>
        <section className="appointment__validation">{error}</section>
          <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
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
};
