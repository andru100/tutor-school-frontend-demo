import React, { useState, useEffect, useContext } from 'react';
import TeacherViewStudentsCard from '/src/dashboard/cards/TeacherViewStudentsCard.tsx';
import TeacherHomeworkCard from '/src/dashboard/cards/TeacherHomeworkCard.tsx';
import AssessmentCard from '/src/dashboard/cards/AssessmentCard.tsx'
import LessonCard from '/src/dashboard/cards/LessonCard.tsx';
import CalendarCard from '/src/dashboard/cards/CalendarCard.tsx';
import BillingCard from '/src/dashboard/cards/BillingCard.tsx';
import { useNavigate } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import DashboardStats from './DashboardStats.tsx';



const TeacherDash: React.FC = () => {

  const { teacherData, searchTerm, setUserProfileInfo } = useContext(UniversalContext);


  const [student, setStudent] = useState<Student | undefined>();  

  const navigate = useNavigate();



  useEffect(() => {
    setUserProfileInfo({
      role: 'teacher',
      name: teacherData?.name || '',
      profileImgUrl: teacherData?.profileImgUrl || ''
    });
    if (teacherData?.students.length > 0) {
      setStudent(teacherData.students[0]);
    }
  }, [teacherData]);


  
const handleSelectStudent = (event: ChangeEvent<HTMLSelectElement>) => {
  const selectedStudentId = event.target.value;
  const selectedStudent = teacherData?.students?.find(student => student.studentId.toString() === selectedStudentId);
  setStudent(selectedStudent);
};
  

  const handleViewStudents = () => {
    if (teacherData?.students) {
      navigate('/view-students');
    }
  };

  const handleViewHomework = () => {
    if (teacherData?.students && teacherData?.homeworkAssignments) {
      navigate('/view-teacher-homework');
    }
  };

  const handleViewAssessments = () => {
    if (teacherData?.students && teacherData?.assessments) {
      navigate('/view-teacher-assessments');
    }
  };

  const handleViewLessons = () => {
    if (teacherData?.students && teacherData?.lessonEvents) {
      navigate('/view-teacher-lessons');
    }
  };

  const handleViewCalendar = () => {
    if (teacherData?.students && teacherData?.calendarEvents) {
      navigate('/calendar', { state: { events: teacherData.calendarEvents} });
    }
  };

  const handleViewBilling = () => {
    if (teacherData?.students) {
      navigate('/view-billing');
    }
  };

  if (!teacherData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={handleViewStudents}>
          <TeacherViewStudentsCard students={teacherData.students} />
        </div>
        <div onClick={handleViewHomework}>
          <TeacherHomeworkCard homework={teacherData.homeworkAssignments} />
        </div>
        <div onClick={handleViewAssessments}>
          <AssessmentCard assessment={teacherData.assessments} />
        </div>
        <div onClick={handleViewLessons}>
          <LessonCard lessons={teacherData.lessonEvents} />
        </div>
        <div onClick={handleViewCalendar}>
          <CalendarCard events={teacherData?.calendarEvents} />
        </div>
        {/* <div onClick={() => navigate('/human-feedback')}>
          <ExamMaker lessons={teacherData.lessonEvents} />
        </div> */}
        <div onClick={handleViewBilling}>
          <BillingCard lessons={teacherData.lessonEvents} />
        </div>
      </div>

      <div className=" md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="mb-4 w-full">
          <h4 className="text-xl font-semibold text-black dark:text-white">View Student Insights</h4>
          <form className="max-w-sm">
            <select id="students" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 mt-3" 
              onChange={handleSelectStudent} 
              value={student?.name || ''}
              style={{ width: '100%', minWidth: '150px' }}>
              <option value="" disabled>Choose a student</option>
              {teacherData && teacherData.students && teacherData.students.map(student => (
                <option key={student.studentId} value={student.studentId}>
                  {student.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
        
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {student?.assessments ? <DashboardStats student={student}/> : <div>Student has no assessments</div>}
      </div>
    </>
    );
  
  
};

export default TeacherDash;
