import React from 'react'
import { useState, useContext } from "react"
import { LessonEvent, CalendarEvent } from './types'
import { BackButton } from './BackButton';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import { teacherHandleUpdateLesson } from '/src/dashboard/UpdateTeacher.tsx';



interface Props {
  lesson: LessonEvent;
  backToParent: string;
}



const EditLesson: React.FC = () => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  
  const location = useLocation();
  const { lesson, backToParent } = location.state as Props;
  const [lessonData, setLessonData] = useState<LessonEvent>(lesson);
  
  const navigate = useNavigate();
  const formattedDueDate = new Date(lessonData.dueDate).toISOString().slice(0, 16);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const apiUrl = serverAddress + '/api/mutation/UpdateLessonEvent';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
        body: JSON.stringify(lessonData),
      });

      const result = await response.json();
      teacherHandleUpdateLesson(result.lessonEvents, result.calendarEvents, setTeacherData)
      toast.success('Lesson successfully updated');
      navigate(backToParent)
    } catch (error) {
      toast.error('An error occurred while updating the homework');
      console.error('Error creating lesson:', error);
    }
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setLessonData((prevData) => ({
      ...prevData,
      isComplete: event.target.checked,
    }));
  };
  

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="ml-auto"><BackButton goBackToDash={backToParent}/></div>  
            <div className="flex flex-col">  
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">  
                <div className="p-2.5 xl:p-5">
                  <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Edit Lesson
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Lesson Details
                    </h3>
                  </div>
                  <form action="#" onSubmit={handleSubmit}>
                    <div className="p-6.5">
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Title <span className="text-meta-1">*</span>
                        </label>
                        <input
                          name="title"
                          type="text"
                          value={lessonData.title || ""}
                          onChange={handleInputChange}
                          placeholder="Enter your age"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Description
                        </label>
                        <textarea
                          rows={6}
                          name="description"
                          value={lessonData.description || ""}
                          onChange={handleInputChange}
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>

                      <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Links
                        </label>
                        <textarea
                          rows={6}
                          name="links"
                          value={lessonData.links || ""}
                          onChange={handleInputChange}
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Date and Time
                        </label>
                        <input
                          name="dueDate"
                          type="datetime-local"
                          value={formattedDueDate || ""}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Lesson Completed
                        </label>
                        <label className={`relative m-0 block h-7.5 w-14 rounded-full ${lessonData.isComplete ? 'bg-primary' : 'bg-stroke'}`}>
                          <input
                            type="checkbox"
                            checked={lessonData.isComplete || false}
                            onChange={handleCheckboxChange}
                            className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <span className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${lessonData.isComplete ? '!right-[3px] !translate-x-full' : ''}`}>
                            {/* Optional: Add icons or text inside the span to indicate state */}
                          </span>
                        </label>
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

export default EditLesson;