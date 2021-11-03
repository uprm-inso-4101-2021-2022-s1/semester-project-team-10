import './App.css';
import Header from './components/Header';
import Main from './components/Main';


function App() {
  
  

  return (
    <div className="App">

          {/* <MetaTags>
            <title>DaySynch</title>
            <meta id="meta-description" name="description" content="Time Management Web" />
            <meta id="og-title" property="og:title" content="MyApp" />
            <meta id="og-image" property="og:image" content="https://i.pinimg.com/originals/c8/4f/fc/c84ffc99f868d4585e8b604709dcca75.png" />
          </MetaTags> */}

      <Header />
      <Main />

    </div>

  );
}

export default App;
