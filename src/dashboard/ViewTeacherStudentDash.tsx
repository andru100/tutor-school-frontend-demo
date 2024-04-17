import { useState } from "react"
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

interface Props {
  student: Student;
  goBackToDash: () => void;
  searchTerm: string;
}


const TeacherStudentDash: React.FC<Props> = ({student, goBackToDash, searchTerm}) => {
  const [studentData, setStudentData] = useState<Student>(student);
  const [page, setPage] = useState('home');

  const handleBackToDash = () => {
    setPage('default');
  };

  const handleUpdateLesson = (lessonData: LessonEvent[], calendarData: CalendarEvent[]) => {
    console.log("lessonDatad sent is: ", lessonData)
    setStudentData(prevData => {
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
      setStudentData(prevData => {
        const updatedLessons = prevData?.lessonEvents?.filter(lesson => lesson.id !== id);
        const updatedCalendarEvents = prevData?.calendarEvents?.filter(event => event.eventId !== id);
        const updatedData = {
          ...prevData,
          lessonEvents: updatedLessons,
          calendarEvents: updatedCalendarEvents
        };
        console.log("updated lessons:", updatedData.lessonEvents);
        return updatedData;
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };
  
  const handleUpdateHomework = (update: HomeworkAssignment[], calendarData: CalendarEvent[]) => {
    console.log("updated sent is: ", update)
    setStudentData(prevData => {
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
  }

  
  const handleUploadHomework = async (id: number) => {
    setStudentData(prevData => {
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

  const handleDeleteHomework = async (id: number) => {
    try {
      setStudentData(prevData => {
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

  const handleUpdateAssessment = (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => {
    console.log("updated sent is: ", update)
    setStudentData(prevData => {
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
      console.log("calendarData:", calendarData);
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
      setStudentData(prevData => {
        const updatedAssignments = prevData?.assessments?.filter(assignment => assignment.id !== id);
        const updatedCalendarEvents = prevData?.calendarEvents?.filter(event => event.eventId !== id);
        const updatedData = {
          ...prevData,
          assessments: updatedAssignments,
          calendarEvents: updatedCalendarEvents
        };
        console.log("updated/ deleted assessments in student dash:", updatedData.assessments);
        return updatedData;
      });
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };


 


  switch(page){
  case "lessons":
    if (studentData){
      return (
        <>
          <ViewStudentLessons searchTerm={searchTerm} student={studentData} goBackToDash={handleBackToDash} handleUpdateLesson={handleUpdateLesson} handleDeleteLesson={handleDeleteLesson}/>
        </>
      )
    }
    break;
  case "assessments":
    if (studentData){
      return (
        <>
          <ViewStudentAssessments searchTerm={searchTerm} student={studentData}  goBackToDash={handleBackToDash} handleUpdateAssessment={handleUpdateAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
        </>
      )
    }
    break;
  case "homework":
    if (studentData){
      return (
        <>
          <ViewStudentHomework searchTerm={searchTerm} student={studentData} goBackToDash={handleBackToDash} handleUpdateHomework={handleUpdateHomework} handleUploadHomework={handleUploadHomework} handleDeleteHomework={handleDeleteHomework}/>
        </>
      )
    }
    break;  
  case "stats":
    if (studentData){
      return (
        <>
          <Stats student={studentData} />
        </>
      )
    }
    break;
  case "calendar":
    if ( studentData?.calendarEvents) {
      return <Calendar events={studentData?.calendarEvents}  goBackToDash={handleBackToDash} handleUpdateLesson={handleUpdateLesson} handleDeleteLesson={handleDeleteLesson}/>
    }
    break;
  default:
    if (!studentData) {
      return <p>Loading...</p>; 
    }
    return (
    <>
      <BackButton goBackToDash={goBackToDash}/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={() => setPage('lessons')}>
        <StudentLessonCard lessons={studentData.lessonEvents} />
        </div>
        <div onClick={() => setPage('homework')}>
          <StudentHomeworkCard homework={studentData.homeworkAssignments}/>
        </div>
        <div onClick={() => setPage('assessments')}>
          <StudentAssessmentCard assessment={studentData.assessments}/> 
        </div>
        <div onClick={() => setPage('stats')}>
          <StatsCard assessment={studentData.assessments}/> 
        </div>
        <div onClick={() => setPage('calendar')}>
          <CalendarCard lessons={studentData.lessonEvents} homework={studentData.homeworkAssignments}/>
        </div>
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
       
       
        <Stats student={studentData} />
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
  }
  
};

export default TeacherStudentDash;
