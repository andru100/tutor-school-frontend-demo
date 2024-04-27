import React, { createContext, useState } from 'react';
import { UserProfileInfo } from './src/dashboard/types.tsx';
import { Teacher, Student, HomeworkAssignment, TeacherAssessmentAssignment, LessonEvent, CalendarEvent } from "./types.tsx"
import { handleUpdateLesson as teacherHandleUpdateLesson, handleDeleteLesson as teacherHandleDeleteLesson, handleUpdateHomework as teacherHandleUpdateHomework, handleDeleteHomework as teacherHandleDeleteHomework, handleUploadHomework as teacherHandleUploadHomework, handleUpdateAssessment as teacherHandleUpdateAssessment, handleDeleteAssessment as teacherHandleDeleteAssessment } from '/src/dashboard/UpdateTeacher.tsx';

export interface UniversalContextType {
  role: string | undefined;
  setRole: React.Dispatch<React.SetStateAction<string | undefined>>;
  teacherData: Teacher | undefined;
  setTeacherData: React.Dispatch<React.SetStateAction<Teacher | undefined>>;
  studentData: Student | undefined;
  setStudentData: React.Dispatch<React.SetStateAction<Student | undefined>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  userProfileInfo: UserProfileInfo;
  setUserProfileInfo: React.Dispatch<React.SetStateAction<UserProfileInfo>>;
  goBackToDash: React.Dispatch<React.SetStateAction<string | undefined>>;
  setGoBackToDash: React.Dispatch<React.SetStateAction<string>>;
}

export const UniversalContext = React.createContext<UniversalContextType | undefined>(undefined);

export const UniversalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [teacherData, setTeacherData] = useState<Teacher | undefined>(undefined);
  const [studentData, setStudentData] = useState<Student | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfo>({ role: '', name: '', profileImgUrl: null });
  const [goBackToDash, setGoBackToDash] = useState<string | undefined>(undefined);

  const universalContextValue: UniversalContextType = {
    role,
    setRole,
    studentData,
    setStudentData,
    teacherData,
    setTeacherData,
    searchTerm,
    setSearchTerm,
    userProfileInfo,
    setUserProfileInfo,
    goBackToDash,
    setGoBackToDash
   
  };

  return (
    <UniversalContext.Provider value={universalContextValue}>
      {children}
    </UniversalContext.Provider>
  );
};