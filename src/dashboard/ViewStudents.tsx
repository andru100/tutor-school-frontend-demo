import React from 'react'
import TeacherStudentDash from "./ViewTeacherStudentDash"
import { useState, useEffect } from "react"
import { Student} from "./types";
import { BackButton } from './BackButton';
import { useLocation } from 'react-router-dom';

interface Props {
  studentsData: Student[];
}

const ViewStudents: React.FC = () => {
  const location = useLocation();
  const { studentsData} = location.state as Props;
  const [studentID, setStudentID] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    setFilteredStudents(studentsData.filter(student => student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm]);



  const handleViewButtonClick = (id: string) => {
    setStudentID(id);
    setPage('view');
  };

  switch (page) {
    case "create":
      break;
    case 'view':
      const student = filteredStudents.find(student => student.studentId === studentID);
      if (student) {
        console.log("found student sending too viewstudentdash", student)
        return <TeacherStudentDash searchTerm={searchTerm} student={student} goBackToDash={goBackToDash}/>;
      }
    break;
    
    default :
      return  (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <BackButton goBackToDash={goBackToDash}/>
          <div className="flex flex-col">  
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">  
              <div className="p-2.5 xl:p-5">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                  Students
                </h4>
              </div>
            </div>
          </div>
          {filteredStudents.map((student: Student) => 
              <div key={student.studentId} className="flex flex-col">
                
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Name
                    </h5>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Stream
                    </h5>
                  </div>
                  <div className="hidden p-2.5 text-center sm:block xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Ungraded
                    </h5>
                  </div>
                  <div className="hidden p-2.5 text-center sm:block xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Last Score
                    </h5>
                  </div> 
                </div>

                <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
      
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{student.name}</p>
                  </div>
      
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                  `<p className="text-black dark:text-white">{student.stream}</p>
                  </div>
      
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">{filteredStudents.filter(student => student.homeworkAssignments?.some(homework => homework.isSubmitted && !homework.isGraded)).length}</p>
                  </div>
      
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-5">4.8%</p>
                  </div>
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <button
                      onClick={() => handleViewButtonClick(student.studentId)} 
                      className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6">
                      view
                    </button>   
                  </div>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  </div>
                </div>
            </div>
          )}
        </div>
      );
      
  }
}

export default ViewStudents;

