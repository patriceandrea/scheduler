

export function getAppointmentsForDay(state, day) {

  let appointmentArr = [];

  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      appointmentArr = currentDay.appointments;
    }
  }

  const result = appointmentArr.map(id => {
    return state.appointments[id];
  });

  return result;

}