import React, { createContext, useState } from 'react';
import { Teacher, HomeworkAssignment, TeacherAssessmentAssignment, LessonEvent, CalendarEvent } from "./types.tsx"
import { handleUpdateLesson as teacherHandleUpdateLesson, handleDeleteLesson as teacherHandleDeleteLesson, handleUpdateHomework as teacherHandleUpdateHomework, handleDeleteHomework as teacherHandleDeleteHomework, handleUploadHomework as teacherHandleUploadHomework, handleUpdateAssessment as teacherHandleUpdateAssessment, handleDeleteAssessment as teacherHandleDeleteAssessment } from '/src/dashboard/UpdateTeacher.tsx';


export interface TeacherContextType {
  teacherData: Teacher | undefined;
  setTeacherData: React.Dispatch<React.SetStateAction<Teacher | undefined>>;
  handleUpdateLesson: (lessonData: LessonEvent[], calendarData: CalendarEvent[]) => void;
  handleDeleteLesson: (id: number) => void;
  handleUpdateHomework: (update: HomeworkAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteHomework: (id: number) => void;
  handleUploadHomework: (id: number) => void;
  handleUpdateAssessment: (update: TeacherAssessmentAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteAssessment: (id: number) => void;
}

export const TeacherUpdatesContext = React.createContext<TeacherContextType | undefined>(undefined);

export const TeacherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teacherData, setTeacherData] = useState<Teacher | undefined>(undefined);

  
  const teacherContextValue: TeacherContextType = {
    teacherData,
    setTeacherData,
    handleUpdateLesson: teacherHandleUpdateLesson,
    handleDeleteLesson: teacherHandleDeleteLesson,
    handleUpdateHomework: teacherHandleUpdateHomework,
    handleDeleteHomework: teacherHandleDeleteHomework,
    handleUploadHomework: teacherHandleUploadHomework,
    handleUpdateAssessment: teacherHandleUpdateAssessment,
    handleDeleteAssessment: teacherHandleDeleteAssessment
  };

  return (
    <TeacherUpdatesContext.Provider value={teacherContextValue}>
      {children}
    </TeacherUpdatesContext.Provider>
  );
};