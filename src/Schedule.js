import * as React from 'react';
import { useState,useEffect } from 'react';
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import LowPriority from '@material-ui/icons/LowPriority';
import Lens from '@material-ui/icons/Lens';
import Event from '@material-ui/icons/Event';
import AccessTime from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'clsx';

import { priorities } from './demo-data/tasks';
import { data as data1 } from './demo-data/grouping';
import axios from "axios";
console.log(data1);

// import * as AspNetData from 'devextreme-aspnet-data-nojquery';


// axios
//       .get("/api/tasks/")
//       .then((res) => setTask(res.data))
//       .catch((err) => console.log(err));
// console.log("task"+tasks)
export let catchdata=true;
const grouping = [{
  resourceName: 'priorityId',
}];

const filterTasks = (items, priorityId) => items.filter(task => (
  !priorityId || task.priorityId === priorityId
));

const getIconById = (id) => {
  if (id === 1) {
    return LowPriority;
  }
  if (id === 2) {
    return Event;
  }
  return PriorityHigh;
};

const styles = theme => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing(2),
    minWidth: 140,
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5),
    },
  },
});
const usePrioritySelectorItemStyles = makeStyles(({ palette, spacing }) => ({
  bullet: ({ color }) => ({
    backgroundColor: color ? color[400] : palette.divider,
    borderRadius: '50%',
    width: spacing(2),
    height: spacing(2),
    marginRight: spacing(2),
    display: 'inline-block',
  }),
  prioritySelectorItem: {
    display: 'flex',
    alignItems: 'center',
  },
  priorityText: {
    '@media (max-width: 500px)': {
      display: 'none',
    },
  },
  priorityShortText: {
    '@media (min-width: 500px)': {
      display: 'none',
    },
  },
}));
const useTooltipContentStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  contentContainer: {
    paddingBottom: theme.spacing(1.5),
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  icon: {
    verticalAlign: 'middle',
  },
  contentItemIcon: {
    textAlign: 'center',
  },
  grayIcon: {
    color: theme.palette.action.active,
  },
  colorfulContent: {
    color: ({ color }) => color[300],
  },
  lens: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
}));
const groupingStyles = ({ spacing }) => ({
  ...priorities.reduce((acc, priority) => ({
    ...acc,
    [`cell${priority.text.replace(' ', '')}`]: {
      backgroundColor: fade(priority.color[400], 0.1),
      '&:hover': {
        backgroundColor: fade(priority.color[400], 0.15),
      },
      '&:focus': {
        backgroundColor: fade(priority.color[400], 0.2),
      },
    },
    [`headerCell${priority.text.replace(' ', '')}`]: {
      backgroundColor: fade(priority.color[400], 0.1),
      '&:hover': {
        backgroundColor: fade(priority.color[400], 0.1),
      },
      '&:focus': {
        backgroundColor: fade(priority.color[400], 0.1),
      },
    },
  }), {}),
  icon: {
    paddingLeft: spacing(1),
    verticalAlign: 'middle',
  },
});

