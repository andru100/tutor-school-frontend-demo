
import { useState, useEffect, useContext} from "react"
import Breadcrumb from './Breadcrumb';
import CompleteHomework from './CompleteHomework';
import SubmittedHomework from "./SubmittedHomework";
import AssignedHomework from './AssignedHomework';
import CreateHomework from "./CreateHomework";
import EditHomework from "./EditHomework";
import HomeworkStudio from "./HomeworkStudio.tsx"
import {Student, HomeworkAssignment, CalendarEvent} from './types'
import { BackButton } from "./BackButton.tsx";
import { useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';


const ViewStudentHomework: React.FC = () => {

  const { studentData, searchTerm, goBackToDash, setGoBackToDash } = useContext(UniversalContext);
  const [filteredHomework, setFilteredHomework] = useState<HomeworkAssignment[]>([]);

  useEffect(() => {
    setFilteredHomework(studentData?.homeworkAssignments.filter(homework => homework.title && homework.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, studentData]);


  const assignedHomework = filteredHomework?.filter(homework => homework.isAssigned && !homework.isSubmitted && !homework.isGraded) ?? null;
  const submittedHomework = filteredHomework?.filter(homework => homework.isAssigned && homework.isSubmitted && !homework.isGraded) ?? null;
  const completedHomework = filteredHomework?.filter(homework => homework.isSubmitted && homework.isGraded) ?? null;

  
    
  return (
    <>
      <Breadcrumb pageName={"Homework"} />
      <div className="flex flex-col gap-10">
        {/* Row 1 with 3 columns */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="sm:flex-1"><BackButton goBackToDash={goBackToDash} /></div>
        </div>

        {/* Row 2 for AssignedHomework */}
        <div className="row-start-2 col-span-full">
          <AssignedHomework homework={assignedHomework} backToParent={'/view-student-homework'} />
        </div>

        {/* Row 3 for SubmittedHomework */}
        <div className="row-start-3 col-span-full">
          <SubmittedHomework homework={submittedHomework} backToParent={'/view-student-homework'} />
        </div>

        {/* Row 4 for CompleteHomework */}
        <div className="row-start-4 col-span-full">
          <CompleteHomework homework={completedHomework} backToParent={'/view-student-homework'} />
        </div>
      </div>
    </>
  );
};


export default ViewStudentHomework;
