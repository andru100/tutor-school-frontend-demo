
import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
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
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';


const ViewTeacherHomework: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [filteredHomework, setFilteredHomework] = useState<HomeworkAssignment[]>([]);

  const { teacherData, searchTerm, goBackToDash, setGoBackToDash } = useContext(UniversalContext);
  const students = teacherData.students
  const homework = teacherData.homeworkAssignments

  useEffect(() => {
    setFilteredHomework(homework?.filter(homework => homework.title && homework.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, homework]);

  const navigate = useNavigate();

   
  const handleNavigateCreate = () => {
    navigate('/create-homework', { state: { selectedStudent, backToParent: '/view-teacher-homework' } });
  };

  

  


  if (!students) {
    return <p>Loading homework data...</p>; 
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
              <div className="ml-auto"><button onClick={handleNavigateCreate} className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6">Create</button></div>
            </div>
      
            {/* Row 2 for AssignedHomework */}
            <div className="row-start-2 col-span-full">
              <AssignedHomework homework={assignedHomework} backToParent={'/view-teacher-homework'} />
            </div>
      
            {/* Row 3 for SubmittedHomework */}
            <div className="row-start-3 col-span-full">
              <SubmittedHomework homework={submittedHomework} backToParent={'/view-teacher-homework'} />
            </div>
      
            {/* Row 4 for CompleteHomework */}
            <div className="row-start-4 col-span-full">
              <CompleteHomework homework={completedHomework} backToParent={'/view-teacher-homework'} />
            </div>
          </div>
        </>
      );
};

export default ViewTeacherHomework;
