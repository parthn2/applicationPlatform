import { createSlice } from '@reduxjs/toolkit';

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
    console.log(state.role.length)
    console.log(state.location)
    state.filteredJobs = state.jobs.filter(job =>
        (state.role.length === 0 || state.role.some(role => job.jobRole.toLowerCase().includes(role))) && job.minJdSalary >= state.minBasePay && job.minExp >= state.minExperience && job.companyName.toLowerCase().includes(state.searchQuery.toLowerCase()) && (state.location !== '' && (job.location.toLowerCase() === state.location.toLowerCase() ||
        (state.location.toLowerCase() === "onsite" && job.location.toLowerCase() !== "remote")))
    );
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
        }
    }
});

export const { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure, setSearchQuery, setMinExperience, setMinBasePay, setNumberOfEmployees, setLocation, setRole } = jobsSlice.actions;
export default jobsSlice.reducer;