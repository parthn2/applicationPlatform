import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobList from './components/JobList';

function App() {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        // Your request body here, if necessary
      })
      .then(response => {
        setJobData(response.data.jdList);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(jobData)) {
    return <div>Data is not available or still loading.</div>;
  }

  return (
    <div>
      <JobList jobs={jobData} />
  </div>
  );
}

export default App;