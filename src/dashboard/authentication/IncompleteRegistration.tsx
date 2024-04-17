import React, { useState } from 'react';
import LogoDark from './logo-dark.svg';
import Logo from './logo.svg';
import SignUpTeacher from "./SignUpTeacher.tsx";
import SignUpStudent from './SignUpStudent.tsx';
import ConfirmEmail from './ConfirmEmail.tsx'
import {CreateRole} from './CreateRole.tsx'
import { useGoogleLogin } from '@react-oauth/google';
import { SignUpData, GoogleTokenData} from "/src/dashboard/types.tsx";
import { NavigateButtonAuth } from './NavigateButtonAuth.tsx';
import toast from 'react-hot-toast';
import { ChooseSubscription } from './CreateRole.tsx';

interface Props {
  landingPage: (page: string) => void;
  startPage: string;
  email?: string; // Making email prop optional
}



const IncompleteRegistration: React.FC<Props> = ({landingPage, startPage, email = "default@email.com" }) => {

  const [page, setPage] = useState(startPage);

  const goBackToSignUp = () => {
    setPage('default');
  };

  switch (page) {
    case "confirmEmail":
      console.log("yeah i got called");
      return <ConfirmEmail landingPage={landingPage} goBackToSignUp={goBackToSignUp} setPage={setPage}  email={email}/>;
    case "selectSubscription": 
      return <CreateRole landingPage={landingPage} goBackToSignUp={goBackToSignUp} setPage={setPage}  />;
    case "addTeacher":
        return <SignUpTeacher landingPage={landingPage} goBackToSignUp={goBackToSignUp}  />;
    case "addStudent":
      return <SignUpStudent landingPage={landingPage} goBackToSignUp={goBackToSignUp} />;
  default:
    //TODO rework this 
    return <div>No start point selected</div>;
  }
};

export default IncompleteRegistration;
