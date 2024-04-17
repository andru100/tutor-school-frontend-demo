import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Student, StudentAssessmentAssignment, Score} from './types'; // Import your data structures

interface Props {
  selectedAssessment: StudentAssessmentAssignment
}

const RadialResult:  React.FC<Props> = ({ selectedAssessment }) => {

      let topics : string[]
      let selectedScores : Score []
      //let overallScore = 0  // may use in future

      console.log("selectedAssessment is: ", selectedAssessment);

      if (selectedAssessment) {
        topics = Object.keys(selectedAssessment.topicScores[selectedAssessment.title]);
        selectedScores = topics.map((item) => selectedAssessment.topicScores[selectedAssessment.title][item].score)
        //overallScore = selectedAssessment.score
      

        console.log("series is: ", selectedScores, " labels are: ", topics)

        // sort selectedScores by largest to smallest and also sort topics using same index as they are linked.
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
                  show: true,
                  label: "Overall Score",
                  formatter: function (w) {
                    return selectedAssessment.score
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
  
};

export default RadialResult;
