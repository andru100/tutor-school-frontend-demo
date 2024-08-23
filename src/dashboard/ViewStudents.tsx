import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Student } from "./types";
import Breadcrumb from '/src/dashboard/Breadcrumb'
import { UniversalContext } from '/src/context/UniversalContext.tsx';

const ViewStudents: React.FC = () => {
  const { teacherData, searchTerm, setStudentData} = useContext(UniversalContext);
  const studentsData = teacherData?.students;
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredStudents(studentsData?.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, studentsData]);

  const handleViewButtonClick = (id: string) => {
    const student = filteredStudents.find(student => student.studentId === id);
    if (student) {
      setStudentData(student);
      navigate('/teacher-student-dashboard');
    }
  };

  return (
    <>
      <Breadcrumb pageName={"Students"} />
      <div className="flex flex-col gap-10">
        {/* Row 1 with 3 columns */}
        <div className="flex flex-row justify-between items-center">
          <div className="ml-auto"></div>
          <div className="flex-1 flex justify-center">
          </div>
          <div className="ml-auto"></div>
        </div>

        {/* Row 2 for Student Table */}
        <div className="row-start-2 col-span-full">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Name</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Stream</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Ungraded</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Last Score</th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student: Student) => (
                    <tr key={student.studentId}>
                      <td className="py-5 px-4">{student.name}</td>
                      <td className="py-5 px-4">{student.stream}</td>
                      <td className="py-5 px-4">{student.homeworkAssignments?.filter(h => h.isSubmitted && !h.isGraded).length}</td>
                      <td className="py-5 px-4">4.8%</td>
                      <td className="py-5 px-4">
                        <button
                          onClick={() => handleViewButtonClick(student.studentId)}
                          className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudents;