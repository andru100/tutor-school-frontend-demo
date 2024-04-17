import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import AssignedLessons from './Assignedlessons';
import CompleteLessons from './CompleteLessons';
import CreateLesson from "./CreateLesson";
import EditLesson from "./EditLesson";
import { BackButton } from "./BackButton";
import { CreateButton } from "./CreateButton";
import {Teacher, Student, LessonEvent, CalendarEvent} from './types';

interface Props {
  lessons: LessonEvent[];
  students: Student[];
  goBackToDash: () => void;
  handleUpdateLesson: (update: LessonEvent[], calendarData: CalendarEvent[]) => void;
  handleDeleteLesson: (id: number) => void;
  searchTerm: string;
}

const ViewTeacherLessons: React.FC<Props> = ({ lessons, students, searchTerm, goBackToDash, handleUpdateLesson, handleDeleteLesson }) => {
  const [page, setPage] = useState('home');
  const [lessonId, setLessonId] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filteredLessons, setFilteredLessons] = useState<LessonEvent[]>([]);

  useEffect(() => {
    setFilteredLessons(lessons.filter(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, lessons]);


  const handleBackToLessons = (req: string, id: number) => {
    setLessonId(id);
    setPage(req);
  };

  if (!students) {
    return <p>Loading lesson data...</p>; 
  }

  const assignedLessons = selectedStudent
    ? filteredLessons?.filter(lesson =>
        lesson.isAssigned &&
        !lesson.isComplete &&
        lesson.studentId === selectedStudent.studentId
      ) ?? null
    : filteredLessons?.filter(lesson => lesson.isAssigned && !lesson.isComplete) ?? null;

  const completedLessons = selectedStudent
    ? filteredLessons?.filter(lesson =>
        lesson.isComplete &&
        lesson.studentId === selectedStudent.studentId
      ) ?? null
    : filteredLessons?.filter(lesson => lesson.isComplete) ?? null;

    if (page === 'create') {
        return (
          <>
            <Breadcrumb pageName={"Assign lesson to " + selectedStudent.name} />
            <CreateLesson student={selectedStudent} backToLessons={handleBackToLessons} handleUpdateLesson={handleUpdateLesson} />
          </>
        );
      }
      
      if (page === 'edit') {
        if (lessons) {
            const lessonEvent = lessons.find(lesson => lesson.id === lessonId);
            return (
                <>
                    <Breadcrumb pageName={"Edit lesson for " + lessonId} />
                    <EditLesson lesson= {lessonEvent} backToLessons={handleBackToLessons} handleUpdateLesson={handleUpdateLesson} />
                </>
            );
        } else {
            console.log("Error: Lesson Event is undefined");
        }
      }

      if (!students) {
        return <p>Loading lesson data...</p>; 
      }

      return (
        <>
          <Breadcrumb pageName={selectedStudent ? selectedStudent.name + "s Lessons" : "All Students Lessons"} />
          <div className="flex flex-col gap-10">
            {/* Row 1 with 3 columns */}
            <div className="flex flex-row justify-between items-center">
              <div className="ml-auto"><BackButton goBackToDash={goBackToDash}/></div>
              <div className="flex-1 flex justify-center">
                <select className="w-full max-w-xs" onChange={(e) => setSelectedStudent(students.find(student => student.studentId === e.target.value) || null)}>
                  <option value="">Select a student</option>
                  {students?.map(student => (
                    <option key={student.studentId} value={student.studentId}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div className="ml-auto"><CreateButton setPage={setPage}/></div>
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

export default ViewTeacherLessons;
