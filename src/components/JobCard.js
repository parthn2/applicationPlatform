import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  // Function to truncate the job details text if it's too long
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={job.logoUrl} alt="Company Logo" className="company-logo"/>
        <time>Posted {job.postedTime || 10} days ago</time>
      </div>
      <h2 className="company-name">{job.companyName}</h2>
      <h3 className="job-title">{job.jobRole}</h3>
      <p className="job-location">{job.location}</p>
      {job.minJdSalary && job.maxJdSalary && <div className="salary">
        Estimated Salary: {job.salaryCurrencyCode} {job.minJdSalary} - {job.maxJdSalary} LPA
      </div>
      }
      <div className="about-company">
        <h4>About Company:</h4>
        <p>{truncateText(job.jobDetailsFromCompany, 100)}</p> {/* Truncate to 100 characters */}
      </div>
      {job.minExp && <div className="minimum-experience">Minimum Experience: {job.minExp} years</div>}
      <button className="apply-button">Easy Apply</button>
      <button className="referral-button">
        Unlock referral asks
      </button>
      <a href={job.jdLink} target="_blank" rel="noopener noreferrer" className="view-job-link">View Job</a>
    </div>
  );
};

export default JobCard;