import React, { useState, useEffect, useContext } from 'react';
import TeacherViewStudentsCard from './TeacherViewStudentsCard.tsx';
import TeacherHomeworkCard from './TeacherHomeworkCard.tsx';
import StudentAssessmentCard from './StudentAssessmentCard.tsx'
import StudentLessonCard from './StudentLessonCard.tsx';
import CalendarCard from './CalendarCard.tsx';
import ViewStudents from './ViewStudents.tsx'; // Import your edit components
import { Teacher, Student, HomeworkAssignment, StudentAssessmentAssignment, LessonEvent, CalendarEvent } from "./types.tsx"
import ViewTeacherHomework from './ViewTeacherHomework.tsx';
import ViewTeacherAssessments from './ViewTeacherAssessments.tsx';
import ViewTeacherLessons from './ViewTeacherLessons.tsx';
import Calendar from './Calendar.tsx';
import Stats from './Stats.tsx';
import HumanVerifyMath from './HumanVerifyMath.tsx';
import toast from 'react-hot-toast';
import { CheckoutForm, Return } from './PaymentScreen.tsx';
import Billing from './Billing.tsx';
import Header from'/src/dashboard/layout/header/Header.tsx'
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useNavigate, useLocation } from 'react-router-dom';
import { TeacherUpdatesContext } from '/src/dashboard/context/TeacherContext.tsx';

interface Props {
  searchTerm: string;
  updateUserProfileInfo: (newUserInfo: { role: string, name: string, profileImgUrl: string | null }) => void;
}


const TeacherDash: React.FC<Props> = ({ searchTerm, updateUserProfileInfo }) => {

  const { teacherData } = useContext(TeacherUpdatesContext);


  const [student, setStudent] = useState<Student | undefined>();  

  const navigate = useNavigate();



  useEffect(() => {
    updateUserProfileInfo({
      role: 'teacher',
      name: teacherData?.name || '',
      profileImgUrl: teacherData?.profileImgUrl || ''
    });
    if (teacherData.students.length > 0) {
      setStudent(teacherData.students[0]);
    }
  }, [teacherData]);


  
const handleSelectStudent = (event: ChangeEvent<HTMLSelectElement>) => {
  const selectedStudentId = event.target.value;
  console.log("handleSelectStudent studentid is", selectedStudentId, typeof( selectedStudentId))
  const selectedStudent = teacherData?.students?.find(student => student.studentId.toString() === selectedStudentId);
  console.log("student found is ", selectedStudent)
  setStudent(selectedStudent);
};
  

  const handleViewStudents = () => {
    if (teacherData?.students) {
      navigate('/view-students', { state: { studentsData: teacherData.students, searchTerm, goBackToDash: '/teacher-dash' } });
    }
  };

  const handleViewHomework = () => {
    if (teacherData?.students && teacherData?.homeworkAssignments) {
      navigate('/view-teacher-homework', { state: { homework: teacherData.homeworkAssignments, searchTerm, students: teacherData.students, goBackToDash: '/teacher-dash'} });
    }
  };

  const handleViewAssessments = () => {
    if (teacherData?.students && teacherData?.assessments) {
      navigate('/view-teacher-assessments', { state: { assessments: teacherData.assessments, searchTerm, students: teacherData.students, goBackToDash: '/teacher-dash'} });
    }
  };

  const handleViewLessons = () => {
    if (teacherData?.students && teacherData?.lessonEvents) {
      navigate('/view-teacher-lessons', { state: { lessons: teacherData.lessonEvents, searchTerm, students: teacherData.students, goBackToDash: '/teacher-dash'} });
    }
  };

  const handleViewCalendar = () => {
    if (teacherData?.students && teacherData?.calendarEvents) {
      navigate('/calendar', { state: { events: teacherData.calendarEvents, goBackToDash: '/teacher-dash', searchTerm } });
    }
  };

  const handlePaymentCheckout = () => {
    if (teacherData?.students) {
      navigate('/payment-checkout', { state: { goBackToDash: '/teacher-dash' } });
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
          <StudentAssessmentCard assessment={teacherData.assessments} />
        </div>
        <div onClick={handleViewLessons}>
          <StudentLessonCard lessons={teacherData.lessonEvents} />
        </div>
        <div onClick={handleViewCalendar}>
          <CalendarCard events={teacherData?.calendarEvents} />
        </div>
        {/* <div onClick={() => navigate('/human-feedback')}>
          <ExamMaker lessons={teacherData.lessonEvents} />
        </div> */}
        <div onClick={handlePaymentCheckout}>
          <Billing lessons={teacherData.lessonEvents} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <select onChange={handleSelectStudent} style={{ width: '100%' }}>
          {teacherData && teacherData.students && teacherData.students.map(student => (
            <option key={student.studentId} value={student.studentId}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
        
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {student?.assessments ? <Stats student={student}/> : <div>Student has no assessments</div>}
      </div>
    </>
    );
  
  
};

export default TeacherDash;
