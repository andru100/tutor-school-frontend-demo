import { useState, useEffect, useContext } from "react"
import { HomeworkAssignment, CalendarEvent } from "./types"
import Breadcrumb from './Breadcrumb';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import {teacherHandleDeleteHomework } from '/src/dashboard/UpdateTeacher.tsx';


interface Props {
    homework: HomeworkAssignment[];
    backToParent: string;
};



const CompleteHomework: React.FC<Props> = ({homework,  backToParent}) => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  
  const [upcomingHomework, setUpcomingHomework] = useState(homework);

  const navigate = useNavigate();

  const handleViewHomeworkGrader = ( homework: HomeworkAssignment) => {
    navigate('/grade-homework', { state: { homework, backToParent } });
  };

  const handleViewHomework = ( homework: HomeworkAssignment) => {
    navigate('/view-homework', { state: { homework, backToParent } });
  };

  useEffect(() => {
    setUpcomingHomework(homework);
  }, [homework]);


  const handleDelete = async (homeworkId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const input = {
        id: homeworkId,
      }

      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const apiUrl = serverAddress + '/api/account/DeleteHomeworkAssignment';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
        body: JSON.stringify( input ),
      });

      if (!response.ok) {
        toast.error('Failed to delete homework');
        throw new Error('Failed to delete homework response is ' + JSON.stringify(response));
      }

      

      if (role === 'Teacher') {
        teacherHandleDeleteHomework(homeworkId, setTeacherData);
      } else {
        throw new Error('unable to ascertain role, role is: ', role);
      }
      toast.success('Homework deleted successfully');
      
    } catch (error) {
      console.error('Error deleting homework:', error);
    }
  };


  const CompleteHomeworks = () => {
      return upcomingHomework?.map((event) => (
        <tbody key={event.id}>
          <tr className="bg-white dark:border-strokedark dark:bg-boxdark">
            <td className="py-5 px-4 dark:border-strokedark w-1/4">
              <h5 className="font-medium text-black dark:text-white">
                {event.title}
              </h5>
              <p className="text-sm">{event.description}</p>
            </td>
            <td className="py-5 px-4 dark:border-strokedark w-1/4">
              <p className="text-black dark:text-white">{new Date(event.gradedDate).toLocaleDateString('en-UK')}</p>
            </td>
            <td className="py-5 px-4 dark:border-strokedark w-1/4">
              <div className="flex items-center space-x-3.5">
              <button className="hover:text-primary" onClick={() => handleViewHomework(event)} title='View homework'>
                <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
              </button>
              {role === 'Teacher' && (
              <>
                <button className="hover:text-primary" onClick={() => handleDelete(event.id ?? 0)} title="Delete">
                  <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
                <button className="hover:text-primary" onClick={() => handleViewHomeworkGrader(event)} title='Grade Homework'>
                  <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
                </button>
                </>
                )}
              </div>
            </td>
          </tr>
        </tbody>

      ))
  }; 


  if (!upcomingHomework || upcomingHomework?.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Breadcrumb pageName="Graded" />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                  Title
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                  Graded Date
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <p>No homework available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Graded" />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Title
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Graded Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Actions
              </th>
            </tr>
          </thead>
          <CompleteHomeworks />
        </table>
      </div>
    </div>
  );
};

export default CompleteHomework;