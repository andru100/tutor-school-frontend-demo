import React, { useState, useEffect, ChangeEvent } from 'react';
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

interface Props {
  landingPage: (page: string) => void;
  searchTerm: string;
  updateUserProfileInfo: (newUserInfo: { role: string, name: string, profileImgUrl: string | null }) => void;
}


const TeacherDash: React.FC<Props> = ({landingPage, searchTerm, updateUserProfileInfo}) => {

  const [page, setPage] = useState('home');
  const [teacherData, setTeacherData] = useState<Teacher>(); 
  const [student, setStudent] = useState<Student | undefined>();  

  //Get teacher data
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const response = await fetch( serverAddress + "/api/query/getTeacher", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        updateUserProfileInfo({ role: 'teacher', name: data.name, profileImgUrl: data.profileImgUrl  });
        setTeacherData(data);
        if (data.students.length > 0) {
          setStudent(data.students[0]);
        }
        console.log("Successfuly retrieved teacher data: ", data);
      } else {
        toast.error("Unable to retrieve teacher data");
        landingPage("signin");
      }
    } catch (error) {
      toast.error("Unable to retrieve teacher data");
      console.error("Error fetching teacher data:", error);
    }
  };

  const handleBackToDash = () => {
    setPage('default');
    console.log("handlebacktodash in teacher dash called ")
  };

  useEffect(() => {
      console.log("useEffect teacher dash triggered")
      fetchData();
  }, []);

  useEffect(() => {
    console.log("TeacherDash teacherdata prop updated and is now: ", teacherData)
}, [teacherData]);

  
  
  const handleUpdateHomework = (update: HomeworkAssignment[], calendarData: CalendarEvent[]) => {
    console.log("updated sent is: ", update)
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

  const handleDeleteHomework = async (id: number) => {
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

  const handleUploadHomework = async (id: number) => {
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

  const handleUpdateAssessment = (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => {
    console.log("TEAHEDASH updateassessment called  updated sent is: ", update)
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

  const handleDeleteAssessment = async (id: number) => {
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

  const handleUpdateLessons = (lessonData: LessonEvent[], calendarData: CalendarEvent[]) => {
    console.log("in handleupdatelesson, lessonData sent is: ", lessonData)
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

  const handleDeleteLesson = async (id: number) => {
    try {
      setTeacherData(prevData => {
        const updatedLessons = prevData?.lessonEvents?.filter(lesson => lesson.id !== id);
        const updatedCalendarEvents = prevData?.calendarEvents?.filter(event => event.eventId !== id);
        const updatedData = {
          ...prevData,
          lessonEvents: updatedLessons,
          calendarEvents: updatedCalendarEvents
        };
        console.log("handledelete triggered: have deleted lesson data from prop calendar, updated lessons:", updatedData.lessonEvents, "updated calendareEvents:",  updatedData.calendarEvents);
        return updatedData;
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const handleSelectStudent = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedStudentId = event.target.value;
    console.log("handleSelectStudent studentid is", selectedStudentId, typeof( selectedStudentId))
    const selectedStudent = teacherData?.students?.find(student => student.studentId.toString() === selectedStudentId);
    console.log("student found is ", selectedStudent)
    setStudent(selectedStudent);
  };

  const updateTeacherStudentData = (updatedStudent: Student) => {
    setTeacherData(prevData => {
      const updatedStudents = prevData?.students?.map(student => {
        if (student.studentId === updatedStudent.studentId) {
          return updatedStudent;
        } else {
          return student;
        }
      });
      return {
        ...prevData,
        students: updatedStudents
      };
    });
  };

  const BackButton = () => {
    return (
      <button type="button"  onClick={() => handleBackToDash()} className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>Go back</span>
        </button>
    );
  };

  

  switch(page){
  case "students":
    if (teacherData?.students ) {
      return (
      <>
        <ViewStudents studentsData={teacherData.students} searchTerm={searchTerm} updateTeacherStudentData={updateTeacherStudentData} goBackToDash={handleBackToDash}  />
      </>
      )
    }
    break;
  case "homework":
    if (teacherData?.students && teacherData?.homeworkAssignments) {
      return (
        <>
          <ViewTeacherHomework homework={teacherData?.homeworkAssignments} searchTerm={searchTerm} students={teacherData?.students } goBackToDash={handleBackToDash} handleUpdateHomework={handleUpdateHomework} handleUploadHomework={handleUploadHomework} handleDeleteHomework={handleDeleteHomework}/>
        </>
      )
    }
    break;
  case "assessments":
    if (teacherData?.students && teacherData?.assessments) {
      return (
        <>
          <ViewTeacherAssessments assessments={teacherData?.assessments} searchTerm={searchTerm} students={teacherData?.students } goBackToDash={handleBackToDash} handleUpdateAssessment={handleUpdateAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
        </>
      )
    }
    break;
    case "lessons":
      if (teacherData?.students && teacherData?.lessonEvents) {
        return (
          <>
            <ViewTeacherLessons lessons={teacherData?.lessonEvents} searchTerm={searchTerm} students={teacherData?.students } goBackToDash={handleBackToDash} handleUpdateLesson={handleUpdateLessons} handleDeleteLesson={handleDeleteLesson}/>
          </>
        )  
      }
      break;
    case "calendar":
      if (teacherData?.students && teacherData?.calendarEvents) {
        return (
          <>
            <Calendar events={teacherData?.calendarEvents}  goBackToDash={handleBackToDash} handleUpdateLesson={handleUpdateLessons} handleDeleteLesson={handleDeleteLesson}/>
          </>
        )
      }
      break;
    // case "humanFeedback":
    //   if (teacherData?.students ) {
    //     return <HumanVerifyMath goBackToDash={handleBackToDash}/>
    //   }
    //   break;
    case "paymentscheckout":
      if (teacherData?.students ) {
        return (
          <>
            <CheckoutForm goBackToDash={handleBackToDash}/>
          </>
        )
      }
      break;
    // case "paymentsreturn":
    //   if (teacherData?.students ) {
    //     return <Return goBackToDash={handleBackToDash}/>
    //   }
      break;
  default:
    if (!teacherData) {
      return <p>Loading...</p>;
    }
    return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={() => setPage('students')}>
          <TeacherViewStudentsCard students={teacherData.students}/>
        </div>
        <div onClick={() => setPage('homework')}>
          <TeacherHomeworkCard homework={teacherData.homeworkAssignments}/>
        </div>
        <div onClick={() => setPage('assessments')}>
          <StudentAssessmentCard assessment={teacherData.assessments}/> 
        </div>
        <div onClick={() => setPage('lessons')}>
          <StudentLessonCard lessons={teacherData.lessonEvents} />
        </div>
        <div onClick={() => setPage('calendar')}>
          <CalendarCard events={teacherData?.calendarEvents} />
        </div>
        {/* <div onClick={() => setPage('humanFeedback')}>
          <ExamMaker lessons={teacherData.lessonEvents} />
        </div> */}
        <div onClick={() => setPage('paymentscheckout')}>
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
  }
  
};

export default TeacherDash;
