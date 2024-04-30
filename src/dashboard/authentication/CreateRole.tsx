import React, { useState } from 'react';
import Logo from './path/to/logo.png';
import LogoDark from './path/to/logo-dark.png';
import { NavigateButtonAuth } from './NavigateButtonAuth.tsx';
import { SignUpTeacher } from "./SignUpTeacher.tsx";
import SignUpStudent from './SignUpStudent.tsx';
import { useNavigate } from 'react-router-dom';

  
export const CreateRole: React.FC = () => {

    const navigate = useNavigate();

    const selectStudentBasic = () => {
        navigate('/student-signup')
    };

    const selectTeacherBasic = () => {
        navigate('/teacher-signup')
    };

    const selectStudentPlus = () => {
        // TODO renders billing page to setup subscription
    };

    //TODO add cancel button to return to signin otherwise token and protected routes will force to complete signup with given email

  return (
    <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Select your subscription</h2>
                <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400"></p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                {/* <!-- Pricing Card --> */} 
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-grey-900">
                    <h3 className="mb-4 text-2xl font-semibold">Student</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for beginners.</p>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">Free</span>
                        <span className="text-gray-500 dark:text-gray-400"></span>
                    </div>
                    {/* <!-- List --> */}
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Personalised learning plan</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Unlimited assessments</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>One to one tutor hours: <span className="font-semibold">2 hours per month</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Exams covered: <span className="font-semibold">GCSE, SAT, 11+</span></span>
                        </li>
                    </ul>
                    <button onClick={selectStudentBasic} className="text-white bg-black hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-900">Get started</button>
                </div>
                {/* <!-- Pricing Card --> */}
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-grey">
                    <h3 className="mb-4 text-2xl font-semibold">Tutor</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for tutors who wish to join the platform.</p>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">Free</span>
                        <span className="text-gray-500 dark:text-gray-400"></span>
                    </div>
                    {/* <!-- List --> */}
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Full access to pupil progress charts</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Unlimited access to assign assessments and lesson creation</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Max students: <span className="font-semibold">unlimited</span></span>
                        </li>
                    </ul>
                    <button onClick={selectTeacherBasic} className="text-white bg-black hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">Get started</button>
                </div>
                {/* <!-- Pricing Card --> */}
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-grey">
                    <h3 className="mb-4 text-2xl font-semibold">Student Plus</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Weekly one to one lessons with established tutor.</p>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">£200</span>
                        <span className="text-gray-500 dark:text-gray-400">/maonth</span>
                    </div>
                    {/* <!-- List --> */}
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Personalised learning plan</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Unlimited assessments</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>One to one tutor hours: <span className="font-semibold">4 hours per month</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Exams covered: <span className="font-semibold">GCSE, SAT, 11+</span></span>
                        </li>
                    </ul>
                    <button className="text-white bg-black hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">Get started</button>
                </div>
            </div>
        </div>
        </section>

  )
}
