import React, { useState, useEffect } from 'react';
import { Student, Assessment, StudentAssessmentAssignment, CalendarEvent } from "./types.tsx"; // Import your data structures
import BarChartTopicsResult from './BarChartTopicsResult.tsx';
import RadialResult from './RadialResult.tsx';
import toast from 'react-hot-toast';
import { CancelButton } from './CancelButton.tsx';
import { useLocation } from 'react-router-dom';

interface Props {
  assignment: StudentAssessmentAssignment;
  backToParent: string; 
  handleUpdateAssessment: (update: StudentAssessmentAssignment[], calendarData: CalendarEvent[]) => void;
  //goBackToDash: () => void;
}

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const ExamPage: React.FC = () => {
  const location = useLocation();
  const { assignment, backToParent, handleUpdateAssessment } = location.state as Props;
  const [assessment, setAssessment] = useState<Assessment>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<StudentAssessmentAssignment["answers"]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [gradedAssessment, setGradedAssessment] = useState<StudentAssessmentAssignment>();
  const [updatedStudent, setUpdatedStudent] = useState<Student>();
  const [timerDisplay, setTimerDisplay] = useState<string>('02:00:00'); // Initialize timer display as 2 hours
  const [elapsedTime, setElapsedTime] = useState(120 * 60); // 2 hours in seconds


  useInterval(() => {
    if (elapsedTime > 0) {
      setElapsedTime(elapsedTime - 1);
    }
  }, 1000); // Update every second

  useEffect(() => {
      const input = {
        assessmentId: assignment.assessmentId,
       };
      const fetchData = async () => {
        try {
          const queryString = Object.keys(input)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(input[key])}`)
          .join('&');

          const accessToken = localStorage.getItem('accessToken') || null;

          const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

          const apiUrl = `${serverAddress}/api/query/GetAssessmentById?${queryString}`;

          const response = await fetch(apiUrl, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
              
            },
          });

          const result = await response.json();

          setAssessment(result);
          toast.success('Generation successful!');
          console.log("use effect assessment got data: ", result);
        } catch (error) {
          toast.error('An error occurred while updating the homework');
          console.error("Error fetching assessment:", error);
        }
      };

      fetchData();
    
  }, []);

  

  useEffect(() => {
    // Calculate the hours, minutes, and seconds from the elapsed time
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
  
    // Format the timer display as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    // Update the timer display
    setTimerDisplay(formattedTime);
  }, [elapsedTime]);


  useEffect(() => {
    if (gradedAssessment) {
      setSubmitted(true);
    }
  }, [gradedAssessment]);


  if (!assessment) {
    return <p>Loading student data...</p>; 
  }


  const handleBegin = () => {
    // Start the timer when the exam begins
    setElapsedTime(120 * 60); // Initialize with the initial duration (2 hours in seconds)
  
    // Format the initial time display as HH:MM:SS
    const formattedTime = '02:00:00';
    setTimerDisplay(formattedTime);
  
    handleNextQuestion(); // Display the first question
  };


  const handleAnswerSelection = (questionId: number, answerId: number) => {
    
    // Check if the student already answered this question
    const existingAnswerIndex = answers.findIndex((answer) => answer.questionId === questionId);
  
    if (existingAnswerIndex !== -1) {
      // If the student already answered this question, update the answer
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = { ...updatedAnswers[existingAnswerIndex], answerId };
      setAnswers(updatedAnswers);
    } else {
      // If the student is answering the question for the first time, add a new answer
      setAnswers([...answers, { questionId, answerId }]);
      console.log('New answers:', [...answers, { questionId, answerId }]); // Log the new answers
    }
  
    // Check if an answer is selected for the current question
    setIsAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessment.questionsWithAnswers.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset the answer selection state for the next question
      setIsAnswerSelected(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Reset the answer selection state when navigating to the previous question
      setIsAnswerSelected(false);
    }
  };

 
  const handleSubmit = async () => {

    // Check if an answer is selected for the current question before submitting
    if (!isAnswerSelected) {
      return;
    }
  
    // Stop the timer when the exam is submitted
    setElapsedTime(0);

    // The elapsed time in seconds is stored in the elapsedTime state
    if (elapsedTime !== null) {
      console.log(`Elapsed Time: ${elapsedTime} seconds`);
    }
  
    const assignmentToSend = { ...assignment }; 
    assignmentToSend.duration = elapsedTime; 
    assignmentToSend.duration = elapsedTime;
    assignmentToSend.submissionDate = new Date().toISOString();
    assignmentToSend.answers = answers;
    assignmentToSend.isSubmitted = true;

    delete assignmentToSend?.assessment;

    try {
      const accessToken = localStorage.getItem('accessToken') || null;
    
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const apiUrl = serverAddress + '/api/mutation/SubmitAssessment';

      console.log('assignmentToSend is', assignmentToSend);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
        body: JSON.stringify( assignmentToSend ),
      });

      const result = await response.json();
      console.log(" returned data: ", result);
      setUpdatedStudent(result.updatedStudent);
      setGradedAssessment(result.gradedAssignment);
    } catch (error) {
      toast.error('An error occurred while updating the homework');
      console.error("Error fetching assessment:", error);
    }
  
  };

  const handleExit = () => {
    // TODO need to send .calendarevents to..
    handleUpdateAssessment (updatedStudent.assessments, updatedStudent.calendarEvents)
    navigate(backToParent)
  };

  const currentQuestion = assessment.questionsWithAnswers[currentQuestionIndex];

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto relative">
        {/* Add the "Time Remaining" box */}
        <div className="text-xl absolute top-4 right-4 p-2 rounded-lg">
          <h3 className="text-xl">Time Remaining: {timerDisplay}</h3>
        </div>
  
        <h1 className="text-3xl font-semibold mb-4">{assessment?.title}</h1>
        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 col-start-6">

        </div>
        {submitted && gradedAssessment? (
          <div>
            <button type="button" onClick={()=> handleExit()} className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                  <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                  </svg>
                  <span>Exit</span>
              </button>
            {/* <button
              onClick={()=> handleExit()  }
              className="absolute top-4 left-4 inline-flex items-center justify-center rounded-full bg-primary py-2 px-6 text-left font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Exit
            </button> */}

          <>
            <h2 className="text-2xl font-semibold mb-4">Your Results:</h2>
            <RadialResult selectedAssessment={gradedAssessment} />
            <BarChartTopicsResult selectedAssessment={gradedAssessment} />
          </>
      
          </div>
        ) : (
          
          <div>
             <CancelButton backToParent={backToParent}/>
          {/* Display the timer */}
          {/* <h3 className="text-xl">Time Remaining: {timerDisplay}</h3> */}
            {currentQuestionIndex === 0 ? (
              <div>
                {/* Add rules description and "Begin" button */}
                <div className="bg-white p-6 rounded-lg mx-auto mt-20 max-w-xl shadow-md relative">
                  <h2 className="text-xl font-semibold mb-4">Exam Rules</h2>
                  <p>
                    Here are the rules for this exam:
                  </p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Rule 1</li>
                    <li>Rule 2</li>
                  </ul>
                  
                  {/* Place the "Begin" button at the bottom right */}
                  <button
                    onClick={handleBegin}
                    className="absolute bottom-4 right-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 font-semibold"
                  >
                    Begin
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {currentQuestion ? (
                  <div>
                    {/* Display the current question */}
                    <div className="bg-white p-6 rounded-lg mx-auto mt-4 max-w-xl shadow-md">
                      <h3 className="text-xl font-semibold mb-4">Question {currentQuestionIndex}</h3>
                      <p>{currentQuestion.questionText}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg mx-auto mt-4 max-w-xl shadow-md">
                      <form className="mt-2">
                        {currentQuestion.answerOptions.map((answer) => (
                          <div key={answer.answerId} className="mb-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`question_${currentQuestion.id}`}
                                value={answer.answerId}
                                onChange={() => handleAnswerSelection(currentQuestion.id, answer.answerId)}
                                checked={
                                  answers.some(
                                    (selectedAnswer) =>
                                      selectedAnswer.questionId === currentQuestion.id &&
                                      selectedAnswer.answerId === answer.answerId
                                  )
                                }
                                className="mr-2"
                              />
                              {answer.answerText}
                            </label>
                          </div>
                        ))}
                      </form>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-end mt-4 max-w-xl mx-auto">
                      <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 font-semibold shadow-md mr-2"
                      >
                        Previous
                      </button>

                      {currentQuestionIndex === assessment?.questionsWithAnswers.length - 1 ? (
                        <button
                          onClick={handleSubmit}
                          disabled={!isAnswerSelected}
                          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 font-semibold shadow-md"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          disabled={!isAnswerSelected}
                          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 font-semibold shadow-md"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4">No questions to display.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
  

  
  

};


export default ExamPage;
