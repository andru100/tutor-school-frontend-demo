import { ApexOptions } from 'apexcharts';
import React, { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Student } from './types'; // Import your data structures
import StatsNavigation from './StatsNavigation';

interface Props {
  assessments: Student['assessments'];
  studentsTopics: string[];
  setSubjectAndAssignmentId: React.Dispatch<
    React.SetStateAction<{
      subject: string;
      assignmentId: number | null;
    }>
  >;
  subjectAndAssignmentId: {
    subject: string;
    assignmentId: number | null;
  };
  viewing: string;
  setViewing: React.Dispatch<
    React.SetStateAction<{
      chart: string;
      subject: string;
    }>
  >;
}

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const HeatmapTopics:  React.FC<Props> = ({ assessments, studentsTopics, setSubjectAndAssignmentId, subjectAndAssignmentId, viewing, setViewing}) => {
  let subjectRef = useRef(subjectAndAssignmentId.subject);
  let assessmentsRef = useRef(assessments);

  useEffect(() => {
    subjectRef.current = subjectAndAssignmentId.subject;
  }, [subjectAndAssignmentId.subject]);

  useEffect(() => {
    assessmentsRef.current = assessments;
  }, [assessments]);
  


   const topicScores = assessments.map(item => item.topicScores[subjectAndAssignmentId.subject]);

  const [selectedTopic, setSelectedTopic] = useState<string | null>();


  const options: ApexOptions ={
    chart: {
      height: 450,
      type: 'heatmap',
      events: {
        click: function(event, chartContext, config) {
            const { seriesIndex, dataPointIndex } = config;
            const selectedAssessment = assessmentsRef.current[config.dataPointIndex];
            const assignmentId = selectedAssessment?.id;
            
            setSubjectAndAssignmentId({
              subject: subjectRef.current,
              assignmentId: assignmentId ,
            });
          }, 
        }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      tickPlacement: 'between',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      padding: {
        right: 20
      }
    }, 
    
  }
  
  const series = [];
  

  if (assessments ) {
    // Don't filter the topics array based on the selected topic
    let topics = Object.keys(topicScores[0]);

    for (const topic of topics) {
      let data = [];

      // If a topic is selected, only get data for that topic
      if (!selectedTopic || topic === selectedTopic) {
        data = topicScores
          .map((scores, index) => {
            if (scores && scores[topic] ) {
              return {
                x: assessments[index].submissionDate,
                y: scores[topic].score,
              };
            }
            return null;
          })
          .filter(Boolean);
      }

      series.push({
        data: data,
        name: topic,
      });
    }


    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">

            <h4 className="text-xl font-semibold text-black dark:text-white">Subject Topic Heatmap Over Time</h4>
            <StatsNavigation viewing ={viewing} setViewing={setViewing} />
            
            
          </div>
          <div className="flex w-full max-w-45 justify-end">
            <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
              {studentsTopics.map(subject => (
                <button
                key={subject}
                className={`rounded py-1 px-3 text-xs font-medium ${
                  subjectAndAssignmentId.subject === subject
                    ? 'bg-white text-black shadow-card'
                    : 'text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark'
                }`}
                onClick={() => setSubjectAndAssignmentId({
                  subject: subject,
                  assignmentId: null 
                })}
              >
                {subject}
              </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold text-primary">Topic:
              <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
                <option value="">All topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </p>
          </div>
        </div>
        <div id="chartOne" className="-ml-5">

          <ReactApexChart
            options={options}
            series={series}
            type="heatmap"
            height={350}
          />
          
        </div>
      </div>
    );
  };
}

export default HeatmapTopics;
