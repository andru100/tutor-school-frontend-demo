import React from 'react';
import { useState, useEffect, useContext } from 'react';
import ScoresByTopicChart from '../charts/ScoresByTopicChart.tsx'
import StatsNavigation from './StatsNavigation.tsx'
import OverallScoresChart from '../charts/OverallScoresChart.tsx'
import RadialTopics from '../charts/RadialTopics.tsx';
import HeatMapTopics from '../charts/TopicsHeatMapChart.tsx';
import BarChartTopics from '../charts/BarChartTopics.tsx';
import { Student, StudentAssessmentAssignment } from "./types.tsx";
import { useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/context/UniversalContext.tsx';



const Stats: React.FC = () => {
  const { studentData, role , searchTerm}  = useContext(UniversalContext);

  if (!studentData.assessments || studentData.assessments.length === 0) {
    return (
      <h4 className="text-xl font-semibold text-black dark:text-white">
        <span className="whitespace-nowrap">Initial assessment not started</span>
      </h4>
    );
  }

  const [subjectAndAssignmentId, setSubjectAndAssignmentId] = useState<{subject: string | null, assignmentId: number | null}>({subject: null, assignmentId: null});
  const [assessments, setAssessments] = useState<StudentAssessmentAssignment[] | null>(null);
  const [filteredAssessments, setFilteredAssessments] = useState<StudentAssessmentAssignment[] | null>(null);

  const [viewing, setViewing] = useState({
    chart: 'OverallScoresChart',
    subject: 'All'
  });

  let [studentsTopics, setStudentsTopics] = useState<string[]>([]);
  
  useEffect(() => {
  
     //get rid off assigments not completed
    const filteredAssessments = studentData?.assessments.filter(assessment => assessment.submissionDate !== null);

    setFilteredAssessments(filteredAssessments)

    //find latest assesment
    const latestAssessment = filteredAssessments.reduce((prev, current) => {
      return (prev.submissionDate > current.submissionDate) ? prev : current
    });
    setSubjectAndAssignmentId(prevState => ({
      ...prevState,
      subject: latestAssessment.title
    }));

    const assessmentsBySubject = filteredAssessments.filter(assessment => assessment.title === latestAssessment.title);

    setAssessments(assessmentsBySubject)

    //get topics of assignments
    const topics = Array.from(new Set(filteredAssessments.map(item => item.title)))
    setStudentsTopics(topics);
  
  }, [studentData]);

  
 
  useEffect(() => {
    if (assessments !== null && assessments[0].title !== subjectAndAssignmentId.subject) {

      const assessmentsBySubject = filteredAssessments.filter(assessment => assessment.title === subjectAndAssignmentId.subject);

      setAssessments(assessmentsBySubject);
    }
  
    if (subjectAndAssignmentId.subject && subjectAndAssignmentId.assignmentId === null) {

      const assessmentsBySubject = filteredAssessments.filter(assessment => assessment.title === subjectAndAssignmentId.subject);

      const latestAssessment = assessmentsBySubject.reduce((prev, current) => {
        return (prev.submissionDate > current.submissionDate) ? prev : current;
      });

      setSubjectAndAssignmentId(prevState => ({
        ...prevState,
        assignmentId: latestAssessment.id
      }));
    }
  }, [subjectAndAssignmentId.subject, subjectAndAssignmentId.assignmentId]);

  if (assessments !== null){
      switch(viewing.chart){
        case "OverallScoresChart":
          if (assessments !== null){
            return (
              <>
                <div className="ml-auto"></div>
                <OverallScoresChart   setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} assessments={assessments} studentsTopics={studentsTopics} setViewing={setViewing} viewing ={viewing.chart}/>
                <RadialTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
                <BarChartTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
              </>
              )
            }
            break;
        case "AreaTopicsOverTime":
          if (assessments !== null){
            return (
              <>
                <div className="ml-auto"></div>
                <ScoresByTopicChart   assessments={assessments}  setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} studentsTopics={studentsTopics}  setViewing={setViewing} viewing ={viewing.chart} />
                <RadialTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
                <BarChartTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
              </>
              )
            }
            break;
        case "HeatMapTopics":
          if (filteredAssessments){
            return (
              <>
                <div className="ml-auto"></div>
                <HeatMapTopics  assessments={assessments}  setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} studentsTopics={studentsTopics}  setViewing={setViewing} viewing ={viewing.chart}/>
                <RadialTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
                <BarChartTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
              </>
              )
            }
            break;
        default:
          if (!studentData) {
            return <p>Loading...</p>;// TODO change to loading indicator
          }
          return (
            // can loose this as viewing.chart is set areamultiple so defualt never triggered. 
            // TODO make it default or remove duplicate
            <>
                <div className="ml-auto"></div>
                <OverallScoresChart   setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} assessments={assessments} studentsTopics={studentsTopics} setViewing={setViewing} viewing ={viewing.chart}/>
                <RadialTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
                <BarChartTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
              </>
          )
    }
  } 
}


export default Stats;