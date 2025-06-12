import React from 'react';
import { useSelector } from 'react-redux';
import LatestJobsCard from './LatestJobsCard';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
        <span className="text-blue-700">Latest & Top </span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {allJobs.length <= 0 ? (
          <span className="text-lg font-semibold col-span-full text-center">
            No Jobs Available
          </span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobsCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
