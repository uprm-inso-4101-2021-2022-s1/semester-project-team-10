import './App.css';
import Header from './components/Header';
import Main from './components/Main';
// import './App.css';
import { useState,useEffect } from 'react';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   DayView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';
import catchdata from './Schedule';
// import MetaTags from 'react-meta-tags';


// const currentDate = '2018-11-01';
// const schedulerData = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];
import axios from "axios";







function App() {

  // let elem0 = document.getElementById("signin")
  // let elem1 = document.getElementById("login")
  // let elem2 = document.getElementById("logout")

  // console.log(elem0)
  // if(elem0&&elem1&&elem2){
  //   console.log("wepa")
  //   elem0.onclick= SignIn()
  //   elem1.onclick= LogIn()
  //   elem2.onclick= LogOut()
  // }

  let [log,setLog]=useState([localStorage.getItem('token') ? true : false,""])
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

    // axios
    // .get("/api/tasks/")
    // .then((res) => {console.log(res.data);
    //   setData(res.data);
    //   console.log('effect');
    // })
    // .catch((err) => console.log(err));


    if (log[0]) {
    //   axios
    // .post("http://localhost:8000/api/auth/register",data )
    // .then((res) => {console.log('done');});}}


    //   fetch('http://localhost:8000/core/current_user/', {
    //     headers: {
    //       Authorization: `JWT ${localStorage.getItem('token')}`
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(json => {
    //       this.setState({ username: json.username });
    //     });
    }
    
  }, [catchdata]);

 

  return (
    <div className="App">

          {/* <MetaTags>
            <title>DaySynch</title>
            <meta id="meta-description" name="description" content="Time Management Web" />
            <meta id="og-title" property="og:title" content="MyApp" />
            <meta id="og-image" property="og:image" content="https://i.pinimg.com/originals/c8/4f/fc/c84ffc99f868d4585e8b604709dcca75.png" />
          </MetaTags> */}

      <Header />
      <Main/>

    </div>

  );
}

export default App;
