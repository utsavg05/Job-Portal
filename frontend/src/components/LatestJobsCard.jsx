import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobsCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
    >
      {/* Company Info */}
      <div className="mb-2 sm:mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {job?.company?.name}
        </h2>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title + Description */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-[#6A38C2] mb-1 line-clamp-1">
          {job?.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <Badge className="text-blue-700 font-medium bg-blue-100" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-medium bg-red-100" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-medium bg-purple-100" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
