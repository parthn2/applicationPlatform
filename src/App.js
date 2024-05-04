import "./App.css";
import JobsList from './components/JobList';
import jobs from './components/Jobs'; // the mock data file

const App = () => {
  return (
    <div className="App">
      <JobsList jobs={jobs}/>
    </div>
  );
}

export default App;
