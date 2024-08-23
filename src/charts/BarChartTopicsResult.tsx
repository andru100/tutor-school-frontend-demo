import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { StudentAssessmentAssignment, Score } from '../dashboard/types'; // Import your data structures

interface Props {
  selectedAssessment: StudentAssessmentAssignment
}


const BarChartTopicsResult:  React.FC<Props> = ({ selectedAssessment }) => {


      let topics : string[]  
      let selectedScores : Score[]

    if (selectedAssessment ) {

      let data = {}

      if (selectedAssessment && selectedAssessment.topicScores) {
        topics = Object.keys(selectedAssessment.topicScores[selectedAssessment.title]);
        selectedScores = topics.map((item) => selectedAssessment.topicScores[selectedAssessment.title][item].score)
        data = [{data: selectedScores}]  
      }


      const sortedScores = selectedScores.slice().sort((a, b) => b - a);
      const sortedTopics = topics.slice().sort((a, b) => selectedScores.indexOf(b) - selectedScores.indexOf(a));
      selectedScores = sortedScores;
      topics = sortedTopics;

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
        </div>
        <div>
          <div id="chartOne" className="-ml-5">
            

              <ReactApexChart
              options={options}
              series={data}
              type="bar"
              height={350}
            />
              
            
          </div>
        </div>
      </div>
    );
  }
};

export default BarChartTopicsResult;
