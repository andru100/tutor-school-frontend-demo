import React from 'react'
import { useState, useContext } from "react"
import { StudentAssessmentAssignment, CalendarEvent } from './types'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import { teacherHandleUpdateAssessment } from '/src/dashboard/UpdateTeacher.tsx';



interface Props {
  assessment: StudentAssessmentAssignment;
}

const ViewAssessment: React.FC = () => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  const location = useLocation();
  const { assessment } = location.state as Props;
  const [assessmentData, setAssessmentData] = useState<StudentAssessmentAssignment>(assessment);

  const formattedDueDate = new Date(assessmentData.dueDate).toISOString().slice(0, 16);

    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">  
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">  
            <div className="p-2.5 xl:p-5">
              <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                View Assessment
              </h4>
            </div>
          <div className="ml-auto"></div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Assessment Details
            </h3>
          </div>
          <form action="#" >
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Assessment Type
                </label>
                <input
                  type="text"
                  value={assessmentData?.assessmentId  || ""}
                  readOnly
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Due Date
                </label>
                <input
                  name="dueDate"
                  type="datetime-local"
                  value={formattedDueDate|| ""}
                  readOnly
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Grade
                  </label>
                  <input
                    name="score"
                    type="number"
                    value={assessmentData?.score || ""}
                    readOnly
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  
}

export default ViewAssessment;