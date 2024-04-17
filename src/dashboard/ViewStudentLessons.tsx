
import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import TableThree from './TableThree';
import AssignedLessons from './Assignedlessons';
import CompleteLessons from './CompleteLessons';
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import {Student , LessonEvent, CalendarEvent} from './types'
import { BackButton } from "./BackButton";

interface Props {
  student: Student;
  goBackToDash: () => void; 
  handleUpdateLesson: (lessonData: LessonEvent[], calendarData: CalendarEvent[]) => void;
  handleDeleteLesson: (id: number) => void;
  searchTerm: string;
  
}

const Lessons: React.FC<Props> = ({student, handleUpdateLesson, handleDeleteLesson, searchTerm, goBackToDash}) => {
  const [page, setPage] = useState('home');
  const [lessonId, setLessonId] = useState(0)
  const [filteredLessons, setFilteredLessons] = useState<Student["lessonEvents"]>([]);

    useEffect(() => {
      setFilteredLessons(student.lessonEvents.filter(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, student]);
  

  const handleBackToLessons = (req: string, id: number) => {
    setLessonId(id)
    setPage(req);
};


  if (!student) {
    return <p>Loading fakt data...</p>;
  } else {

    if (page === 'create') {
      return (
        <>
          <Breadcrumb pageName={"Assign lesson to " + student.name} />
          <CreateLesson  student={student} backToLessons={handleBackToLessons} handleUpdateLesson={handleUpdateLesson}/>
        </>
      );
    }
    
    if (page === 'edit') {
      const lessonEvent = student.lessonEvents?.find(event => event.id === lessonId);
      if (lessonEvent) {
          return (
              <>
                  <Breadcrumb pageName={"Edit lesson for " + student.name} />
                  <EditLesson lesson={lessonEvent} backToLessons={handleBackToLessons} handleUpdateLesson={handleUpdateLesson}/>
              </>
          );
      } else {
          console.log("Error: lessonEvent is undefined");
      }
    }
  }


  const assignedLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isAssigned && !lessonEvent.isComplete) ?? null;
  const completedLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isComplete) ?? null;

  return (
    <>
      <Breadcrumb pageName="Lessons" />
      <div className="flex flex-col gap-10">
        {/* Row 1 with 3 columns */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="sm:flex-1"><BackButton goBackToDash={goBackToDash} /></div>
        </div>
  
        {/* Row 2 for AssignedLessons */}
        <div className="row-start-2 col-span-full">
          <AssignedLessons lessons={assignedLessons} backToLessons={handleBackToLessons} handleDeleteLesson={handleDeleteLesson}/>
        </div>
  
        {/* Row 3 for CompleteLessons */}
        <div className="row-start-3 col-span-full">
          <CompleteLessons lessons={completedLessons} backToLessons={handleBackToLessons} handleDeleteLesson={handleDeleteLesson}/>
        </div>
      </div>
    </>
  );

};

export default Lessons;
