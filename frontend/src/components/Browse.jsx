import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs(); // fetch jobs
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear search query when leaving this page
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Search Results ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <p className="mt-6 text-gray-500">No jobs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
            {allJobs.map((job) => (
              <Job job={job} key={job._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
