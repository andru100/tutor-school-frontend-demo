import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Student, Score } from './types'; 

interface Props {
  assessments: Student['assessments'];
  topicType: string;
  assignmentId: number;
}

const RadialTopics:  React.FC<Props> = ({ assessments, topicType, assignmentId }) => {
  

    const [selectedDateId, setSelectedDateId] = useState<number>(assignmentId);

    useEffect(() => {
      setSelectedDateId(assignmentId); // Set selectedTopic to the first topic
    }, [assessments, assignmentId]);

      let topics: string[]
      let selectedScores: Score[]
      let overallScore = 0

    if (assessments ) {

      const selectedAssessment = assessments.find(assessment => assessment.id === selectedDateId);

      if (selectedAssessment) {
        topics = Object.keys(selectedAssessment.topicScores[topicType]).filter((field) => field !== '__typename');
        selectedScores = topics.map((item) => selectedAssessment.topicScores[topicType][item].score)
        overallScore = selectedAssessment.score
      

        const sortedScores = selectedScores.slice().sort((a, b) => b - a);
        const sortedTopics = topics.slice().sort((a, b) => selectedScores.indexOf(b) - selectedScores.indexOf(a));
        selectedScores = sortedScores;
        topics = sortedTopics;

        const options: ApexOptions = {
          chart: {
            height: 400,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
                value: {
                  fontSize: '16px',
                },
                total: {
                  show: false,
                  label: "Overall Score",
                  formatter: function (w) {
                    return overallScore
                  }
                }
              }
            }
          },
          labels: topics,
        }



      return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
          <div className="mb-4 justify-between gap-4 sm:flex">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
              <div className="flex w-full flex-wrap gap-3 sm:gap-5">

                <h4 className="text-xl font-semibold text-black dark:text-white">Subject Topic Scores</h4>
              </div>
            </div>
          </div>
          <div>
            <select value={selectedDateId} onChange={e => setSelectedDateId(parseInt(e.target.value))}>
                  
              {assessments.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.submissionDate}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div id="chartOne" className="-ml-5">
              

                <ReactApexChart
                  options={options}
                  series={selectedScores}
                  type="radialBar"
                  height={400}
                />
                
              
            </div>
          </div>
        </div>
      );
    }
  }
};

export default RadialTopics;
