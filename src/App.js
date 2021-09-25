import logo from './logo.svg';
// import './App.css';
import './main.scss';

function App() {
  return (
    <div className="App">
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
        <h3 sytle={{margin:0,
      color: "black" }}>Work in progress merged calendar coming soon</h3>
    </div>
    
</body>
    </div>
  );
}

export default App;
