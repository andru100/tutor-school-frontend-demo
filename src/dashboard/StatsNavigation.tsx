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
    <>
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
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      >
        <option value="AreaMultipleOverall" data-subject="all">AreaMultipleOverall</option>
        <option value="AreaTopicsOverTime" data-subject="all">AreaTopicsOverTime</option>
        <option value="HeatMapTopics" data-subject="all">HeatMapTopics</option> 
        
      </select>
    </>
  );
};

export default StatsNavigation;