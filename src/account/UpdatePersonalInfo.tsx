import React, { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { ApplicationUser } from '/src/dashboard/types.tsx';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';
import { useNavigate } from 'react-router-dom';


interface UpdatePersonalInfoProps {
  adminUserData: ApplicationUser;
  setAdminUserData: React.Dispatch<React.SetStateAction<ApplicationUser>>;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const UpdatePersonalInfo: React.FC<UpdatePersonalInfoProps> = ({ adminUserData, setAdminUserData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');

  const openModal = (field: string) => {
    setCurrentField(field);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will return the date in YYYY-MM-DD format
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newValue = formData.get(currentField) as string;
    const navigate = useNavigate();


    setAdminUserData((prevData) => ({
      ...prevData,
      [currentField]: newValue,
    }));

    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

      const endpoint =
        adminUserData.role === 'Student'
          ? '/api/mutation/AdminStudentUpdate'
          : '/api/mutation/AdminTeacherUpdate';

      const response = await fetch(serverAddress + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ ...adminUserData, [currentField]: newValue })
      });

      await handleFetchResponse(response, navigate);
      const data = await response.json();
      toast.success('Successfully updated details');
      setAdminUserData(data);
      
    } catch (error) {
      console.error(`Error updating ${adminUserData.role.toLowerCase()} data:`, error);
    }

    closeModal();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Personal Information
        </h3>
      </div>
      <div className="p-7">
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              value={adminUserData.name ?? ''}
              readOnly
              disabled
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="dob">
              Date Of Birth
            </label>
            <input
              name='dob'
              type="date"
              value={formatDate(adminUserData.dob)}
              readOnly
              disabled
              className="w-full rounded-lg border border-stroke bg-white py-3 px-4.5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
            />
          </div>
        </div>
        {['phoneNumber', 'sortCode', 'accountNo', 'adjustments'].map((field) => (
          <div key={field} className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="flex items-center justify-between">
              <input
                className="w-64 rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
                type="text"
                name={field}
                id={field}
                value={adminUserData[field] ?? ''}
                readOnly
                disabled
              />
              <button
                onClick={() => openModal(field)}
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              >
                Update
              </button>
            </div>
          </div>
        ))}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="notes">
            Notes
          </label>
          <div className="flex items-start justify-between">
            <textarea
              className="w-full h-24 rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
              name="notes"
              id="notes"
              value={adminUserData.notes ?? ''}
              readOnly
              disabled
            ></textarea>
            <button
              onClick={() => openModal('notes')}
              className="ml-2 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-white p-7">
          <h2 className="text-lg font-medium text-black dark:text-black mb-4">
            Update {currentField.charAt(0).toUpperCase() + currentField.slice(1)}
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black dark:text-black">
                New {currentField.charAt(0).toUpperCase() + currentField.slice(1)}:
              </label>
              {currentField === 'notes' ? (
                <textarea
                  name={currentField}
                  required
                  className="w-full h-24 rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
                  defaultValue={adminUserData[currentField] ?? ''}
                ></textarea>
              ) : (
                <input
                  type="text"
                  name={currentField}
                  required
                  className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
                  defaultValue={adminUserData[currentField] ?? ''}
                />
              )}
            </div>
            <div className="flex justify-between gap-4.5">
              <button
                type="button"
                onClick={closeModal}
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdatePersonalInfo;