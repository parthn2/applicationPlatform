import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    filteredJobs: [],
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
    }
});

export const { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure, setSearchQuery, setMinExperience, setMinBasePay } = jobsSlice.actions;
export default jobsSlice.reducer;