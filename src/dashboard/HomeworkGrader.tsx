import React from 'react'
import { useState, useContext } from "react"
import { HomeworkAssignment, CalendarEvent } from './types.tsx'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import { teacherHandleUpdateHomework} from '/src/dashboard/UpdateTeacher.tsx';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';




interface Props {
  homework: HomeworkAssignment;
}


const HomeworkGrader: React.FC = () => {

  const { role, setTeacherData }  = useContext(UniversalContext);

  
  const location = useLocation();
  const {homework} = location.state as Props;
  const [homeworkData, setHomeworkData] = useState<HomeworkAssignment>(homework);

  const navigate = useNavigate();
  const formattedDueDate = new Date(homeworkData.dueDate).toISOString().slice(0, 16);
  const formattedSubmissionDate = homeworkData.submissionDate ? new Date(homeworkData.submissionDate).toISOString().slice(0, 16) : null;
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    homeworkData.isGraded = true;
    homeworkData.gradedDate = new Date();
    try {
        const accessToken = localStorage.getItem('accessToken') || null;
        const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
        const apiUrl = serverAddress + '/api/mutation/UpdateHomework';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(homeworkData),
        });

        await handleFetchResponse(response, navigate);
        const jsonResponse = await response.json();
        
        teacherHandleUpdateHomework(jsonResponse.homeworkAssignments, jsonResponse.calendarEvents, setTeacherData);
        toast.success('Homework successfully updated');
        navigate(-1);
    } catch (error) {
        toast.error('An error occurred while updating the homework');
        console.error('Error updating homework:', error);
    }
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setHomeworkData((prevData) => ({
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
                    Grade Homework
                  </h4>
                </div>
                <div className="ml-auto"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Homework Details
                    </h3>
                  </div>
                  <form action="#" onSubmit={handleSubmit}>
                    <div className="p-6.5">
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Title <span className="text-meta-1">*</span>
                        </label>
                        <input
                          name="title"
                          type="text"
                          value={homeworkData.title || ""}
                          readOnly
                          placeholder="Enter your age"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Instructions
                        </label>
                        <textarea
                          rows={6}
                          name="description"
                          value={homeworkData.description || ""}
                          readOnly
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
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
                          Submission Date
                        </label>
                        <input
                          name="submissionDate"
                          type="datetime-local"
                          value={formattedSubmissionDate || ""}
                          readOnly
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Submission Content
                        </label>
                        <textarea
                          rows={6}
                          name="submissionContent"
                          value={homeworkData.submissionContent || ""}
                          readOnly
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          AI feedback
                        </label>
                        <textarea
                          rows={6}
                          name="aiFeedback"
                          value={homeworkData.aiFeedback || ""}
                          readOnly
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Teacher Feedback
                        </label>
                        <textarea
                          rows={6}
                          name="teacherFeedback"
                          value={homeworkData.teacherFeedback || ""}
                          onChange={handleInputChange}
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>
                      <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Grade
                          </label>
                          <input
                            name="grade"
                            type="number"
                            value={homeworkData.grade || ""}
                            onChange={handleInputChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>

                      

                      <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                        Save Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
  )
  
}

export default HomeworkGrader;