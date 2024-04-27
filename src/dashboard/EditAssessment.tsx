import React from 'react'
import { useState, useContext } from "react"
import { StudentAssessmentAssignment, CalendarEvent } from './types'
import { CancelButton } from './CancelButton.tsx';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import { teacherHandleUpdateAssessment } from '/src/dashboard/UpdateTeacher.tsx';



interface Props {
  backToParent: string;
  assessment: StudentAssessmentAssignment;
}

const EditAssessment: React.FC = () => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  
  const location = useLocation();
  const { assessment, backToParent } = location.state as Props;
  const [assessmentData, setAssessmentData] = useState<StudentAssessmentAssignment>(assessment);
  const navigate = useNavigate();

  const formattedDueDate = new Date(assessmentData.dueDate).toISOString().slice(0, 16);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const apiUrl = serverAddress + '/api/mutation/UpdateAssignment';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
        body: JSON.stringify( assessmentData ),
      });

      const result = await response.json();
      console.log('Mutation response:', result);
      teacherHandleUpdateAssessment(result.assessments, result.calendarEvents, setTeacherData)
      toast.success('Assessment successfully updated');
      navigate(backToParent)
      } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setAssessmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="flex flex-col">  
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">  
                  <div className="p-2.5 xl:p-5">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                      View Assessment
                    </h4>
                  </div>
                  <CancelButton backToParent={backToParent}/>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Assessment Details
                      </h3>
                    </div>
                    <form action="#" onSubmit={handleSubmit}>
                      <div className="p-6.5">
                        <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Assessment Type
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            name="assessmentId"
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            value={assessmentData?.assessmentId || ""}
                            onChange={handleInputChange}
                          >
                            <option value={0}>Select</option>
                            <option value={1}>11+ Math</option>
                            <option value={2}>11+ English</option>
                            {/* <option value={3}>11+ English</option> */}
                            <option value={4}>Sats All</option>
                            <option value={5}>Sats Math</option>
                            <option value={6}>Sats English</option>
                            <option value={7}>Sats Science</option>
                            <option value={8}>5-12 Coding</option>
                            <option value={9}>GCSE Comp-Science</option>
                          </select>
                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                              <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill=""
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div> 
                        <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Due Date
                          </label>
                          <input
                            name="dueDate"
                            type="datetime-local"
                            value={formattedDueDate|| ""}
                            onChange={handleInputChange}
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
                              onChange={handleInputChange}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        

                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                          update assignment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    )
  
}

export default EditAssessment;