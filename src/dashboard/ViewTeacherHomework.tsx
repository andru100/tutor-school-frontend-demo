
import { useState, useEffect, useContext } from "react"
import { useNavigate} from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import CompleteHomework from './CompleteHomework';
import SubmittedHomework from "./SubmittedHomework";
import AssignedHomework from './AssignedHomework'
import {Student, HomeworkAssignment} from './types'
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import toast from 'react-hot-toast';



const ViewTeacherHomework: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [filteredHomework, setFilteredHomework] = useState<HomeworkAssignment[]>([]);

  const { teacherData, searchTerm} = useContext(UniversalContext);
  
  const students = teacherData.students
  const homework = teacherData.homeworkAssignments

  useEffect(() => {
    setFilteredHomework(homework?.filter(homework => homework.title && homework.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, homework]);

  const navigate = useNavigate();

   
  const handleNavigateCreate = () => {
    if (!selectedStudent) {
      toast.error('You must select a student first');
      return
    } 
    navigate('/create-homework', { state: { selectedStudent} });
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
              <div className="ml-auto"></div>
              <div className="flex-1 flex justify-center">
                <select 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5" 
                  onChange={(e) => setSelectedStudent(students.find(student => student.studentId === e.target.value) || null)}>
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
              <AssignedHomework homework={assignedHomework}/>
            </div>
      
            {/* Row 3 for SubmittedHomework */}
            <div className="row-start-3 col-span-full">
              <SubmittedHomework homework={submittedHomework}/>
            </div>
      
            {/* Row 4 for CompleteHomework */}
            <div className="row-start-4 col-span-full">
              <CompleteHomework homework={completedHomework}/>
            </div>
          </div>
        </>
      );
};

export default ViewTeacherHomework;
