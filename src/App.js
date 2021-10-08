// import './App.css';
import './main.scss';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   DayView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';

import Demo from './Schedule';
// import MetaTags from 'react-meta-tags';


// const currentDate = '2018-11-01';
// const schedulerData = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];



function App() {
  return (

    <div className="App">

          {/* <MetaTags>
            <title>DaySynch</title>
            <meta id="meta-description" name="description" content="Time Management Web" />
            <meta id="og-title" property="og:title" content="MyApp" />
            <meta id="og-image" property="og:image" content="https://i.pinimg.com/originals/c8/4f/fc/c84ffc99f868d4585e8b604709dcca75.png" />
          </MetaTags> */}

      <header>
        <p>Day<span>Synch</span></p>
        <div id="profile-logo"></div>
      </header>
      <body>
    <div id="menu">
        <div id="cancel-button">
            <div id="c-x"></div>
            <div id="c-y"></div>
        </div>
        <div id="calendar-container">
            <div id="calendar-one" className="calendar">
                <p>Calendar1</p>
            </div>
            <div id="calendar-two" className="calendar">
                <p>Calendar2</p>
            </div>
            <div id="calendar-three" className="calendar">
                <p>Calendar3</p>
            </div>
       
        <div id="button">
            <div id="b-x"></div>
            <div id="b-y"></div>
        </div>
        </div>
        
    </div>
    <div id="display">
        {/* <h3 sytle={{margin:0,color: "black" }}>Work in progress merged calendar coming soon</h3> */}
        
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
    </Scheduler> */}
    {/* <div style={{boxSizing: 'border-box'}}>  */}
   
      <Demo/>
  
    </div>
    
</body>
    </div>
  );
}

export default App;
