import React, { useState, useContext } from 'react';
import { HomeworkAssignment, HomeworkUploadTxtData, CalendarEvent } from './types';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { StudentUpdatesContext } from '/src/dashboard/context/StudentContext.tsx';
import { TeacherUpdatesContext } from '/src/dashboard/context/TeacherContext.tsx';

interface Props {
  homework: HomeworkAssignment;
  backToParent: string;
}

const HomeworkStudio: React.FC = () => {
  const context = useContext(StudentUpdatesContext) || useContext(TeacherUpdatesContext);

  const { handleUpdateHomework } = context;
  const location = useLocation();
  const { homework, backToParent } = location.state as Props;
  const navigate = useNavigate()
  const [textSubmission, setTextSubmission] = useState('');


  const handleTextSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken') || null;
    const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
    const apiUrl = `${serverAddress}/api/upload/HomeworkTxtUpload`;

    const data: HomeworkUploadTxtData = {
      text: textSubmission,
      id: homework.id,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Text submitted successfully');
        // Update local state or refetch data as needed
      } else {
        //TODO handle 401s unauthorized redirect to signin
        toast.error('Failed to submit text');
      }
    } catch (error) {
      toast.error('An error occurred during submission');
      console.error('Error submitting text:', error);
    }
  };


  // Reuse handleUpload from AssignedHomework.tsx for file and image uploads
  // Ensure handleUpload is modified to accept a parameter for endpoint URL
  const handleUploadDocument = async (id: number)  => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
      const documentUploadUrl = `${serverAddress}/api/upload/HomeworkDocumentUpload/${id}`;
  
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx';
      fileInput.addEventListener('change', async (event) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          const response = await fetch(documentUploadUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
          });
  
          if (response.ok) {
            const updated = await response.json();
            handleUpdateHomework(updated.homeworkAssignments, updated.calendarEvents )
            toast.success('Document uploaded successfully');
            navigate(backToParent)
          } else {
            toast.error('Error uploading document');
          }
        } else {
          toast.error('No document selected');
        }
      });
  
      fileInput.click();
    } catch (error) {
      toast.error('An error occurred during document upload');
      console.error('Error handling document upload:', error);
    }
  };
  
  const handleUploadImage = async (id: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
      const imageUploadUrl = `${serverAddress}/api/upload/HomeworkImgUpload/${id}`;
  
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/png, image/jpeg';
      fileInput.addEventListener('change', async (event) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          const response = await fetch(imageUploadUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
          });
          if (response.ok) {
            toast.success('Image uploaded successfully');
          } else {
            toast.error('Error uploading image');
          }
        } else {
          toast.error('No image selected');
        }
      });
      fileInput.click();
    } catch (error) {
      toast.error('An error occurred during image upload');
      console.error('Error handling image upload:', error);
    }
  };

  const handleCancel = () => {
    navigate(backToParent)
  }

  const BackToHomeworkButton = () => {
    return (
      <button type="button" onClick={handleCancel} className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <span>Go back</span>
      </button>
    );
  };

  return (
    <>
      <div>
      <div className="mb-6">
       
        <h2 className="font-medium text-black dark:text-white">Title</h2>
        <h2 >{homework.title}</h2>
        <BackToHomeworkButton/>

        <h2 className="font-medium text-black dark:text-white">Instructions</h2>
        <p>{homework.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <button className="inline-flex items-center justify-centIer rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6" onClick={() => handleUploadImage(homework.id ?? 0)}>
            Upload Document
          </button>
          <button className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6" onClick={() => handleUploadDocument(homework.id ?? 0)}>
            Upload Image
          </button>
        </div>  
        <div>
          <label className="mb-2.5 block text-black dark:text-white">
            Submission Content
          </label>
          <textarea
            rows={6}
            name="submissionContent"
            value={textSubmission}
            onChange={(e) => setTextSubmission(e.target.value)}
            placeholder="Type your message"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
          <button onClick={handleTextSubmit} className="mt-2 p-2 text-white bg-primary rounded">
            Submit Text
          </button>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default HomeworkStudio;