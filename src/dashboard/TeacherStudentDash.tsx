import { useContext } from "react"
import { useNavigate} from 'react-router-dom';
import LessonCard from '/src/dashboard/cards/LessonCard.tsx';
import CalendarCard from '/src/dashboard/cards/CalendarCard.tsx';
import StatsCard from "/src/dashboard/cards/StatsCard.tsx";
import StudentHomeworkCard from '/src/dashboard/cards/StudentHomeworkCard.tsx';
import AssessmentCard from '/src/dashboard/cards/AssessmentCard.tsx'
import DashboardStats from "./DashboardStats.tsx";
import { UniversalContext } from '/src/context/UniversalContext.tsx';



const TeacherStudentDash: React.FC = () => {
  const { studentData, role , searchTerm}  = useContext(UniversalContext);
 
  const navigate = useNavigate();


  
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
          <LessonCard lessons={studentData.lessonEvents} />
        </div>
        <div onClick={handleViewHomework}>
          <StudentHomeworkCard homework={studentData.homeworkAssignments} />
        </div>
        <div onClick={handleViewAssessments}>
          <AssessmentCard assessment={studentData.assessments} />
        </div>
        {/* <div onClick={handleViewStats}>
          <StatsCard assessment={studentData.assessments} />
        </div> */}
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
