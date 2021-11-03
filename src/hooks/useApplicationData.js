import { useEffect, useState } from "react";
 import axios from "axios";

 export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}

  });

  const updateSpots = function(state, appointments, id) {

    const day = state.days.find(d => d.name === state.day);
    let spots = 0;
    for (const id of day.appointments) {
      if(!appointments[id].interview) {
        spots++;
      }
    }
    const newDay = { ...day, spots };
    const newDays = state.days.map(d => d.name === state.day ? newDay : d);
    return newDays;

  }

  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers })) // saves new state and replaces writing state.days and state.appointments
      })
  }, [])

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, appointments)

        setState({ ...state, appointments, days })
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments)

        setState({ ...state, appointments, days })
      })
  }

  return { state, setDay, bookInterview, cancelInterview };

 };