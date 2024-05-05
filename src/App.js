import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobList from './components/JobList';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterBar from './components/FilterBar';
import { fetchJobs } from './features/jobs/jobSlice';

function App() {
  const dispatch = useDispatch();
  const { filteredJobs, isLoading, error } = useSelector(state => state.jobs);
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    dispatch(fetchJobs(page, limit));
  }, [dispatch, page]);

  const fetchMoreData = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <FilterBar />
      <InfiniteScroll
        dataLength={filteredJobs.length}
        next={fetchMoreData}
        hasMore={true} // You might need a better way to determine if there are more items
        loader={<h4>Loading...</h4>}
      >
        <JobList jobs={filteredJobs} />
      </InfiniteScroll>
    </div>
  );

}

export default App;