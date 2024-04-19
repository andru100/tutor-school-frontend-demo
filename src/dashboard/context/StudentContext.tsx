import React, { createContext, useState } from 'react';
import { Student, HomeworkAssignment, StudentAssessmentAssignment, LessonEvent, CalendarEvent } from "./types.tsx"
import { handleUpdateLesson as studentHandleUpdateLesson, handleDeleteLesson as studentHandleDeleteLesson, handleUpdateHomework as studentHandleUpdateHomework, handleDeleteHomework as studentHandleDeleteHomework, handleUploadHomework as studentHandleUploadHomework, handleUpdateAssessment as studentHandleUpdateAssessment, handleDeleteAssessment as studentHandleDeleteAssessment } from '/src/dashboard/UpdateStudent.tsx';

export interface StudentContextType {
  studentData: Student | undefined;
  setStudentData: React.Dispatch<React.SetStateAction<Student | undefined>>;
  handleUpdateLesson: (lessonData: LessonEvent[], calendarData: CalendarEvent[]) => void;
  handleDeleteLesson: (id: number) => void;
  handleUpdateHomework: (update: HomeworkAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteHomework: (id: number) => void;
  handleUploadHomework: (id: number) => void;
  handleUpdateAssessment: (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteAssessment: (id: number) => void;
}

export const StudentUpdatesContext = React.createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<Student | undefined>(undefined);

    
  const studentContextValue: StudentContextType = {
    studentData,
    setStudentData,
    handleUpdateLesson: studentHandleUpdateLesson,
    handleDeleteLesson: studentHandleDeleteLesson,   
    handleUpdateHomework: studentHandleUpdateHomework,
    handleDeleteHomework: studentHandleDeleteHomework,
    handleUploadHomework: studentHandleUploadHomework,
    handleUpdateAssessment: studentHandleUpdateAssessment,
    handleDeleteAssessment: studentHandleDeleteAssessment
  };


  return (
    <StudentUpdatesContext.Provider value={studentContextValue}>
      {children}
    </StudentUpdatesContext.Provider>
  );
};