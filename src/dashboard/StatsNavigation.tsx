import React from 'react';

interface NavigationProps {
  viewing: string;
  setViewing: React.Dispatch<
    React.SetStateAction<{
      chart: string;
      subject: string;
    }>
  >;
}

const StatsNavigation: React.FC<NavigationProps> = ({ viewing, setViewing }) => {
  return (
    <div className="w-full">
      <div className="mb-4">
      <h4 className="text-xl font-semibold text-black dark:text-white">Select Chart Type</h4>
        <div className="mt-2">
          <select
            value={viewing}
            onChange={(e) => {
              const chart = e.target.value;
              const subject = e.target.options[e.target.selectedIndex].getAttribute('data-subject');
              setViewing({
                chart,
                subject,
              });
            }}
          >
            <option value="OverallScoresChart" data-subject="all">Overall Scores</option>
            <option value="AreaTopicsOverTime" data-subject="all">Score Breakdown by Subject Topics</option>
            <option value="HeatMapTopics" data-subject="all">Subject Topics HeatMap</option> 
          </select>
        </div>
      </div>
    </div>
  );
};

export default StatsNavigation;