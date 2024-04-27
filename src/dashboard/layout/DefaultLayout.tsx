import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "/src/dashboard/layout/header/Header.tsx";
import SignIn from '/src/dashboard/authentication/SignIn.tsx';
import SignUp from '/src/dashboard/authentication/SignUp.tsx';
import ForgotPassword from "/src/dashboard/authentication/ForgotPassword.tsx"
import ForgotPasswordConfirm from "/src/dashboard/authentication/ForgotPasswordConfirm.tsx"
import SignUpTeacher from "/src/dashboard/authentication/SignUpTeacher.tsx";
import SignUpStudent from "/src/dashboard/authentication/SignUpStudent.tsx";
import ConfirmEmail from "/src/dashboard/authentication/ConfirmEmail.tsx"
import TeacherDash from '/src/dashboard/TeacherDash.tsx';
import StudentDash from '/src/dashboard/StudentDash.tsx';
import ViewTeacherStudentDash from '/src/dashboard/ViewTeacherStudentDash.tsx';
import Settings from '/src/dashboard/account/Settings.tsx';
import ViewStudents from '/src/dashboard/ViewStudents.tsx';
import ViewTeacherHomework from  '/src/dashboard/ViewTeacherHomework.tsx';
import ViewTeacherAssessments from '/src/dashboard/ViewTeacherAssessments.tsx';
import ViewTeacherLessons from '/src/dashboard/ViewTeacherLessons.tsx';
import Calendar from '/src/dashboard/Calendar.tsx';
import Billing from '/src/dashboard/Billing.tsx';
import ViewStudentLessons from '/src/dashboard/ViewStudentLessons.tsx';
import ViewStudentAssessments from '/src/dashboard/ViewStudentAssessments.tsx';
import ViewStudentHomework from '/src/dashboard/ViewStudentHomework.tsx';
import Stats from '/src/dashboard/Stats.tsx';
import CreateAssessment from '/src/dashboard/CreateAssessment.tsx';
import CreateHomework from '/src/dashboard/CreateHomework.tsx';
import CreateLesson from '/src/dashboard/CreateLesson.tsx';
import EditAssessment from '/src/dashboard/EditAssessment.tsx';
import EditHomework from '/src/dashboard/EditHomework.tsx';
import EditLesson from '/src/dashboard/EditLesson.tsx';
import HomeworkStudio from '/src/dashboard/HomeworkStudio.tsx';
import HomeworkGrader from '/src/dashboard/HomeworkGrader.tsx';
import ViewHomework from '/src/dashboard/ViewHomework.tsx'
import Exam from '/src/dashboard/Exam.tsx';
import { CreateRole } from '/src/dashboard/authentication/CreateRole.tsx';
import ProtectedRoutes from './ProtectedRoutes';


const DefaultLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const noAuthRoutes = ["/signin", "/signup", "/forgot-password", "/forgot-password-confirm", "/confirm-email", "/choose-subscription", "/teacher-signup", "/student-signup"];
  const location = useLocation();
  const showHeader = !noAuthRoutes.includes(location.pathname);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {showHeader && (
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <ProtectedRoutes>
                <Routes>
                  <Route path="/signin" element={<SignIn  />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/forgot-password-confirm" element={<ForgotPasswordConfirm />} />
                  
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/confirm-email" element={<ConfirmEmail />} />
                  <Route path="/choose-subscription" element={<CreateRole />} />
                  <Route path="/teacher-signup" element={<SignUpTeacher />} />
                  <Route path="/student-signup" element={<SignUpStudent />} />

                  <Route path="/teacher-dashboard" element={<TeacherDash  />} />
                  <Route path="/student-dashboard" element={<StudentDash  />} />
                  <Route path="/teacher-student-dashboard" element={<ViewTeacherStudentDash />} />

                  <Route path="/settings" element={<Settings />} />


                  <Route path="/view-students" element={<ViewStudents />} />
                  <Route path="/view-teacher-homework" element={<ViewTeacherHomework />} />
                  <Route path="/view-teacher-assessments" element={<ViewTeacherAssessments />} />
                  <Route path="/view-teacher-lessons" element={<ViewTeacherLessons />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/billing" element={<Billing />} />

                  <Route path="/view-student-lessons" element={<ViewStudentLessons />} />
                  <Route path="/view-student-assessments" element={<ViewStudentAssessments />} />
                  <Route path="/view-student-homework" element={<ViewStudentHomework />} />
                  <Route path="/stats" element={<Stats />} />

                  <Route path="/create-assessment" element={<CreateAssessment />} />
                  <Route path="/create-homework" element={<CreateHomework />} />
                  <Route path="/create-lesson" element={<CreateLesson />} />

                  <Route path="/edit-assessment" element={<EditAssessment />} />
                  <Route path="/edit-homework" element={<EditHomework />} />
                  <Route path="/edit-lesson" element={<EditLesson />} />

                  <Route path="/homework-studio" element={<HomeworkStudio />} />
                  <Route path="/grade-homework" element={<HomeworkGrader />} />
                  <Route path="/view-homework" element={<ViewHomework/>} />
                  <Route path="/exam-studio" element={<Exam />} />
                </Routes>
                
              </ProtectedRoutes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;