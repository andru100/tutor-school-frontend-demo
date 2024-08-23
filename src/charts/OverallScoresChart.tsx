import { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef} from 'react';
import ReactApexChart from 'react-apexcharts';
import { Student } from '../dashboard/types.tsx'; 
import StatsNavigation from '../dashboard/StatsNavigation.tsx'

interface Props {
  studentsTopics: string[]
  assessments: Student['assessments'];
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

const OverallScoresChart:  React.FC<Props> = ({ assessments, setSubjectAndAssignmentId, subjectAndAssignmentId, studentsTopics, viewing, setViewing}) => {

  let subjectRef = useRef(subjectAndAssignmentId.subject);
  let assessmentsRef = useRef(assessments);

  useEffect(() => {
    subjectRef.current = subjectAndAssignmentId.subject;
  }, [subjectAndAssignmentId.subject]);

  useEffect(() => {
    assessmentsRef.current = assessments;
  }, [assessments]);

  
  const handleSelectedSubject = ( subject: string | null) => {
    if (subject) {
      setSubjectAndAssignmentId({
        subject: subject,
        assignmentId: null 
      });
    }
  };
  

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
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
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE' ],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
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
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 100,
      decimalsInFloat: 0,
    },
  };


  const series = [];

  if (assessments ) {

    for (const topic of studentsTopics) {
      const topicAssessments = assessments.filter((assessment) => assessment.title === topic);
      if (topicAssessments.length > 0) {
        if (!subjectAndAssignmentId.subject || topic === subjectAndAssignmentId.subject) {
          const data = topicAssessments
            .map((assessData) => {
                return {
                  x: assessData.submissionDate,
                  y: assessData.score,
                };
              
              return null;
            })
            .filter(Boolean);

          series.push({
            data: data,
            name: topic,
          });
          }
      } 
    }
  

    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <StatsNavigation viewing ={viewing} setViewing={setViewing} />
          </div>
          <div className="flex w-full max-w-45 justify-end">
            <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
              {studentsTopics.map(subjectNew => (
                <button
                  key={subjectNew}
                  className={`rounded py-1 px-3 text-xs font-medium ${
                    subjectAndAssignmentId.subject === subjectNew
                      ? 'bg-white text-black shadow-card'
                      : 'text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark'
                  }`}
                  onClick={() => handleSelectedSubject(subjectNew)}
                >
                  {subjectNew}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div id="chartOne" className="-ml-5">

            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
              
            />
          </div>
        </div>
      </div>
    ); 
  };
}

export default OverallScoresChart;
