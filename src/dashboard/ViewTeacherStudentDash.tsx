import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import LessonCard from './LessonCard.tsx';
import CalendarCard from './CalendarCard.tsx';
import StatsCard from "./StatsCard.tsx";
import StudentHomeworkCard from './StudentHomeworkCard.tsx';
import ViewStudentHomework from './ViewStudentHomework.tsx'
import AssessmentCard from './AssessmentCard.tsx'
import ViewStudentAssessments from './ViewStudentAssessments.tsx'
import ChartTwo from './ChartTwo.tsx';
import ChatCard from './ChatCard.tsx';
import TableOne from './TableOne.tsx';
import ViewStudentLessons from './ViewStudentLessons.tsx'; 
import { Student , LessonEvent, CalendarEvent, StudentAssessmentAssignment, HomeworkAssignment} from "./types.tsx";
import Stats from './Stats.tsx'
import Calendar from "./Calendar.tsx";
import { BackButton } from "./BackButton.tsx";
import DashboardStats from "./DashboardStats.tsx";
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';



const TeacherStudentDash: React.FC = () => {
  const { studentData, role , searchTerm, goBackToDash, setGoBackToDash}  = useContext(UniversalContext);
 
  const navigate = useNavigate();


  useEffect(() => {
    if (goBackToDash !== '/teacher-dashboard') {
      setGoBackToDash('/teacher-dashboard');
    }
  }, []);
  
  const handleViewLessons = () => {
    if (studentData) {
      setGoBackToDash('/teacher-student-dashboard')
      navigate('/view-student-lessons');
    }
  };

  const handleViewAssessments = () => {
    if (studentData) {
      setGoBackToDash('/teacher-student-dashboard')
      navigate('/view-student-assessments');
    }
  };

  const handleViewHomework = () => {
    if (studentData) {
      setGoBackToDash('/teacher-student-dashboard')
      navigate('/view-student-homework');
    }
  };

  const handleViewStats = () => {
    if (studentData) {
      setGoBackToDash('/teacher-student-dashboard')
      navigate('/stats', { state: { student: studentData } });
    }
  };

  const handleViewCalendar = () => {
    if (studentData?.calendarEvents) {
      setGoBackToDash('/teacher-student-dashboard')
      navigate('/calendar', { state: { events: studentData.calendarEvents} });
    }
  };

  if (!studentData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BackButton goBackToDash={goBackToDash} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={handleViewLessons}>
          <LessonCard lessons={studentData.lessonEvents} />
        </div>
        <div onClick={handleViewHomework}>
          <StudentHomeworkCard homework={studentData.homeworkAssignments} />
        </div>
        <div onClick={handleViewAssessments}>
          <AssessmentCard assessment={studentData.assessments} />
        </div>
        <div onClick={handleViewStats}>
          <StatsCard assessment={studentData.assessments} />
        </div>
        <div onClick={handleViewCalendar}>
          <CalendarCard lessons={studentData.lessonEvents} homework={studentData.homeworkAssignments} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
       
       
        <DashboardStats student={studentData} searchTerm={searchTerm} />
      </div>
    </>
    );
  
  
};

export default TeacherStudentDash;
