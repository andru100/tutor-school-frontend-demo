
import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import TableThree from './TableThree';
import AssignedLessons from './Assignedlessons';
import CompleteLessons from './CompleteLessons';
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import {Student , LessonEvent, CalendarEvent} from './types'
import { BackButton } from "./BackButton";
import { useLocation } from 'react-router-dom';

interface Props {
  student: Student;
  goBackToDash: string; 
  searchTerm: string;
  
}

const Lessons: React.FC = () => {
  const location = useLocation();
  const { student, goBackToDash, searchTerm} = location.state as Props;
  const [filteredLessons, setFilteredLessons] = useState<Student["lessonEvents"]>([]);

    useEffect(() => {
      setFilteredLessons(student.lessonEvents.filter(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, student]);


  if (!student) {
    return <p>Loading fakt data...</p>;
  } else {


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
            <AssignedLessons lessons={assignedLessons}  backToParent={'/view-student-lessons'} />
          </div>
    
          {/* Row 3 for CompleteLessons */}
          <div className="row-start-3 col-span-full">
            <CompleteLessons lessons={completedLessons}  backToParent={'/view-student-lessons'} />
          </div>
        </div>
      </>
    );
  }

};

export default Lessons;
