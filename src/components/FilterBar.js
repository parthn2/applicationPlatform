import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setMinExperience, setMinBasePay, setNumberOfEmployees, setLocation} from '../features/jobs/jobSlice';

const FilterBar = () => {
  //search query
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.jobs.searchQuery);
  const minExperience = useSelector(state => state.jobs.minExperience);
  const minBasePay = useSelector(state => state.jobs.minBasePay);

  const numberOfEmployees = useSelector(state => state.jobs.numberOfEmployees);
  const location = useSelector(state => state.jobs.location);

  // Function to handle the removal of a filter chip
  const handleDelete = (chipToDelete) => () => {
    dispatch(setNumberOfEmployees(numberOfEmployees.filter((chip) => chip !== chipToDelete)));
  };
  // Function to add a new number of employees filter
  const handleAddEmployeeFilter = (event) => {
    const newFilter = event.target.value;
    if (!numberOfEmployees.includes(newFilter)) {
      dispatch(setNumberOfEmployees([...numberOfEmployees, newFilter]));
    }
  };

    // For location
    const handleDeleteLocation = (chipToDelete) => () => {
      dispatch(setLocation(location.filter((chip) => chip !== chipToDelete)));
    };
    const handleAddLocationFilter = (event) => {
      const newFilter = event.target.value;
      if (!location.includes(newFilter)) {
        dispatch(setLocation([...location, newFilter]));
      }
    };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>

        <FormControl variant="outlined" style={{ marginRight: 8, marginBottom: 8, minWidth: 120 }}>
        <InputLabel>Location</InputLabel>
        <Select
          label="Location"
          value={location}
          onChange={(e) => dispatch(setLocation(e.target.value))}>
          <MenuItem value="remote">remote</MenuItem>
          <MenuItem value="onsite">On Site</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ marginRight: 8, marginBottom: 8, minWidth: 120 }}>
        <InputLabel>No Of Employees</InputLabel>
        <Select
          label="No Of Employees"
          value=""
          onChange={handleAddEmployeeFilter}
          renderValue={(selected) => null} // Prevents displaying the value inside the select box
        >
          <MenuItem value="1-10">1-10</MenuItem>
          <MenuItem value="11-20">11-20</MenuItem>
          <MenuItem value="21-50">21-50</MenuItem>
          <MenuItem value="51-500">51-100</MenuItem>
          <MenuItem value="101-200">101-200</MenuItem>
          <MenuItem value="201-500">201-500</MenuItem>
          <MenuItem value="500+">500+</MenuItem>
        </Select>
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {numberOfEmployees.map((data) => (
            <Chip
              key={data}
              label={data}
              onDelete={handleDelete(data)}
            />
          ))}
        </Box>
      </FormControl>

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