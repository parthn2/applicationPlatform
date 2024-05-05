import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    jobs: [],
    filteredJobs: [],
    numberOfEmployees: [],
    role: [],
    minExperience: 0,
    minBasePay: 0,
    location: '',
    searchQuery: '',
    isLoading: false,
    error: null
};

function filterJobs(state){
    state.filteredJobs = state.jobs.filter(job =>
        (state.role.length === 0 || state.role.some(role => job.jobRole.toLowerCase().includes(role))) && job.minJdSalary >= state.minBasePay && job.minExp >= state.minExperience && job.companyName.toLowerCase().includes(state.searchQuery.toLowerCase()) && (state.location === '' || state.location === 'hybrid' || (job.location.toLowerCase() === state.location.toLowerCase() ||
        (state.location.toLowerCase() === "onsite" && job.location.toLowerCase() !== "remote")))
    );
    console.log(state.filteredJobs);
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        fetchJobsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchJobsSuccess(state, action) {
            // Concatenate new jobs with existing ones if the page > 1
            if (action.payload.page > 1) {
                state.jobs = [...state.jobs, ...action.payload.jobs];
                state.filteredJobs = [...state.filteredJobs, ...action.payload.jobs];
            } else {
                state.jobs = action.payload.jobs;
                state.filteredJobs = action.payload.jobs;
            }
            state.isLoading = false;
            filterJobs(state)
        },
        fetchJobsFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
            filterJobs(state);

        },
        setMinExperience(state, action) {
            state.minExperience = action.payload;
            filterJobs(state);

        },
        setMinBasePay(state, action) {
            state.minBasePay = action.payload;
            filterJobs(state);
        },
        //this function is not working because employee count is not availible in API
        setNumberOfEmployees: (state, action) => {
            state.numberOfEmployees = action.payload;
      
            // Helper function to check if employee count is within the range
            const isInRange = (count, range) => {
              if (range === "500+") {
                return count >= 500;
              }
              const [min, max] = range.split("-").map(Number);
              return count >= min && count <= max;
            };
      
            state.filteredJobs = state.jobs.filter(job =>
              state.numberOfEmployees.some(range => isInRange(job.employeeCount, range))  // job.employeeCount is not availible in API so this feauture is not working
            );
        },
        setLocation: (state, action) => {
            state.location = action.payload;
            filterJobs(state);
        },
        setRole: (state, action) => {
            state.role = action.payload;
            filterJobs(state);
        },

    }
});

// Assume page and limit parameters are being passed to the fetchJobs action
export const fetchJobs = (page, limit) => async (dispatch) => {
    dispatch(fetchJobsStart());
    try {
      const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        params: { page, limit }
      });
      dispatch(fetchJobsSuccess({
        jobs: response.data.jdList,
        page: page
      }));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };

export const { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure, setSearchQuery, setMinExperience, setMinBasePay, setNumberOfEmployees, setLocation, setRole } = jobsSlice.actions;
export default jobsSlice.reducer;