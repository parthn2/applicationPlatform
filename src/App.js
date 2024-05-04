import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';
import { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } from './features/jobs/jobSlice';

function App() {
  const dispatch = useDispatch();
  const { filteredJobs, isLoading, error } = useSelector(state => state.jobs);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchJobsStart());
      try {
        const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON');
        dispatch(fetchJobsSuccess(response.data.jdList));
      } catch (error) {
        dispatch(fetchJobsFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <FilterBar />
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default App;