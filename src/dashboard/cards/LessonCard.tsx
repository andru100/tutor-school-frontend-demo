import {Student} from './types'

interface Props {
  lessons: Student["lessonEvents"];
}

const LessonCard: React.FC<Props> = ({lessons}) => {


  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="20"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
      <div>
        <h4 className="text-title-md font-bold text-black dark:text-white">
          Lessons
        </h4>
        <span className="text-sm font-medium"></span>
      </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          {lessons && lessons.length > 0 && (
            (() => {
              const upcomingLessons = lessons.filter(lesson => !lesson.isComplete)
                                             .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
              const nextLesson = upcomingLessons.length > 0 ? upcomingLessons[0] : null;

              return nextLesson ? (
                <p className="text-sm font-medium text-meta-3">
                  Next: {new Date(nextLesson.dueDate).toLocaleDateString('en-UK')}
                </p>
              ) : (
                <p>No upcoming lessons</p>
              );
            })()
          )}
        </span>
      </div>
    </div>
  );
};

export default LessonCard;
