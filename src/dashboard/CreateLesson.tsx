import React, { useState, useContext } from "react"
import { Student, LessonEvent, CalendarEvent } from './types'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import { teacherHandleUpdateLesson } from '/src/dashboard/UpdateTeacher.tsx';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';





interface Props {
  selectedStudent: Student;
}

const CreateLesson: React.FC = () => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  const location = useLocation();
  const { selectedStudent } = location.state as Props;

  const [lessonData, seLessonData] = useState<LessonEvent>({
    id: null ,
    teacherId: null, // will get from auth
    studentId: selectedStudent.studentId,
    title: "",
    description: null,
    links: null,
    dueDate: null,
    isAssigned: true,
    isComplete: false,
    teacher: null,
    student: null
  });

  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS
      const apiUrl = serverAddress + '/api/mutation/AddLessonEvent';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(lessonData),
      });

      await handleFetchResponse(response, navigate)
      
      const jsonResponse = await response.json();
      teacherHandleUpdateLesson(jsonResponse.lessonEvents, jsonResponse.calendarEvents, setTeacherData);
      toast.success('Lesson created successfully');
      navigate(-1);
    } catch (error) {
      toast.error('An error occurred while creating the lesson');
      console.error('Error creating lesson:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    seLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="ml-auto"></div>
            <div className="flex flex-col">  
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">  
                <div className="p-2.5 xl:p-5">
                  <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Create Lesson
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
                          placeholder="Enter your title"
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
                          value={lessonData.dueDate|| ""}
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

export default CreateLesson;