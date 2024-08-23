import React, { useState, useContext } from 'react';
import { HomeworkAssignment, HomeworkUploadTxtData } from './types';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import { teacherHandleUpdateHomework } from '/src/dashboard/UpdateTeacher.tsx';
import { studentHandleUpdateHomework } from '/src/dashboard/UpdateStudent.tsx';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';

interface Props {
  homework: HomeworkAssignment;
}

const HomeworkStudio: React.FC = () => {
  const { role, setTeacherData, setStudentData }  = useContext(UniversalContext);
  const location = useLocation();
  const { homework } = location.state as Props;
  const navigate = useNavigate();
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

      await handleFetchResponse(response, navigate);
      const result = await response.json();
      if (role === 'Teacher') {
        teacherHandleUpdateHomework(result.homeworkAssignments, result.calendarEvents, setTeacherData);
      } else if (role === 'Student') {
        studentHandleUpdateHomework(result.homeworkAssignments, result.calendarEvents, setStudentData);
      }
      toast.success('Homework submitted successfully');
      navigate(-1);
    } catch (error) {
      toast.error('An error occurred during submission');
      console.error('Error submitting text:', error);
    }
  };

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

          await handleFetchResponse(response, navigate);
          const updated = await response.json();
          if (role === 'Teacher') {
            teacherHandleUpdateHomework(updated.homeworkAssignments, updated.calendarEvents, setTeacherData);
          } else if (role === 'Student') {
            studentHandleUpdateHomework(updated.homeworkAssignments, updated.calendarEvents, setStudentData);
          }
          
          toast.success('Document uploaded successfully');
          navigate(-1);
          
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

          await handleFetchResponse(response, navigate);
          toast.success('Image uploaded successfully');
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

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark shadow-default">
        <div className="border-b border-stroke dark:border-strokedark py-4 px-6.5">
          <Breadcrumb pageName={"Homework Studio"}/>
        </div>
        
        <div className="p-6.5">
          <div className="mb-4.5 bg-gray-2 dark:bg-meta-4 p-4 rounded-sm">
            <h4 className="text-xl font-semibold text-black dark:text-white mb-2.5">
              {homework.title}
            </h4>
            <h5 className="text-lg font-medium text-black dark:text-white mb-2.5">
              Instructions:
            </h5>
            <p className="text-black dark:text-white">
              {homework.description}
            </p>
          </div>

          <div className="mb-4.5">
            <h4 className="text-xl font-semibold text-black dark:text-white mb-2.5">
              Submit Your Work
            </h4>
            <div className="flex flex-col sm:flex-row gap-3 mb-4.5">
              <button 
                onClick={() => handleUploadImage(homework.id ?? 0)}
                className="flex-1 inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90"
              >
                Upload Image
              </button>
              <button 
                onClick={() => handleUploadDocument(homework.id ?? 0)}
                className="flex-1 inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90"
              >
                Upload Document
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Text Submission
            </label>
            <textarea
              rows={6}
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
              placeholder="Type your homework submission here..."
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
            <button 
              onClick={handleTextSubmit} 
              className="mt-4.5 inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90"
            >
              Submit Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkStudio;
