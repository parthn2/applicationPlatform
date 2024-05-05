import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    filteredJobs: [],
    numberOfEmployees: [],
    searchQuery: '',
    isLoading: false,
    error: null
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        fetchJobsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchJobsSuccess(state, action) {
            state.jobs = action.payload;
            state.filteredJobs = action.payload; // Initially, filtered jobs are all jobs
            state.isLoading = false;
        },
        fetchJobsFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
            state.filteredJobs = state.jobs.filter(job =>
                job.companyName.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
        setMinExperience(state, action) {
            state.filteredJobs = state.jobs.filter(job =>
                job.minExp >= action.payload
            );
        },
        setMinBasePay(state, action) {
            state.filteredJobs = state.jobs.filter(job =>
                job.minJdSalary >= action.payload
            );
        },
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
    }
});

export const { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure, setSearchQuery, setMinExperience, setMinBasePay, setNumberOfEmployees } = jobsSlice.actions;
export default jobsSlice.reducer;