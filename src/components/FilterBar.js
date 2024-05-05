import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setMinExperience, setMinBasePay } from '../features/jobs/jobSlice';

const FilterBar = () => {
  //search query
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.jobs.searchQuery);
  const minExperience = useSelector(state => state.jobs.minExperience);
  const minBasePay = useSelector(state => state.jobs.minBasePay);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>

      <FormControl variant="outlined" style={{ marginRight: 8, marginBottom: 8, minWidth: 120 }}>
        <InputLabel>Min Experience</InputLabel>
        <Select
          label="Min Experience"
          value={minExperience}
          onChange={(e) => dispatch(setMinExperience(e.target.value))}>
          <MenuItem value="0">0+ years</MenuItem>
          <MenuItem value="1">1+ years</MenuItem>
          <MenuItem value="2">2+ years</MenuItem>
          <MenuItem value="3">3+ years</MenuItem>
          <MenuItem value="4">4+ years</MenuItem>
          <MenuItem value="5">5+ years</MenuItem>
          <MenuItem value="6">6+ years</MenuItem>
          <MenuItem value="7">7+ years</MenuItem>
          <MenuItem value="8">8+ years</MenuItem>
          <MenuItem value="9">9+ years</MenuItem>
          <MenuItem value="10">10+ years</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ marginRight: 8, marginBottom: 8, minWidth: 120 }}>
        <InputLabel>Min Base Pay</InputLabel>
        <Select
          label="Min Base Pay"
          value={minBasePay}
          onChange={(e) => dispatch(setMinBasePay(e.target.value))}>
          <MenuItem value="0">0L+</MenuItem>
          <MenuItem value="10">10L+</MenuItem>
          <MenuItem value="20">20L+</MenuItem>
          <MenuItem value="30">30L+</MenuItem>
          <MenuItem value="40">40L+</MenuItem>
          <MenuItem value="50">50L+</MenuItem>
          <MenuItem value="60">60L+</MenuItem>
          <MenuItem value="70">70L+</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search Company Name"
        variant="outlined"
        style={{ marginRight: 8 }}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </Box>
  );
};

export default FilterBar;