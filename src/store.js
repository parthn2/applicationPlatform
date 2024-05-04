import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/jobs/jobSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer
    }
});