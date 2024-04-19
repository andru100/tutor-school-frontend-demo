import { useState, useEffect, useContext } from "react"
import Breadcrumb from './Breadcrumb';
import {Teacher, LessonEvent, CalendarEvent} from './types';
import { BackButton } from "./BackButton";
import { useLocation } from 'react-router-dom';
import { StudentUpdatesContext } from '/src/dashboard/context/StudentContext.tsx';
import { TeacherUpdatesContext } from '/src/dashboard/context/TeacherContext.tsx';

interface Props {
  events: Teacher["calendarEvents"];
  goBackToDash: string;
  searchTerm: string;
  
}


const Calendar:  React.FC = () => {

  //TODO add functionality to update delete from calendar and add search to reduce events by student name
  const context = useContext(StudentUpdatesContext) || useContext(TeacherUpdatesContext);

  const { handleUpdateLesson, handleDeleteLesson, handleUpdateHomework, handleDeleteHomework, handleUploadHomework, handleUpdateAssessment, handleDeleteAssessment } = context;
  
  const location = useLocation();
  const { events, goBackToDash, searchTerm } = location.state as Props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: CalendarEvent[] }>({});

  useEffect(() => {
    console.log("in calendar have detected change to calendar events: ", events)
    if (Array.isArray(events)) {
      const eventsObj = events.reduce((acc, event) => {
        const eventDate = new Date(event.date);
        const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`; 
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(event);
        return acc;
      }, {});
      setEventsByDate(eventsObj);
    }
  }, [events]);



  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      <BackButton goBackToDash={goBackToDash}/>
      
      <h1>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
      <button onClick={handlePrevMonth}>Previous</button>
      <button onClick={handleNextMonth}>Next</button>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {days.map((day, index) => (
                <th key={index} className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                  <span className="hidden lg:block"> {day} </span>
                  <span className="block lg:hidden"> {daysShort[index]} </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(weeksInMonth).fill(null).map((_, weekIndex) => (
              <tr key={weekIndex} className="grid grid-cols-7">
                {Array(7).fill(null).map((_, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
                  let dayNumber;
                  let month = currentDate.getMonth();
                  let year = currentDate.getFullYear();
                  if (day <= 0) {
                    dayNumber = daysInPrevMonth + day;
                    month--;
                    if (month < 0) {
                      month = 11;
                      year--;
                    }
                  } else if (day > daysInMonth) {
                    dayNumber = day - daysInMonth;
                    month++;
                    if (month > 11) {
                      month = 0;
                      year++;
                    }
                  } else {
                    dayNumber = day;
                  }
                  const dateKey = `${year}-${month}-${dayNumber}`; // create a key with the year, month, and day number
                  return (
                    <td key={dayIndex} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                      {dayNumber ? (
                        <span className="font-medium text-black dark:text-white">
                          {dayNumber}
                        </span>
                      ) : null}
                      {eventsByDate[dateKey] &&
                        eventsByDate[dateKey].map((event) => (
                          <div
                            key={event.id}
                            title={`${event.title}: ${event.description}`}
                            className="event invisible absolute left-0 z-99 mb-1 flex w-full flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[100%] md:opacity-100 overflow-hidden"
                          >
                            <span className="event-name text-sm font-semibold text-black dark:text-white truncate">
                              {event.title}
                            </span>
                          </div>
                        ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  );
};

export default Calendar;