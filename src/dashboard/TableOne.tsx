import BrandOne from '../images/brand/brand-01.svg';
import BrandTwo from '../images/brand/brand-02.svg';
import BrandThree from '../images/brand/brand-03.svg';
import BrandFour from '../images/brand/brand-04.svg';
import BrandFive from '../images/brand/brand-05.svg';
import { Teacher } from '../types';
import { useState, useEffect } from "react"

const TableOne = () => {

  //const [sessionUser, setSessionUser] = useState (props.sessionuser)
   const[TeacherData, setTeacherData] = useState() // holds users data object
   const [viewReply, setviewReply] = useState({}); // use to show comments when clicked
   const [viewLikes, setviewLikes] = useState({}); // use to show likes when clicked
   const [viewCmtBox, setviewCmtBox] = useState({}); // use to show comment box when clicked
   //const [page, setPage] = useState(props.page); // use to show comment box when clicked
   //const [viewing, setViewing] = useState(props.viewing); // use to show comment box when clicked
   const [scope, setScope] = useState("user"); // use to show comment box when clicked

  //  console.log("render occcured, scope is: ", scope, "viewing: ", viewing, "sessionUser: ", sessionUser, "page: ", page)
  //  console.log("user data is: ", cmt)

  //  dayjs().format()
  //  dayjs.extend(relativeTime)

  //  var timeAtRender = dayjs(Date.now())

  // useEffect( () => {
  //   GetTeachers().then(cmtz => {
  //        if (cmtz) {
  //        setTeacherData(cmtz)
  //        console.log("Users data object retrieved is:", cmtz)
  //        }
  //     })
  // },[]);

  return 
};

export default TableOne;
