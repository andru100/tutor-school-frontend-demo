import { Teacher, LessonEvent, CalendarEvent, StudentAssessmentAssignment, HomeworkAssignment} from "./types.tsx"; 
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import React from "react";
import {useContext } from "react"
  
  
export const teacherHandleUpdateHomework = (update: HomeworkAssignment[], calendarData: CalendarEvent[], setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  setTeacherData(prevData => {
    const updatedAssignments = prevData?.homeworkAssignments?.map(assignment => {
      const matchingUpdate = update.find(updateAssignment => updateAssignment.id === assignment.id);
      if (matchingUpdate) {
        return matchingUpdate;
      } else {
        return assignment;
      }
    });
    const newAssignments = update.filter(updateAssignment => !prevData?.homeworkAssignments?.find(assignment => assignment.id === updateAssignment.id));
    
    
    const updatedCalendarEvents = prevData?.calendarEvents?.map(event => {
      const matchingUpdate = calendarData.find(updateEvent => updateEvent.id === event.id);
      if (matchingUpdate) {
        return matchingUpdate;
      } else {
        return event;
      }
    });
    const newEvents = calendarData.filter(updateEvent => !prevData?.calendarEvents?.find(event => event.id === updateEvent.id));
    const updatedData = {
      ...prevData,
      homeworkAssignments: [...updatedAssignments, ...newAssignments],
      calendarEvents: [...updatedCalendarEvents, ...newEvents]
    };
    console.log("updated homework:", updatedData.homeworkAssignments);
    console.log("updated calendar events:", updatedData.calendarEvents);
    return updatedData;
  });
};

export const teacherHandleDeleteHomework = async (id: number, setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  try {
    setTeacherData(prevData => {
      const updatedAssignments = prevData?.homeworkAssignments?.filter(assignment => assignment.id !== id);
      const updatedCalendarEvents = prevData?.calendarEvents?.filter(event => event.eventId !== id);
      const updatedData = {
        ...prevData,
        homeworkAssignments: updatedAssignments,
        calendarEvents: updatedCalendarEvents
      };
      console.log("updated homework:", updatedData.homeworkAssignments);
      console.log("updated calendar events:", updatedData.calendarEvents);
      return updatedData;
    });
   } catch (error) {
    console.error("Error deleting homework:", error);
  }
};

export const teacherHandleUploadHomework = async (id: number, setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  setTeacherData(prevData => {
    const updatedAssignments = prevData?.homeworkAssignments?.map(assignment => {
      if (assignment.id === id) {
        return {
          ...assignment,
          isSubmitted: true
        };
      } else {
        return assignment;
      }
    });
    const updatedData = {
      ...prevData,
      homeworkAssignments: updatedAssignments
    };
    return updatedData;
  });
};

export const teacherHandleUpdateAssessment = (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[], setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  setTeacherData(prevData => {
    
    const updatedAssignments = prevData?.assessments?.map(assignment => {
      const matchingUpdate = update.find(updateAssignment => updateAssignment.id === assignment.id);
      if (matchingUpdate) {
        return matchingUpdate;
      } else {
        return assignment;
      }
    });
    const newAssignments = update.filter(updateAssignment => !prevData?.assessments?.find(assignment => assignment.id === updateAssignment.id));
    const updatedCalendarEvents = prevData?.calendarEvents?.map(event => {
      const matchingUpdate = calendarData.find(updateEvent => updateEvent.id === event.id);
      if (matchingUpdate) {
        return matchingUpdate;
      } else {
        return event;
      }
    });
    const newEvents = calendarData.filter(updateEvent => !prevData?.calendarEvents?.find(event => event.id === updateEvent.id));
    console.log("updatedassignments is:", updatedAssignments);
    console.log("newAssignments is:", newAssignments);
    console.log("updatedCalendarEvents:", updatedCalendarEvents);
    console.log("newEvents:", newEvents);     
    
    const updatedData = {
      ...prevData,
      assessments: [...updatedAssignments, ...newAssignments],
      calendarEvents: [...updatedCalendarEvents, ...newEvents]
    };
    console.log("updated assessments:", updatedData.assessments);
    console.log("updated calendar events:", updatedData.calendarEvents);
    console.log("updatedData:", updatedData);
    return updatedData; 
  });
};

export const teacherHandleDeleteAssessment = async (id: number, setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  try {
    setTeacherData(prevData => {
      const updatedAssignments = prevData?.assessments?.filter(assignment => assignment.id !== id);
      const updatedCalendarEvents = prevData?.calendarEvents?.filter(event => event.eventId !== id);
      const updatedData = {
        ...prevData,
        assessments: updatedAssignments,
        calendarEvents: updatedCalendarEvents
      };
      console.log("updated assessments:", updatedData.assessments);
      return updatedData;
    });
  } catch (error) {
    console.error("Error deleting assessment:", error);
  }
};

export const teacherHandleUpdateLesson = (lessonData: LessonEvent[], calendarData: CalendarEvent[], setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  setTeacherData(prevData => {
    const updatedLessons = prevData?.lessonEvents?.map(lesson => {
      const matchingUpdate = lessonData.find(updateLesson => updateLesson.id === lesson.id);
      if (matchingUpdate) {
        return matchingUpdate;
      } else {
        return lesson;
      }
    });
    const newLessons = lessonData.filter(updateLesson => !prevData?.lessonEvents?.find(lesson => lesson.id === updateLesson.id));
    
    
    const updatedCalendarEvents = prevData?.calendarEvents?.map(event => {
      const matchingUpdate = calendarData.find(updateEvent => updateEvent.id === event.id);
      if (matchingUpdate) {
        return matchingUpdate;
      } else {
        return event;
      }
    });
    const newCalendarEvents = calendarData.filter(updateEvent => !prevData?.calendarEvents?.find(event => event.id === updateEvent.id));
    const updatedData = {
      ...prevData,
      lessonEvents: [...updatedLessons, ...newLessons],
      calendarEvents: [...updatedCalendarEvents, ...newCalendarEvents]
    };
    console.log("updated lessons:", updatedData.lessonEvents);
    return updatedData;
  });
};

export const teacherHandleDeleteLesson = async (id: number, setTeacherData: React.Dispatch<React.SetStateAction<Teacher>>) => {
  try {
    setTeacherData(prevData => {
      const updatedLessons = prevData?.lessonEvents?.filter(lesson => lesson.id !== id);
      const updatedCalendarEvents = prevData?.calendarEvents?.filter(event => event.eventId !== id);
      const updatedData = {
        ...prevData,
        lessonEvents: updatedLessons,
        calendarEvents: updatedCalendarEvents
      };
      console.log("teacherHandledelete triggered: have deleted lesson data from prop calendar, updated lessons:", updatedData.lessonEvents, "updated calendareEvents:",  updatedData.calendarEvents);
      return updatedData;
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
  }
};















