import Calendars from '../components/Calendars'
import { FaAngleLeft, FaPlusCircle } from 'react-icons/fa';

// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   DayView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';

import Demo from '../Schedule';
import Demo1 from '../Schedule1';

// import MetaTags from 'react-meta-tags';


// const currentDate = '2018-11-01';
// const schedulerData = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];
import { useState,useEffect } from 'react';


import axios from "axios";

const Main = () => {
    const [calendars, setCalendars] = useState([
        {
          id: 1,
          text: 'CalendarOne'
        },
        {
          id: 2,
          text: 'CalendarTwo'
        },
        {
          id: 3,
          text: 'CalendarThree'
        },
    ])
    let [data,setData]=useState([])
    // if(catchdata){
    // axios
    //     .get("/api/tasks/")
    //     .then((res) => {console.log(res.data);
    //       setData(res.data);
    //     })
    //     .catch((err) => console.log(err));}
    
    //console.log(data[0].startDate)
    useEffect(() => {
      axios
      .get("/api/tasks/")
      .then((res) => {console.log(res.data);
        setData(res.data);
        console.log('effect');
      })
      .catch((err) => console.log(err));
      
    }, []);

    return (
        <main>
            <div id="menu">
                <FaAngleLeft className='toggle-menu-btn'/>
                <div id="calendar-container">
                    <Calendars calendars={calendars}/>
                </div>
                <FaPlusCircle className='add-calendar-btn'/>
            </div>
            <div id="display">
        
            {/* <Scheduler
                data={schedulerData}
              >
                <ViewState
                currentDate={currentDate}
                />
                <DayView
                startDayHour={9}
                endDayHour={14}
                />
                <Appointments />
                </Scheduler> */
            }
        
            <Demo1 data={data}/>
  
      </div>
        </main>
    )
}

export default Main;