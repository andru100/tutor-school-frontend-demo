import { useState, useEffect, useContext } from "react";
import Breadcrumb from '/src/dashboard/Breadcrumb.tsx';
import { ApplicationUser } from '/src/dashboard/types.tsx';
import toast from 'react-hot-toast';
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import UpdateLoginInfo from '/src/account/UpdateLoginInfo.tsx';
import UpdatePersonalInfo from '/src/account/UpdatePersonalInfo.tsx';
import UpdateProfileImage from '/src/account/UpdateProfileImage.tsx';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { userProfileInfo, setUserProfileInfo } = useContext(UniversalContext);
  const [adminUserData, setAdminUserData] = useState<ApplicationUser>({} as ApplicationUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken') || null;
        const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

        const response = await fetch(serverAddress + "/api/query/getadminuser", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        await handleFetchResponse(response, navigate);
        const data = await response.json();
        setAdminUserData(data.user);
        
      } catch (error) {
        console.log("error fetching data:", error)
        toast.error("An error occurred while fetching user data");
      }
    };
    fetchData();
  }, [handleFetchResponse]);

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <UpdateLoginInfo email={adminUserData.email} />
            <UpdatePersonalInfo adminUserData={adminUserData} setAdminUserData={setAdminUserData} />
            <UpdateProfileImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;