import React from 'react';
import JobCard from './JobCard';
import './JobList.css';
import { useSelector } from 'react-redux';

const JobList = ({ jobs }) => {
  const filteredJobs = useSelector(state => state.jobs.filteredJobs);

  return (
    <div className="job-list">
      {filteredJobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default JobList;