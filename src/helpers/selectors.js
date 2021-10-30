export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const getDays = state.days.filter(eachDay => eachDay.name === day)[0];

  if (!getDays) return []; //if day does not exist

  const appointment = getDays.appointments;
  const result = [];
  for (let appt of appointment) {
    result.push(state.appointments[appt])
  }
  return result;
}

export function getInterview(state, interview) {

const obj = {};
if (!interview || !state) {
  return null;
}
obj["student"] = interview.student;
obj["interviewer"] = state.interviewers[interview.interviewer];

return obj;

}

export function getInterviewersForDay(state, day) {
  if(!day) {
    return [];
  }
  const getInterviewer = state.days.filter((x) => x.name === day)[0];
  if (!getInterviewer) {
    return []
  }
  const interviewers = getInterviewer.interviewers;

  const result = []
  for(const interviewer of interviewers) {
    result.push(state.interviewers[interviewer])
  }
  return result;
}