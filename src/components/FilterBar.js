import * as React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/jobs/jobSlice';

const FilterBar = () => {
  //search query
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.jobs.searchQuery);
  const handleChange = (event) => {
      dispatch(setSearchQuery(event.target.value));
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <TextField
        label="Search Company Name"
        variant="outlined"
        style={{ marginRight: 8 }}
        value={searchQuery}
        onChange={handleChange}
      />
    </Box>
  );
};

export default FilterBar;