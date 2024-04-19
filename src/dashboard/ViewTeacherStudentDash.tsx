import { useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
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
import ViewStudentLessons from './ViewStudentLessons.tsx'; // Import your edit components
import { Student , LessonEvent, CalendarEvent, StudentAssessmentAssignment, HomeworkAssignment} from "./types.tsx";
import Stats from './Stats.tsx'
import Calendar from "./Calendar.tsx";
import { BackButton } from "./BackButton.tsx";
import DashboardStats from "./DashboardStats.tsx";

interface Props {
  student: Student;
  goBackToDash: string;
  searchTerm: string;
}


const TeacherStudentDash: React.FC = () => {
  const location = useLocation();
  const { student, goBackToDash, searchTerm } = location.state as Props;
  const [studentData, setStudentData] = useState<Student>(student);

  const navigate = useNavigate();


 
  const handleViewLessons = () => {
    if (studentData) {
      navigate('/view-student-lessons', { state: { searchTerm, student: studentData, goBackToDash: '/view-teacher-student-dash'} });
    }
  };

  const handleViewAssessments = () => {
    if (studentData) {
      navigate('/view-student-assessments', { state: { searchTerm, student: studentData, goBackToDash: '/view-teacher-student-dash'} });
    }
  };

  const handleViewHomework = () => {
    if (studentData) {
      navigate('/view-student-homework', { state: { searchTerm, student: studentData, goBackToDash: '/view-teacher-student-dash' } });
    }
  };

  const handleViewStats = () => {
    if (studentData) {
      navigate('/stats', { state: { student: studentData } });
    }
  };

  const handleViewCalendar = () => {
    if (studentData?.calendarEvents) {
      navigate('/calendar', { state: { events: studentData.calendarEvents, goBackToDash: '/view-teacher-student-dash', searchTerm} });
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
          <StudentLessonCard lessons={studentData.lessonEvents} />
        </div>
        <div onClick={handleViewHomework}>
          <StudentHomeworkCard homework={studentData.homeworkAssignments} />
        </div>
        <div onClick={handleViewAssessments}>
          <StudentAssessmentCard assessment={studentData.assessments} />
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
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
    );
  
  
};

export default TeacherStudentDash;
