
import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import CompleteAssessment from './CompleteAssessments';
import SubmittedAssessment from "./SubmittedAssessments";
import AssignedAssessment from './AssignedAssessments';
import CreateAssessment from "./CreateAssessment";
import EditAssessment from "./EditAssessment";
import Exam from "./Exam";
import {CalendarEvent, Student, StudentAssessmentAssignment} from './types'
import { BackButton } from "./BackButton";

interface Props {
  assessments: StudentAssessmentAssignment[]
  students: Student[]
  goBackToDash: () => void; 
  handleUpdateAssessment: (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteAssessment: (id: number) => void;
  searchTerm: string;
}

const ViewTeacherAssessments: React.FC<Props> = ({students, assessments, searchTerm, goBackToDash, handleUpdateAssessment, handleDeleteAssessment}) => {
  const [page, setPage] = useState('home');
  const [assignmentId, setAssignmentId] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [filteredAssessment, setFilteredAssessment] = useState<StudentAssessmentAssignment[]>([]);

  useEffect(() => {
    setFilteredAssessment(assessments.filter(assessment => assessment.title && assessment.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, assessments]);
  
  const handleBackToAssessment = (req: string, id: number) => {
    setAssignmentId(id);
    setPage(req);
  };


  if (!students) {
    return <p>Loading assessment data...</p>; // Or a loading indicator
  }
    
  if (page === 'create') {
    if (selectedStudent) {
      return (
        <>
          <Breadcrumb pageName={"Assign homework to " + selectedStudent.name} />
          <CreateAssessment student={selectedStudent} backToAssessment={handleBackToAssessment} handleUpdateAssessment={handleUpdateAssessment}/>
          
        </>
      );
    }
  }
  
  if (page === 'edit') {
    
    // if (assessments) {
    const assessmentEvent = assessments?.find(event => event.id === assignmentId);
    if (assessmentEvent) {  
        console.log("bout to open edit assessments data is :", assessmentEvent)
        return (
            <>
                <Breadcrumb pageName={"Edit assessment for " + assessmentEvent.id} />
                <EditAssessment assessment={assessmentEvent} backToAssessment={handleBackToAssessment} handleUpdateAssessment={handleUpdateAssessment}/>
            </>
        );
    } else {
        console.log("Error: assessment Event is undefined");
    }
  }

  if (page === 'exam') {
    const assessmentEvent = assessments?.find(event => event.id === assignmentId);
    if (assessmentEvent) {
        return (
            <>
                <Breadcrumb pageName={assessmentEvent.id + " "+ assessmentEvent.title + " exam"} />
                <Exam assignment={assessmentEvent} backToAssessment={handleBackToAssessment}  handleUpdateAssessment={handleUpdateAssessment}/>
            </>
        );
    } else {
        console.log("Error: assessment Event is undefined");
    }
  }

  
  const assignedAssessments = selectedStudent
  ? filteredAssessment?.filter(assessment => 
      assessment.isAssigned && 
      !assessment.isSubmitted && 
      !assessment.isGraded &&
      assessment.studentId === selectedStudent.studentId
    ) ?? null
  : filteredAssessment?.filter(assessment => 
      assessment.isAssigned && 
      !assessment.isSubmitted && 
      !assessment.isGraded
    ) ?? null;

const submittedAssessments = selectedStudent
  ? filteredAssessment?.filter(assessment => 
      assessment.isAssigned && 
      assessment.isSubmitted && 
      !assessment.isGraded &&
      assessment.studentId === selectedStudent.studentId
    ) ?? null
  : filteredAssessment?.filter(assessment => 
      assessment.isAssigned && 
      assessment.isSubmitted && 
      !assessment.isGraded
    ) ?? null;

const completedAssessments = selectedStudent
  ? filteredAssessment?.filter(assessment => 
      assessment.isSubmitted && 
      assessment.isGraded &&
      assessment.studentId === selectedStudent.studentId
    ) ?? null
  : filteredAssessment?.filter(assessment => 
      assessment.isSubmitted && 
      assessment.isGraded
    ) ?? null;
  

    return (
      <>
        <Breadcrumb pageName={selectedStudent ? selectedStudent.name + "s Assessments" : "All Students Assessments"} />
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
    
          {/* Row 2 for AssignedAssessments */}
          <div className="row-start-2 col-span-full">
            <AssignedAssessment assessment={assignedAssessments} backToAssessment={handleBackToAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
          </div>
    
          {/* Row 3 for SubmittedAssessments */}
          <div className="row-start-3 col-span-full">
            <SubmittedAssessment assessment={submittedAssessments} backToAssessment={handleBackToAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
          </div>
    
          {/* Row 4 for CompleteAssessments */}
          <div className="row-start-4 col-span-full">
            <CompleteAssessment assessment={completedAssessments} backToAssessment={handleBackToAssessment} handleDeleteAssessment={handleDeleteAssessment}/>
          </div>
        </div>
      </>
    );
};

export default ViewTeacherAssessments;