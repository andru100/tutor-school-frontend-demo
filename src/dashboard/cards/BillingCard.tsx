import { useContext } from 'react';
import {Teacher} from '../types'
import { UniversalContext } from '/src/context/UniversalContext.tsx';



const BillingCard: React.FC = () => {

  const { role, teacherData }  = useContext(UniversalContext);
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg className="fill-primary dark:fill-white"  xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="20"><path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/></svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
      <div>
        <h4 className="text-title-md font-bold text-black dark:text-white">
          Billing
        </h4>
        <span className="text-sm font-medium"></span>
      </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          {teacherData.lessonEvents && teacherData.lessonEvents.length >= 0 && (
            <p className="text-sm font-medium text-meta-3">
              3 new payments
            </p>
          )}
        </span>
      </div>
    </div>
  );
};

export default BillingCard;
