
import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import CompleteAssessment from './CompleteAssessments';
import SubmittedAssessment from "./SubmittedAssessments";
import AssignedAssessments from './AssignedAssessments';
import CreateAssessment from "./CreateAssessment";
import EditAssessment from "./EditAssessment";
import Exam from "./Exam";
import { BackButton } from "./BackButton";
import {Student, StudentAssessmentAssignment, CalendarEvent} from './types'
import { useLocation } from 'react-router-dom';

interface Props {
  student: Student;
  goBackToDash: () => void; 
  handleDeleteAssessment: (id: number) => void;
  handleUpdateAssessment: (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => void;
  searchTerm: string;
}

const ViewStudentAssessments: React.FC = () => {
  const location = useLocation();
  const { student, handleDeleteAssessment, handleUpdateAssessment, searchTerm, goBackToDash } = location.state as Props;

  const [filteredAssessment, setFilteredAssessment] = useState<Student["assessments"]>([]);

  useEffect(() => {
      setFilteredAssessment(student.assessments.filter(assessment => assessment.title && assessment.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, student]);


  if (!student) {
    return <p>Loading assessment data...</p>; 
  }
 

  const assignedAssessments = filteredAssessment?.filter(assessment => assessment.isAssigned && !assessment.isSubmitted && !assessment.isGraded) ?? null;
  const submittedAssessments = filteredAssessment?.filter(assessment => assessment.isAssigned && assessment.isSubmitted && !assessment.isGraded) ?? null;
  const completedAssessments = filteredAssessment?.filter(assessment => assessment.isSubmitted && assessment.isGraded) ?? null;

  
  return (
    <>
      <Breadcrumb pageName={"Assessments"} />
      <div className="flex flex-col gap-10">
        {/* Row 1 with 3 columns */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="sm:flex-1"><BackButton goBackToDash={goBackToDash} /></div>
        </div>
  
        {/* Row 2 for AssignedAssessments */}
        <div className="row-start-2 col-span-full">
          <AssignedAssessments assessment={assignedAssessments}  handleUpdateAssessment={handleUpdateAssessment} handleDeleteAssessment={handleDeleteAssessment} backToParent={'/view-student-assessments'} />
        </div>
  
        {/* Row 3 for SubmittedAssessments */}
        {/* <div className="row-start-3 col-span-full">
          <SubmittedAssessment assessment={submittedAssessments}  handleDeleteAssessment={handleDeleteAssessment}/>
        </div> */}
  
        {/* Row 4 for CompleteAssessments */}
        <div className="row-start-4 col-span-full">
          <CompleteAssessment assessment={completedAssessments} handleUpdateAssessment={handleUpdateAssessment}  handleDeleteAssessment={handleDeleteAssessment} backToParent={'/view-student-assessments'} />
        </div>
      </div>
    </>
  );

 
};

export default ViewStudentAssessments;