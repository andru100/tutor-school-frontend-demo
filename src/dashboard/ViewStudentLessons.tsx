
import { useState, useEffect, useContext } from "react"
import Breadcrumb from './Breadcrumb';
import TableThree from './TableThree';
import AssignedLessons from './Assignedlessons';
import CompleteLessons from './CompleteLessons';
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


    const assignedLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isAssigned && !lessonEvent.isComplete) ?? null;
    const completedLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isComplete) ?? null;

    return (
      <>
        <Breadcrumb pageName="Lessons" />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="sm:flex-1"><BackButton goBackToDash={goBackToDash} /></div>
          </div>
    
          <div className="row-start-2 col-span-full">
            <AssignedLessons lessons={assignedLessons}  backToParent={'/view-student-lessons'} />
          </div>
    
          <div className="row-start-3 col-span-full">
            <CompleteLessons lessons={completedLessons}  backToParent={'/view-student-lessons'} />
          </div>
        </div>
      </>
    );
  

};

export default Lessons;
