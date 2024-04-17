
import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import CompleteHomework from './CompleteHomework';
import SubmittedHomework from "./SubmittedHomework";
import AssignedHomework from './AssignedHomework';
import CreateHomework from "./CreateHomework";
import EditHomework from "./EditHomework";
import HomeworkStudio from "./HomeworkStudio.tsx"
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import {Student, HomeworkAssignment, CalendarEvent} from './types'
import { BackButton } from "./BackButton.tsx";

interface Props {
  homework: HomeworkAssignment[]
  students: Student[]
  goBackToDash: () => void; 
  handleUpdateHomework: (update: HomeworkAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteHomework: (id: number) => void;
  searchTerm: string;
}

const ViewTeacherHomework: React.FC<Props> = ({homework, students, searchTerm, goBackToDash, handleUpdateHomework, handleDeleteHomework}) => {
  const [page, setPage] = useState('home');
  const [homeworkId, setHomeworkId] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [filteredHomework, setFilteredHomework] = useState<HomeworkAssignment[]>([]);

  useEffect(() => {
    setFilteredHomework(homework.filter(homework => homework.title && homework.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, homework]);
  
  const handleBackToHomework = (req: string, id: number) => {
    setHomeworkId(id)
    setPage(req);
  };

  const viewHomeworkStudio = (id: number) => {
    setHomeworkId(id)
    setPage('submit');
  }; 


  if (!students) {
    return <p>Loading homework data...</p>; 
  }
    
  if (page === 'create') {
    if (selectedStudent) {
      return (
        <>
          <Breadcrumb pageName={"Assign homework to " + selectedStudent.name} />
          <CreateHomework  student={selectedStudent}  backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework}/>
        </>
      );
    }
  }
  
  if (page === 'edit') {
    
    if (homework) {
        const homeworkEvent = homework?.find(event => event.id === homeworkId);
        return (
            <>
                <Breadcrumb pageName={"Edit homework for " + homeworkEvent.id} />
                <EditHomework homework={homeworkEvent} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework}/>
            </>
        );
    } else {
        console.log("Error: homework Event is undefined");
    }
  }

  if (page === 'submit') {
    if (homework) {
      // const homeworkEvent = student.homeworkAssignments?.find(event => event.id === homeworkId);
      const homeworkEvent = homework?.find(event => event.id === homeworkId);
      if (!homeworkEvent) {
          console.log("Error: homework Event is undefined");
          return null;
      }
      return (
        <>
          <Breadcrumb pageName={"Submit homework for " + homeworkEvent.title} />
          <HomeworkStudio homework={homeworkEvent} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework}/>
        </>
      );
    }
  }

  

  const assignedHomework = selectedStudent
    ? filteredHomework?.filter(homework => 
        homework.isAssigned && 
        !homework.isSubmitted && 
        !homework.isGraded &&
        homework.studentId === selectedStudent.studentId
      ) ?? null
    : filteredHomework?.filter(homework => 
        homework.isAssigned && 
        !homework.isSubmitted && 
        !homework.isGraded
      ) ?? null;

  const submittedHomework = selectedStudent
    ? filteredHomework?.filter(homework => 
        homework.isAssigned && 
        homework.isSubmitted && 
        !homework.isGraded &&
        homework.studentId === selectedStudent.studentId
      ) ?? null
    : filteredHomework?.filter(homework => 
        homework.isAssigned && 
        homework.isSubmitted && 
        !homework.isGraded
      ) ?? null;

  const completedHomework = selectedStudent
    ? filteredHomework?.filter(homework => 
        homework.isSubmitted && 
        homework.isGraded &&
        homework.studentId === selectedStudent.studentId
      ) ?? null
    : filteredHomework?.filter(homework => 
        homework.isSubmitted && 
        homework.isGraded
      ) ?? null;

      
  

      return (
        <>
          <Breadcrumb pageName={selectedStudent ? selectedStudent.name + "s Homework" : "All Students Homework"} />
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
              <div className="ml-auto"><button onClick={() => setPage("create")} className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6">Create</button></div>
            </div>
      
            {/* Row 2 for AssignedHomework */}
            <div className="row-start-2 col-span-full">
              <AssignedHomework homework={assignedHomework} viewHomeworkStudio={viewHomeworkStudio} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework} handleDeleteHomework={handleDeleteHomework}/>
            </div>
      
            {/* Row 3 for SubmittedHomework */}
            <div className="row-start-3 col-span-full">
              <SubmittedHomework homework={submittedHomework} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework} handleDeleteHomework={handleDeleteHomework}/>
            </div>
      
            {/* Row 4 for CompleteHomework */}
            <div className="row-start-4 col-span-full">
              <CompleteHomework homework={completedHomework} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework} handleDeleteHomework={handleDeleteHomework}/>
            </div>
          </div>
        </>
      );
};

export default ViewTeacherHomework;
