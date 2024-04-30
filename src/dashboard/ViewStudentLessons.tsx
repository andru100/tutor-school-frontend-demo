
import { useState, useEffect, useContext } from "react"
import Breadcrumb from './Breadcrumb';
import TableThree from './TableThree';
import UpcomingLessons from './UpcomingLessons';
import PreviousLessons from './PreviousLessons';
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import {Student , LessonEvent, CalendarEvent} from './types'
import { BackButton } from "./BackButton";
import { useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';


const Lessons: React.FC = () => {
  const { studentData, searchTerm, goBackToDash, setGoBackToDash } = useContext(UniversalContext);
  const [filteredLessons, setFilteredLessons] = useState<Student["lessonEvents"]>([]);

    useEffect(() => {
      setFilteredLessons(studentData?.lessonEvents.filter(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, studentData]);


    const upcomingLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isAssigned && !lessonEvent.isComplete && lessonEvent.dueDate && new Date(lessonEvent.dueDate) > new Date()) ?? null;
    const previousLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isAssigned && lessonEvent.dueDate && new Date(lessonEvent.dueDate) <= new Date()) ?? null;

    return (
      <>
        <Breadcrumb pageName="Lessons" />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="sm:flex-1"><BackButton goBackToDash={goBackToDash} /></div>
          </div>
    
          <div className="row-start-2 col-span-full">
            <UpcomingLessons lessons={upcomingLessons}  backToParent={'/view-student-lessons'} />
          </div>
    
          <div className="row-start-3 col-span-full">
            <PreviousLessons lessons={previousLessons}  backToParent={'/view-student-lessons'} />
          </div>
        </div>
      </>
    );
  

};

export default Lessons;
