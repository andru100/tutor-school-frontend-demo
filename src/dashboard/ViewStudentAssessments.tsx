
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

interface Props {
  student: Student;
  goBackToDash: () => void; 
  handleUpdateAssessment:(update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteAssessment: (id: number) => void;
  searchTerm: string;
}

const ViewStudentAssessments: React.FC<Props> = ({student, handleUpdateAssessment,  handleDeleteAssessment, searchTerm, goBackToDash}) => {

  const [page, setPage] = useState('home');
  const [assignmentId, setAssignmentId] = useState(0)

  const [filteredAssessment, setFilteredAssessment] = useState<Student["assessments"]>([]);

  useEffect(() => {
      //console.log("searchterm is  ", searchTerm);
      setFilteredAssessment(student.assessments.filter(assessment => assessment.title && assessment.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, student]);

  const handleBackToAssessment = (req: string, id: number) => {
    setAssignmentId(id);
    setPage(req);
  };


  if (!student) {
    return <p>Loading assessment data...</p>; 
  }
    
  if (page === 'create') {
    return (
      <>
        <Breadcrumb pageName={"Assign assessment to " + student.name} />
        <CreateAssessment student={student} backToAssessment={handleBackToAssessment} handleUpdateAssessment={handleUpdateAssessment}/>
        
      </>
    );
  }
  
  if (page === 'edit') {
    const assessmentEvent = student.assessments?.find(event => event.id === assignmentId);
    if (assessmentEvent) {
      console.log("bout to open edit assessments data is :", assessmentEvent)
        return (
            <>
                <Breadcrumb pageName={"Edit assessment for " + student.name} />
                <EditAssessment assessment={assessmentEvent} backToAssessment={handleBackToAssessment} handleUpdateAssessment={handleUpdateAssessment}/>
            </>
        );
    } else {
        console.log("Error: assessment Event is undefined");
    }
  }

  if (page === 'exam') {
    const assessmentEvent = student.assessments?.find(event => event.id === assignmentId);
    if (assessmentEvent) {
        return (
            <>
                <Breadcrumb pageName={student.name + " "+ assessmentEvent.title + " exam"} />
                <Exam assignment={assessmentEvent} backToAssessment={handleBackToAssessment} handleUpdateAssessment={handleUpdateAssessment}/>
            </>
        );
    } else {
        console.log("Error: assessment Event is undefined");
    }
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
          <AssignedAssessments assessment={assignedAssessments} backToAssessment={handleBackToAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
        </div>
  
        {/* Row 3 for SubmittedAssessments */}
        {/* <div className="row-start-3 col-span-full">
          <SubmittedAssessment assessment={submittedAssessments} backToAssessment={handleBackToAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
        </div> */}
  
        {/* Row 4 for CompleteAssessments */}
        <div className="row-start-4 col-span-full">
          <CompleteAssessment assessment={completedAssessments} backToAssessment={handleBackToAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
        </div>
      </div>
    </>
  );

 
};

export default ViewStudentAssessments;