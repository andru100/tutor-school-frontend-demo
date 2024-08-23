import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import AssignedLessons from '/src/dashboard/AssignedLessons.tsx';
import CompleteLessons from '/src/dashboard/CompleteLessons.tsx';
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import { CreateButton } from "./CreateButton";
import {Teacher, Student, LessonEvent, CalendarEvent} from './types';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import toast from 'react-hot-toast';



const ViewTeacherLessons: React.FC = () => {

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filteredLessons, setFilteredLessons] = useState<LessonEvent[]>([]);
  const { teacherData, searchTerm} = useContext(UniversalContext);
  const students = teacherData.students
  const lessons = teacherData.lessonEvents

  const navigate = useNavigate();

  
  const handleNavigateCreate = () => {
    if (!selectedStudent) {
      toast.error('You must select a student first');
      return
    }
    navigate('/create-lesson', { state: {selectedStudent} });
  };

  useEffect(() => {
    setFilteredLessons(lessons?.filter(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, lessons]);


  if (!students) {
    return <p>Loading lesson data...</p>; 
  }

  const upcomingLessons = selectedStudent
  ? filteredLessons?.filter(lesson =>
      lesson.isAssigned &&
      lesson.dueDate && new Date(lesson.dueDate) > new Date() &&
      lesson.studentId === selectedStudent.studentId
    ) ?? null
  : filteredLessons?.filter(lesson => lesson.isAssigned && lesson.dueDate && new Date(lesson.dueDate) > new Date()) ?? null;

  const completeLessons = selectedStudent
  ? filteredLessons?.filter(lesson =>
      lesson.isAssigned &&
      lesson.dueDate && new Date(lesson.dueDate) <= new Date() &&
      lesson.studentId === selectedStudent.studentId
    ) ?? null
  : filteredLessons?.filter(lesson => lesson.isAssigned && lesson.dueDate && new Date(lesson.dueDate) <= new Date()) ?? null; 

   


      if (!students) {
        return <p>Loading lesson data...</p>; 
      }


      return (
        <>
          <Breadcrumb pageName={selectedStudent ? selectedStudent.name + "s Lessons" : "All Students Lessons"} />
          <div className="flex flex-col gap-10">
            {/* Row 1 with 3 columns */}
            <div className="flex flex-row justify-between items-center">
              <div className="ml-auto"></div>
              <div className="flex-1 flex justify-center">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"  
                  onChange={(e) => setSelectedStudent(students.find(student => student.studentId === e.target.value) || null)}>
                  <option value="">Select a student</option>
                  {students?.map(student => (
                    <option key={student.studentId} value={student.studentId}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div className="ml-auto"><button onClick={handleNavigateCreate} className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6">Create</button></div>
         
            </div>
      
            {/* Row 2 for UpcomingLessons */}
            <div className="row-start-2 col-span-full">
              <AssignedLessons lessons={upcomingLessons}/>
            </div>
      
            {/* Row 3 for CompleteLessons */}
            <div className="row-start-3 col-span-full">
              <CompleteLessons lessons={completeLessons}/>
            </div>
          </div>
        </>
      );
};

export default ViewTeacherLessons;
