
import { useState, useEffect, useContext } from "react"
import Breadcrumb from './Breadcrumb';
import CompleteAssessment from './CompleteAssessments';
import SubmittedAssessment from "./SubmittedAssessments";
import AssignedAssessment from './AssignedAssessments';
import CreateAssessment from "./CreateAssessment";
import EditAssessment from "./EditAssessment";
import Exam from "./Exam";
import {CalendarEvent, Student, StudentAssessmentAssignment} from './types'
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import toast from 'react-hot-toast';




const ViewTeacherAssessments: React.FC = () => {
  const { teacherData, searchTerm} = useContext(UniversalContext);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [filteredAssessment, setFilteredAssessment] = useState<StudentAssessmentAssignment[]>([]);

  const students = teacherData.students
  const assessments = teacherData.assessments

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredAssessment(assessments?.filter(assessment => assessment.title && assessment.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, assessments]);
  

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

    const handleNavigateCreate = () => {
      if (!selectedStudent) {
        toast.error('You must select a student first');
        return
      }
      navigate('/create-assessment', { state: {selectedStudent} });
    };
  

    return (
      <>
        <Breadcrumb pageName={selectedStudent ? selectedStudent.name + "s Assessments" : "All Students Assessments"} />
        <div className="flex flex-col gap-10">
          {/* Row 1 with 3 columns */}
          <div className="flex flex-row justify-between items-center">
            <div className="ml-auto"></div>
            <div className="flex-1 flex justify-center">
              <select 
                id="students" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5" 
                onChange={(e) => setSelectedStudent(students.find(student => student.studentId === e.target.value) || null)}
              >
                <option value="">Select a student</option>
                {students?.map(student => (
                  <option key={student.studentId} value={student.studentId}>{student.name}</option>
                ))}
              </select>
            </div>
            <div className="ml-auto"><button onClick={handleNavigateCreate} className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6">Create</button></div>
          </div>
    
          {/* Row 2 for AssignedAssessments */}
          <div className="row-start-2 col-span-full">
            <AssignedAssessment assessment={assignedAssessments}/>
          </div>
    
          {/* Row 3 for SubmittedAssessments */}
          <div className="row-start-3 col-span-full">
            <SubmittedAssessment assessment={submittedAssessments}/>
          </div>
    
          {/* Row 4 for CompleteAssessments */}
          <div className="row-start-4 col-span-full">
            <CompleteAssessment assessment={completedAssessments}/>
          </div>
        </div>
      </>
    );
};

export default ViewTeacherAssessments;