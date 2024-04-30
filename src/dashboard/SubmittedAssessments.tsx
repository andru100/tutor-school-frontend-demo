import { useState, useEffect, useContext} from "react"
import { StudentAssessmentAssignment, CalendarEvent } from "./types"
import Breadcrumb from './Breadcrumb';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import { teacherHandleDeleteAssessment } from '/src/dashboard/UpdateTeacher.tsx';



interface Props {
    assessment: StudentAssessmentAssignment[];
    backToParent: string;
};

const SubmittedAssessments: React.FC<Props> = ({assessment, backToParent}) => {

  const { role, setTeacherData }  = useContext(UniversalContext);
  
  const [upcomingAssessment, setUpcomingAssessment] = useState(assessment);

  const navigate = useNavigate(); 

  const handleViewAssessment = ( assessment: StudentAssessmentAssignment) => {
    navigate('/view-assessment', { state: { assessment, backToParent } });
  };
  
  const handleEditAssessment = ( assessment: StudentAssessmentAssignment) => {
    navigate('/edit-assessment', { state: { assessment, backToParent } });
  };

  useEffect(() => {
    setUpcomingAssessment(assessment);
  }, [assessment]);


  const handleDelete = async (assessmentId: number) => {

    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const input = {
        id: assessmentId,
      }

      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const apiUrl = serverAddress + '/api/mutation/DeleteAssessmentAssignmet';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
        body: JSON.stringify({ input }),
      });

      if (response.status === 200) {
        if (role === 'Teacher') {
          teacherHandleDeleteAssessment(assessmentId, setTeacherData);
        } else {
          throw new Error('unable to ascertain role, role is: ', role);
        }
        toast.success("Delete successful");
      } else {
        console.error("Error deleting assessment, response code: ", response.status);
        toast.error("Unable to delete assessment");
      }
    } catch (error) {
      toast.error('An error occurred during deletion');
      console.error("Error occured in handleDelete:", error);
    }
  };



  const SubmittedAssessments = () => {
      return upcomingAssessment?.map((event) => (
        <tbody key={event.id}>
        <tr className="bg-white dark:border-strokedark dark:bg-boxdark">
          <td className="py-5 px-4 dark:border-strokedark w-1/4">
            <h5 className="font-medium text-black dark:text-white">
              {event.title}
            </h5>
          </td>
          <td className="py-5 px-4 dark:border-strokedark w-1/4">
            <p className="text-black dark:text-white">{new Date(event.submissionDate).toLocaleDateString('en-UK')}</p>
          </td>
          <td className="py-5 px-4 dark:border-strokedark w-1/4">
            <p className="text-black dark:text-white">{event.score}</p>
          </td>
          <td className="py-5 px-4 dark:border-strokedark w-1/4">
            <div className="flex items-center space-x-3.5">
            <button className="hover:text-primary" onClick={() => handleViewAssessment(event)} title='View'>
              <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
            </button>
            {role === 'Teacher' && (
              <>
                <button className="hover:text-primary" onClick={() => handleEditAssessment(event)}>
                  <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
                <button className="hover:text-primary" onClick={() => handleDelete(event.id ?? 0)} title="Delete">
                  <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
                </>
                )}
                <button className="hover:text-primary">
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>

      ))
  }; 


  if (!upcomingAssessment || upcomingAssessment?.length === 0) {
    return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Submitted" />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Title
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Submitted Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Score
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <p>No assessment available.</p>
    </div>

    )
  }


    
  return (
    
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Submitted" />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Title
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Submitted Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Score
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white w-1/4">
                Actions
              </th>
            </tr>
          </thead>
          <SubmittedAssessments />
        </table>
      </div>
    </div>
  );
};

export default SubmittedAssessments;
