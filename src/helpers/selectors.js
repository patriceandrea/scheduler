//Helper Functions 

// Select Appointments for that Day 
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

// Select the Interview 
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

//Select the interviewers for that day 
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
