import React from 'react';
import "../Appointment/styles.scss"



function Appointment(props) {

  const formatTime = (time) => {
    if (!time) {
      return 'No Appointments'
    }
    return `Appointment at ${time}`

  };

  const availabilityAppointment = formatTime(props.time);

  return (
    <article className="appointment">{availabilityAppointment}</article>
  );
}

export default Appointment;