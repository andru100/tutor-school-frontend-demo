import React, { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';
import { useNavigate } from 'react-router-dom';

interface UpdateLoginInfoProps {
  email: string;
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
    backgroundColor: 'white', // Ensure modal background is white
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const UpdateLoginInfo: React.FC<UpdateLoginInfoProps> = ({ email }) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openEmailModal = () => setIsEmailModalOpen(true);
  const closeEmailModal = () => setIsEmailModalOpen(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);


  const UpdatePass = async (data: InfoRequest) => {
    const accessToken = localStorage.getItem('accessToken') || null;
    const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
    const navigate = useNavigate();

    try {
        const response = await fetch(serverAddress + "/api/account/info", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        await handleFetchResponse(response, navigate);
        toast.success("Update successful");
    } catch (error) {
        toast.error("Update failed: " + error.message); // Catch and display error
    }
};

  const handleEmailUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmail = formData.get('newEmail') as string;
    const oldPassword = formData.get('oldPassword') as string;

    const updateData: InfoRequest = {
      newEmail,
      oldPassword,
      newPassword: '',
    };

    await UpdatePass(updateData);
    closeEmailModal();
  };

  const handlePasswordUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get('oldPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const updateData: InfoRequest = {
      newEmail: '',
      oldPassword,
      newPassword,
    };

    await UpdatePass(updateData);
    closePasswordModal();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Login Information
        </h3>
      </div>
      <div className="p-7">
        <div className="mb-5.5 flex items-center justify-between">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
              Email Address
            </label>
            <input
              className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
              type="email"
              name="emailAddress"
              id="emailAddress"
              value={email}
              readOnly
              disabled
            />
          </div>
          <button
            onClick={openEmailModal}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          >
            update
          </button>
        </div>
        <div className="mb-5.5 flex items-center justify-between">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary"
              type="password"
              name="password"
              id="password"
              value="********"
              readOnly
              disabled
            />
          </div>
          <button
            onClick={openPasswordModal}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          >
            update
          </button>
        </div>
      </div>

      {/* Email Update Modal */}
      <Modal isOpen={isEmailModalOpen} onRequestClose={closeEmailModal} style={customStyles}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-white p-7">
          <h2 className="text-lg font-medium text-black dark:text-black mb-4">Update Email</h2>
          <form onSubmit={handleEmailUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black dark:text-black">
                Current Password:
              </label>
              <input type="password" name="oldPassword" required className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black dark:text-black">
                New Email:
              </label>
              <input type="email" name="newEmail" required className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary" />
            </div>
            <div className="flex justify-between gap-4.5">
              <button type="button" onClick={closeEmailModal} className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black">
                Cancel
              </button>
              <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1">
                Update Email
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Password Update Modal */}
      <Modal isOpen={isPasswordModalOpen} onRequestClose={closePasswordModal} style={customStyles}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-white p-7">
          <h2 className="text-lg font-medium text-black dark:text-black mb-4">Update Password</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black dark:text-black">
                Current Password:
              </label>
              <input type="password" name="oldPassword" required className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black dark:text-black">
                New Password:
              </label>
              <input type="password" name="newPassword" required className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black dark:text-black">
                Confirm New Password:
              </label>
              <input type="password" name="confirmPassword" required className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-white dark:text-black dark:focus:border-primary" />
            </div>
            <div className="flex justify-between gap-4.5">
              <button type="button" onClick={closePasswordModal} className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black">
                Cancel
              </button>
              <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateLoginInfo;