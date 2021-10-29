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