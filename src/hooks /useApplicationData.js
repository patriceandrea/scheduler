import axios from "axios";
import { useState, useEffect } from "react";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))

    });
  }, []);

  function updateSpots(state, appointments, id) {
    //find the day 
    const dayObj = state.days.find(d => d.name === state.day);

    //look at the appointment id 
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++
      }
    }
    const day = { ...dayObj, spots };
    const days = state.days.map(d => d.name === state.day ? day : d);

    //return updated days arrays
    return days;

  };



  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState({
        ...state,
        appointments,
        days
      })

    });
  }

  //Cancel Interview  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      setState({
        ...state,
        appointments,
        days
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}


