import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import "components/Appointment";
import Confirm from "./Appointment/Confirm";
import Empty from "./Appointment/Empty";
import Appointment from "components/Appointment";
import axios from 'axios';
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import useVisualMode from "hooks /useVisualMode";
import Show from "./Appointment/Show";




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });



  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))

    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);


  const appointmentList = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);




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


      return axios.put(` /api/appointments/${id}`, { interview }).then(() => {
        setState({
          ...state,
          appointments
        })

      });
    }


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}

      />

    )
  }

  );




  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}

          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}

