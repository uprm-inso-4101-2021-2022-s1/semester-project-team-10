import React from 'react';
import Scheduler, { Resource, View,Editing } from 'devextreme-react/scheduler';
import axios from "axios";
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

const views = ['day','week','month','agenda','timelineMonth'];


export const priorityData = [{
    text: 'Low Priority',
    id: 1,
    color: '#fcb65e',
  }, {
    text: 'High Priority',
    id: 2,
    color: '#e18e92',
  },
  ];
  
  export const typeData = [{
    text: 'Home',
    id: 1,
    color: '#b6d623',
  }, {
    text: 'Work',
    id: 2,
    color: '#679ec5',
  },
  ];
const currentDate = new Date(2018, 3, 17);
const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const priorityGroups = ['priorityId'];

class Demo1 extends React.Component {
    
  render() {
      
    return (
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={this.props.data}
        defaultCurrentView="agenda"
        showAllDayPanel={false}
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={7}
        endDayHour={23}
        onAppointmentAdded={commitChanges}
        view={views}
        
      >
        <View
          type="day"
          groups={['priorityId']}
        />
        <View
          type="week"
          groups={priorityGroups}
          dateCellRender={renderDateCell}
        />
        <View
          type="month"
        />
        <View
          type="agenda"
          groupByDate={true}
          groupOrientation="vertical"
          
        />
        <View
          type="timelineMonth"
          groups={['priorityId']}
        />
        <Resource
          dataSource={priorityData}
          fieldExpr="priorityId"
          label="Priority"
          allowMultiple={false}
          useColorAsDefault={true}
        />
        <Resource
          dataSource={typeData}
          fieldExpr="typeId"
          label="Type"
          allowMultiple={false}
        />

      </Scheduler>
    );
  }
}

function renderDateCell(cellData) {
  return (
    <React.Fragment>
      <div className="name">{dayOfWeekNames[cellData.date.getDay()]}</div>
      <div className="number">{cellData.date.getDate()}</div>
    </React.Fragment>
  );
}
function commitChanges(added) {
    console.log(added)
    const item = { title: added.appointmentData.text, endDate: added.appointmentData.endDate ,
       startDate: added.appointmentData.startDate, allDay:added.appointmentData.allDay,priorityId:added.appointmentData.priorityId };
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => {console.log('done');});
  }
export default Demo1;
