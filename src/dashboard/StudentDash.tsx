import { useState, useEffect, useContext } from "react"
import StudentLessonCard from './StudentLessonCard.tsx';
import CalendarCard from './CalendarCard.tsx';
import StatsCard from "./StatsCard.tsx";
import StudentHomeworkCard from './StudentHomeworkCard.tsx';
import ViewStudentHomework from './ViewStudentHomework.tsx'
import StudentAssessmentCard from './StudentAssessmentCard.tsx'
import ViewStudentAssessments from './ViewStudentAssessments.tsx'
import ChartTwo from './ChartTwo.tsx';
import ChatCard from './ChatCard.tsx';
import TableOne from './TableOne.tsx';
import ViewStudentLessons from './ViewStudentLessons.tsx';
import { Student , LessonEvent, CalendarEvent, StudentAssessmentAssignment, HomeworkAssignment} from "./types.tsx";
import DashboardStats from './DashboardStats.tsx'
import Calendar from "./Calendar.tsx";
import { BackButton } from "./BackButton.tsx";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';


const StudentDash: React.FC = ({  }) => {

  const { studentData, searchTerm, setUserProfileInfo } = useContext(UniversalContext);
  console.log('studentdash called data is:', studentData)


  const navigate = useNavigate();


  useEffect(() => {
    setUserProfileInfo({
      role: 'student',
      name: studentData?.name || '',
      profileImgUrl: studentData?.profileImgUrl || ''
    });
  }, [studentData]);

 


  const handleViewLessons = () => {
    if (studentData) {
      navigate('/view-student-lessons');
    }
  };

  const handleViewAssessments = () => {
    if (studentData) {
      navigate('/view-student-assessments');
    }
  };

  const handleViewHomework = () => {
    if (studentData) {
      navigate('/view-student-homework');
    }
  };

  const handleViewStats = () => {
    if (studentData) {
      navigate('/stats', { state: { student: studentData } });
    }
  };

  const handleViewCalendar = () => {
    if (studentData?.calendarEvents) {
      navigate('/calendar', { state: { events: studentData.calendarEvents} });
    }
  };

  if (!studentData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={handleViewLessons}>
          <StudentLessonCard lessons={studentData.lessonEvents} />
        </div>
        <div onClick={handleViewHomework}>
          <StudentHomeworkCard homework={studentData.homeworkAssignments} />
        </div>
        <div onClick={handleViewAssessments}>
          <StudentAssessmentCard assessment={studentData.assessments} />
        </div>
        <div onClick={handleViewStats}>
          <StatsCard />
        </div>
        <div onClick={handleViewCalendar}>
          <CalendarCard />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
       
       
        <DashboardStats student={studentData} />
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
      </div>
    </>
    );
  
  
};

export default StudentDash;
