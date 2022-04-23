

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

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewInfo = state.interviewers[interview.interviewer]

  return {
    student: interview.student,
    interviewer: interviewInfo
  }

}

export function getInterviewersForDay(state, day) {
  let InterviewersArr = [];
  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      InterviewersArr = currentDay.interviewers;
    }
  }
  const result = InterviewersArr.map(id => {
    return state.interviewers[id];
  });
  return result;
}
