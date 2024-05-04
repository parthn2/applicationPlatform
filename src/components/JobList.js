import React from 'react';
import JobCard from './JobCard';
import './JobList.css';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default JobList;