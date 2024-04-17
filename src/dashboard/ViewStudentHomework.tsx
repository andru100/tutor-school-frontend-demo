
import { useState, useEffect } from "react"
import Breadcrumb from './Breadcrumb';
import CompleteHomework from './CompleteHomework';
import SubmittedHomework from "./SubmittedHomework";
import AssignedHomework from './AssignedHomework';
import CreateHomework from "./CreateHomework";
import EditHomework from "./EditHomework";
import HomeworkStudio from "./HomeworkStudio.tsx"
import {Student, HomeworkAssignment, CalendarEvent} from './types'
import { BackButton } from "./BackButton.tsx";

interface Props {
  student: Student;
  goBackToDash: () => void; 
  handleUpdateHomework: (update: HomeworkAssignment[], calendarData: CalendarEvent[]) => void;
  handleDeleteHomework: (id: number) => void;
  searchTerm: string;
}

const ViewStudentHomework: React.FC<Props> = ({student, handleUpdateHomework, handleDeleteHomework, searchTerm, goBackToDash}) => {
  const [page, setPage] = useState('home');
  const [homeworkId, setHomeworkId] = useState(0)
  const [filteredHomework, setFilteredHomework] = useState<HomeworkAssignment[]>([]);

  useEffect(() => {
    setFilteredHomework(student.homeworkAssignments.filter(homework => homework.title && homework.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, student]);

  const handleBackToHomework = (req: string, id: number) => {
    setHomeworkId(id)
    setPage(req);
  };

  const viewHomeworkStudio = (id: number) => {
    setHomeworkId(id)
    setPage('submit');
  }; 


  if (!student) {
    return <p>Loading homework data...</p>; 
  }
    
  if (page === 'create') {
    return (
      <>
        <Breadcrumb pageName={"Assign homework to " + student.name} />
        <CreateHomework  student={student}  backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework}/>
      </>
    );
  }
  
  if (page === 'edit') {
    const homeworkEvent = student.homeworkAssignments?.find(event => event.id === homeworkId);
    if (homeworkEvent) {
        return (
            <>
                <Breadcrumb pageName={"Edit homework for " + student.name} />
                <EditHomework homework={homeworkEvent} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework}/>
            </>
        );
    } else {
        console.log("Error: homework Event is undefined");
    }
  }

  if (page === 'submit') {
    const homeworkEvent = student.homeworkAssignments?.find(event => event.id === homeworkId);
    if (!homeworkEvent) {
        console.log("Error: homework Event is undefined");
        return null;
    }
    return (
      <>
        <Breadcrumb pageName={"Submit homework for " + student.name} />
        <HomeworkStudio homework={homeworkEvent} backToHomework={handleBackToHomework} handleUpdateHomework={handleUpdateHomework}/>
      </>
    );
  }

  

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


export default ViewStudentHomework;
