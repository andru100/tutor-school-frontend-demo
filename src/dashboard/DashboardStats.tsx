import React from 'react';
import { useState, useEffect, useContext } from 'react';
import AreaMultipleTopic from './AreaMultipleTopic.tsx'
import StatsNavigation from './StatsNavigation.tsx'
import AreaMultipleOverall from './AreaMultipleOverall.tsx'
import RadialTopics from './RadialTopics.tsx';
import HeatMapTopics from './HeatMapTopics.tsx';
import BarChartTopics from './BarChartTopics.tsx';
import { Student, StudentAssessmentAssignment } from "./types.tsx";
import { BackButton } from './BackButton.tsx';
import { useLocation } from 'react-router-dom';
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';



interface Props {
  student: Student;
}


const DashboardStats: React.FC<Props> = ({student }) => {

  const { role, searchTerm }  = useContext(UniversalContext);

  if (!student.assessments || student.assessments.length === 0) {
    return <p>Student has no assessments. To get started take your first assessment</p>;
  }

  const [subjectAndAssignmentId, setSubjectAndAssignmentId] = useState<{subject: string | null, assignmentId: number | null}>({subject: null, assignmentId: null});
  const [assessments, setAssessments] = useState<StudentAssessmentAssignment[] | null>(null);
  const [filteredAssessments, setFilteredAssessments] = useState<StudentAssessmentAssignment[] | null>(null);

  const [viewing, setViewing] = useState({
    chart: 'AreaMultipleOverall',
    subject: 'All'
  });

  let [studentsTopics, setStudentsTopics] = useState<string[]>([]);

  useEffect(() => {
  
     //get rid off assigments not completed
    const filteredAssessments = student.assessments.filter(assessment => assessment.submissionDate !== null);

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
  
  }, [student]);

  
 
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
        case "AreaMultipleOverall":
          if (assessments !== null){
            return (
              <>
                <AreaMultipleOverall   setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} assessments={assessments} studentsTopics={studentsTopics} setViewing={setViewing} viewing ={viewing.chart}/>
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
                <AreaMultipleTopic   assessments={assessments}  setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} studentsTopics={studentsTopics}  setViewing={setViewing} viewing ={viewing.chart} />
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
                <HeatMapTopics  assessments={assessments}  setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} studentsTopics={studentsTopics}  setViewing={setViewing} viewing ={viewing.chart}/>
                <RadialTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
                <BarChartTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
              </>
              )
            }
            break;
        default:
          if (!student) {
            return <p>Loading...</p>; // Or a loading indicator
          }
          return (
            // can loose this as viewing.chart is set areamultiple so defualt never triggered. 
            // TODO make it default or remove duplicate
            <>
                <AreaMultipleOverall   setSubjectAndAssignmentId={setSubjectAndAssignmentId} subjectAndAssignmentId={subjectAndAssignmentId} assessments={assessments} studentsTopics={studentsTopics} setViewing={setViewing} viewing ={viewing.chart}/>
                <RadialTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
                <BarChartTopics  assessments={assessments} topicType={subjectAndAssignmentId.subject} assignmentId={subjectAndAssignmentId.assignmentId}  />
              </>
          )
    }
  } 
}


export default DashboardStats;