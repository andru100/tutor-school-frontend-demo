import React from 'react'
import { useState, useContext } from "react"
import { LessonEvent, CalendarEvent } from './types'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import { teacherHandleUpdateLesson } from '/src/dashboard/UpdateTeacher.tsx';



interface Props {
  lesson: LessonEvent;
}



const Viewlesson: React.FC = () => {
  const location = useLocation();
  const { lesson} = location.state as Props;
  
  const formattedDueDate = new Date(lesson.dueDate).toISOString().slice(0, 16);

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
          <form action="#" >
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title <span className="text-meta-1">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  value={lesson.title || ""}
                  readOnly
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
                  value={lesson.description || ""}
                  readOnly
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
                  value={lesson.links || ""}
                  readOnly
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

export default Viewlesson;