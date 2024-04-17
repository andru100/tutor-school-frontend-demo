import { useState } from 'react';
import Header from "./header/Header.tsx";

import TeacherDash from '/src/dashboard/TeacherDash.tsx';
import StudentDash from '/src/dashboard/StudentDash.tsx';
//import AdminDash from './pages/Dashboard/Admin/AdminDash';
import SignIn from '/src/dashboard/authentication/SignIn.tsx';
import SignUp from '/src/dashboard/authentication/SignUp.tsx';
import Settings from '/src/dashboard/account/Settings.tsx';
import ForgotPassword from "/src/dashboard/authentication/ForgotPassword.tsx"
import IncompleteRegistration from '/src/dashboard/authentication/IncompleteRegistration.tsx';


interface Props {
  //if needed.. will likely delete as parent component has nothing to pass.
}

const DefaultLayout: React.FC<Props> = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState("signin");
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfileInfo, setUserProfileInfo] = useState({ role: '', name: '' });
  const [startPage, setStartPage] = useState('default');
  const [email, setEmail] = useState<string>('');

  const landingPage = (page: string) => {
    setPage(page);
  };

  const updateSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const updateUserProfileInfo = (newUserInfo: { role: string, name: string, profileImgUrl: string }) => {
    setUserProfileInfo(newUserInfo);
  };

  const goToIncompleteRegistration = (startPage: string, email: string = '') => {

    console.log("yeah i got called email is: "), email;
    
    setStartPage(startPage);
    setEmail(email);
    setPage('incompleteRegistration');
  };



  

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {page !== 'signin' && page !== 'signup' && page!== 'forgot' && page!== 'incompleteRegistration' && (
          <Header landingPage={landingPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} updateSearchTerm={updateSearchTerm} searchTerm={searchTerm} userProfileInfo={userProfileInfo}/>
        )}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {page === 'signin' && <SignIn landingPage={landingPage} goToIncompleteRegistration={goToIncompleteRegistration}/>}
              {page === 'signup' && <SignUp landingPage={landingPage} />}
              {page === 'incompleteRegistration' && <IncompleteRegistration landingPage={landingPage} startPage={startPage} email={email}/>}
              {page === 'forgot' && <ForgotPassword landingPage={landingPage}/>}
              {page === 'settings' && <Settings landingPage={landingPage} updateUserProfileInfo={updateUserProfileInfo}  userProfileInfo={userProfileInfo} />}
              {page === 'teacherDash' && <TeacherDash landingPage={landingPage} searchTerm={searchTerm} updateUserProfileInfo={updateUserProfileInfo} />}
              {page === 'studentDash' && <StudentDash landingPage={landingPage} searchTerm={searchTerm} updateUserProfileInfo={updateUserProfileInfo}/>}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;