const DayViewTimeTableCell = withStyles(groupingStyles, { name: 'DayViewTimeTableCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <DayView.TimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const DayViewDayScaleCell = withStyles(groupingStyles, { name: 'DayViewDayScaleCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <DayView.DayScaleCell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const WeekViewTimeTableCell = withStyles(groupingStyles, { name: 'WeekViewTimeTableCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <WeekView.TimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const WeekViewDayScaleCell = withStyles(groupingStyles, { name: 'WeekViewDayScaleCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <WeekView.DayScaleCell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const AllDayCell = withStyles(groupingStyles, { name: 'AllDayCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <AllDayPanel.Cell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const GroupingPanelCell = withStyles(groupingStyles, { name: 'GroupingPanelCell' })(({
  group, classes, ...restProps
}) => {
  const groupId = group.id;
  const Icon = getIconById(groupId);
  return (
    <GroupingPanel.Cell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      group={group}
      {...restProps}
    >
      <Icon
        className={classes.icon}
      />
    </GroupingPanel.Cell>
  );
});

const PrioritySelectorItem = ({
  color, text: resourceTitle,
}) => {
  const text = resourceTitle || 'All Tasks';
  const shortText = resourceTitle ? text.substring(0, 1) : 'All';
  const classes = usePrioritySelectorItemStyles({ color });

  return (
    <div className={classes.prioritySelectorItem}>
      <span className={classes.bullet} />
      <span className={classes.priorityText}>{text}</span>
      <span className={classes.priorityShortText}>{shortText}</span>
    </div>
  );
};

const PrioritySelector = withStyles(styles, { name: 'PrioritySelector' })(({
  classes, priorityChange, priority,
}) => {
  const currentPriority = priority > 0 ? priorities[priority - 1] : {};
  return (
    <FormControl className={classes.prioritySelector}>
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value);
        }}
        renderValue={() => (
          <PrioritySelectorItem text={currentPriority.text} color={currentPriority.color} />
        )}
      >
        <MenuItem value={0}>
          <PrioritySelectorItem />
        </MenuItem>
        {priorities.map(({ id, color, text }) => (
          <MenuItem value={id} key={id.toString()}>
            <PrioritySelectorItem color={color} text={text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(({
  classes, priority, priorityChange, ...restProps
}) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <PrioritySelector priority={priority} priorityChange={priorityChange} />
  </Toolbar.FlexibleSpace>
));
const TooltipContent = ({
  appointmentData, formatDate, appointmentResources,
}) => {
  const resource = appointmentResources[0];
  const classes = useTooltipContentStyles({ color: resource.color });
  let icon = <LowPriority className={classes.icon} />;
  if (appointmentData.priorityId === 2) {
    icon = <Event className={classes.icon} />;
  }
  if (appointmentData.priorityId === 3) {
    icon = <PriorityHigh className={classes.icon} />;
  }
  return (
    <div className={classes.content}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classNames(classes.textCenter)}>
          <Lens className={classNames(classes.lens, classes.colorfulContent)} />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {formatDate(appointmentData.startDate, { day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" key={`${resource.fieldName}_${resource.id}`}>
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          {icon}
        </Grid>
        <Grid item xs={10}>
          <span className={classNames(classes.text, classes.colorfulContent)}>
            {resource.text}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

// import CustomStore from "devextreme/data/custom_store";
// import DataSource from "devextreme/data/data_source";

// function handleErrors(response) {
//   if (!response.ok)
//       throw Error(response.statusText);
//   return response;
// }
// const schedulerDataSource = new DataSource({
//   store: new CustomStore({
//       loadMode: "raw",   
//       load: () => {
//           return fetch("/api/tasks/")
//                   .then(handleErrors);
//       }
//   }),
//   paginate: false
// });


// function DataList(catchdata){
//   useEffect(() => {
//     axios
//     .get("/api/tasks/")
//     .then((res) => {console.log(res.data);
//       console.log('effect');
//       return res.data;
//     })
//     .catch((err) => console.log(err));
    
//   }, [catchdata]);
// }

export default class Demo extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      currentDate: '2018-04-17',
      currentViewName: 'Day',
      data: [],
      currentPriority: 0,
      resources: [{
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorities,
      }],
    };    

    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.priorityChange = (value) => {
      const { resources } = this.state;
      const nextResources = [{
        ...resources[0],
        instances: value > 0 ? [priorities[value - 1]] : priorities,
      }];

      this.setState({ currentPriority: value, resources: nextResources });
    };
    this.flexibleSpace = connectProps(FlexibleSpace, () => {
      const { currentPriority } = this.state;
      return {
        priority: currentPriority,
        priorityChange: this.priorityChange,
      };
    });
  }

  componentDidUpdate() {
    this.flexibleSpace.update();
    //this.refreshList();
  }
  refreshList = () => {
    // axios
    //   .get("/api/tasks/")
    //   .then((res) => this.setState({data: res.data }))
    //   .catch((err) => console.log(err));
    //   console.log("data1"+this.data);
    axios
      .get("/api/tasks/")
      .then((res) =>console.log(res.data))
      .catch((err) => console.log(err));
      console.log("data1"+this.data);
  };
  commitChanges({ added, changed, deleted }) {
    const item = { title: added.title, endDate: added.endDate ,
       startDate: added.startDate, allDay:added.allDay,priorityId:added.priorityId };
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => {console.log('done');
    catchdata=!catchdata;
    window.location.reload();});
    console.log(added);
    console.log(item);
    console.log(JSON.stringify(added.endDate))
    // this.setState((state) => {
    //   let { data } = state;
    //   if (added) {
    //     const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    //     data = [...data, { id: startingAddedId, ...added }];
    //   }
    //   if (changed) {
    //     data = data.map(appointment => (
    //       changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    //   }
    //   if (deleted !== undefined) {
    //     data = data.filter(appointment => appointment.id !== deleted);
    //   }
    //   return { data };
    // });
  }
  render() {
    
    //this.refreshList();
    const {
      data, currentDate, currentViewName, currentPriority, resources,
    } = this.state;
    console.log("data"+data);
    console.log(this.props.data);
    console.log(currentPriority)
    return (
      <Paper>
        <Scheduler
          data={filterTasks(this.props.data, currentPriority)}
          // dataSource={schedulerDataSource}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <GroupingState
            grouping={grouping}
          />

          <DayView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={DayViewTimeTableCell}
            dayScaleCellComponent={DayViewDayScaleCell}
            intervalCount={2}
          />
          <WeekView
            startDayHour={9}
            endDayHour={17}
            excludedDays={[0, 6]}
            name="Work Week"
            timeTableCellComponent={WeekViewTimeTableCell}
            dayScaleCellComponent={WeekViewDayScaleCell}
           
          />
          <AllDayPanel
            cellComponent={AllDayCell}
          />

          <Appointments />
          <Resources
            data={resources}
          />
          <IntegratedGrouping />

          <GroupingPanel
            cellComponent={GroupingPanelCell}
          />
          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher /> 
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <AppointmentTooltip
            contentComponent={TooltipContent}
            showOpenButton
            showCloseButton
          />
          
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}

// const url = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData';
// const dataSource = AspNetData.createStore({
//   key: 'AppointmentId',
//   loadUrl: `${url}/Get`,
//   insertUrl: `${url}/Post`,
//   updateUrl: `${url}/Put`,
//   deleteUrl: `${url}/Delete`,
//   onBeforeSend(_, ajaxOptions) {
//     ajaxOptions.xhrFields = { withCredentials: true };
//   },
// });

// const currentDate = new Date(2021, 3, 27);
// const views = ['day', 'workWeek', 'month'];

// export class Dema extends React.Component {
//   render() {
//     return (
//       <Scheduler
//         timeZone="America/Los_Angeles"
//         dataSource={dataSource}
//         views={views}
//         defaultCurrentView="day"
//         defaultCurrentDate={currentDate}
//         height={600}
//         startDayHour={9}
//         endDayHour={19}
//         remoteFiltering={true}
//         dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
//         textExpr="Text"
//         startDateExpr="StartDate"
//         endDateExpr="EndDate"
//         allDayExpr="AllDay"
//         recurrenceRuleExpr="RecurrenceRule"
//         recurrenceExceptionExpr="RecurrenceException" />
//     );
//   }
// }