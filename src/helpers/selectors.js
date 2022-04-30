//Helper Functions 

// Select Appointments for that Day 
export const getAppointmentsForDay = (state, day) => {
  if (day && state.days.length) {
    const selectedDay = state.days.find((item) => item.name === day);
    return selectedDay.appointments.map((id) => state.appointments[id]);
  }
  return [];
};

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
