import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Student } from './types';

interface Props {
  assessments: Student['assessments'];
  topicType: string;
  assignmentId: number;
}


const BarChartTopics:  React.FC<Props> = ({ assessments, topicType, assignmentId }) => {

    const [selectedDateId, setSelectedDateId] = useState<number>(assignmentId);


    // Update selectedTopic when topicType prop changes
    useEffect(() => {
      setSelectedDateId(assignmentId); 
    }, [assessments, assignmentId]);

    let topics: string[] = []
    let selectedScores: number[] = []
    let overallScore : number

    if (assessments ) {

      const selectedAssessment = assessments.find(assessment => assessment.id === selectedDateId);
      let data = {}

      if (selectedAssessment) {
        topics = Object.keys(selectedAssessment.topicScores[topicType]);
        selectedScores = topics.map((item) => selectedAssessment.topicScores[topicType][item].score)
        overallScore = selectedAssessment.score
      }

      data = [{ name: "Series 1", data: selectedScores}]

      const options: ApexOptions = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: topics
          
        }
      }

      return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="flex w-full flex-wrap gap-3 sm:gap-5">

              <h4 className="text-xl font-semibold text-black dark:text-white">Topic Scores Breakdown</h4>
            </div>
          </div>

          <div> 
            <select value={selectedDateId ?? ''} onChange={e => setSelectedDateId(parseInt(e.target.value))}>
                    
                {assessments.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.submissionDate}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <div id="chartOne" className="-ml-5">
              

              {data && (
                <ReactApexChart
                  options={options}
                  series={data}
                  type="bar"
                  height={350}
                />
              )}
                
              
            </div>
          </div>
        </div>
      );
    }
};

export default BarChartTopics;
