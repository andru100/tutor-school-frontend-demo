
import { useState, useEffect, useContext } from "react"
import Breadcrumb from './Breadcrumb';
import TableThree from '../charts/TableThree';
import AssignedLessons from '/src/dashboard/AssignedLessons.tsx';
import CompleteLessons from '/src/dashboard/CompleteLessons.tsx';
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import {Student , LessonEvent, CalendarEvent} from './types'
import { useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';


const Lessons: React.FC = () => {
  const { studentData, searchTerm} = useContext(UniversalContext);
  const [filteredLessons, setFilteredLessons] = useState<Student["lessonEvents"]>([]);

    useEffect(() => {
      setFilteredLessons(studentData?.lessonEvents.filter(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, studentData]);


    const upcomingLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isAssigned && !lessonEvent.isComplete && lessonEvent.dueDate && new Date(lessonEvent.dueDate) > new Date()) ?? null;
    const completeLessons = filteredLessons?.filter(lessonEvent => lessonEvent.isAssigned && lessonEvent.dueDate && new Date(lessonEvent.dueDate) <= new Date()) ?? null;

    return (
      <>
        <Breadcrumb pageName="Lessons" />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="sm:flex-1"></div>
          </div>
    
          <div className="row-start-2 col-span-full">
            <AssignedLessons lessons={upcomingLessons}/>
          </div>
    
          <div className="row-start-3 col-span-full">
            <CompleteLessons lessons={completeLessons}/>
          </div>
        </div>
      </>
    );
  

};

export default Lessons;
