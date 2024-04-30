import React from 'react'
import { useState, useContext } from "react"
import { Student, HomeworkAssignment, CalendarEvent, HomeworkStream} from './types'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import { teacherHandleUpdateLesson } from '/src/dashboard/UpdateTeacher.tsx';
import { teacherHandleUpdateHomework } from './UpdateTeacher.tsx';
import { BackButton } from './BackButton.tsx';



interface Props {
  selectedStudent: Student;
  backToParent: string;
}


const CreateHomework: React.FC = () => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  
  const location = useLocation();
  const { selectedStudent, backToParent } = location.state as Props;
  const navigate = useNavigate()

  const [homeworkData, setHomeworkData] = useState<HomeworkAssignment>({
    id: null,
    teacherId: null, // get from auth
    studentId: selectedStudent.studentId,
    stream: null,
    title: null,
    description: null,
    date: new Date().toISOString().split('T')[0],
    dueDate: null,
    isAssigned: true,
    isSubmitted: false,
    isGraded: false,
    grade: null,
    aiFeedback: null,
    teacherFeedback: null, 
    submissionDate: null,
    submissionContent: null,
    submissionContentType: null,
    teacher: null,
    student: null
});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const apiUrl = serverAddress + '/api/mutation/AddHomework';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
        body: JSON.stringify(homeworkData ),
      });

      // TODO make sure http responses outside 200 trigger error .. if not add condition for 400 404 etc
      const result = await response.json();
      teacherHandleUpdateHomework( result.homeworkAssignments, result.calendarEvents, setTeacherData);
      toast.success('Homework created successfully');
      navigate(backToParent)
    } catch (error) {
      toast.error('An error occurred while creating the homework');
      console.error('Error creating homework:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setHomeworkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStreamInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setHomeworkData((prevData) => ({
      ...prevData,
      [name]: HomeworkStream[value as keyof typeof HomeworkStream],
    }));
  };



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="ml-auto"><BackButton goBackToDash={backToParent}/></div>
            <div className="flex flex-col">  
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">  
                <div className="p-2.5 xl:p-5">
                  <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Create Homework
                  </h4>
                </div>
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
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Title <span className="text-meta-1">*</span>
                        </label>
                        <input
                          name="title"
                          type="text"
                          value={homeworkData.title || ""}
                          onChange={handleInputChange}
                          placeholder="create a title"
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
                          onChange={handleInputChange}
                          placeholder="Type your message"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Stream <span className="text-meta-1">*</span>
                        </label>
                        <select
                          name="stream"
                          value={HomeworkStream[homeworkData.stream]}
                          onChange={handleStreamInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="" disabled={homeworkData.stream !== null}>
                            {homeworkData.stream !== null ? HomeworkStream[homeworkData.stream] : 'Select a stream'}
                          </option>
                          {Object.keys(HomeworkStream)
                            .filter((key) => isNaN(Number(key)))
                            .map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Due Date
                        </label>
                        <input
                          name="dueDate"
                          type="datetime-local"
                          value={homeworkData.dueDate|| ""}
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

export default CreateHomework;