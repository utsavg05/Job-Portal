import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobsCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer">
      
      {/* Company Info */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h2>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title + Description */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#6A38C2] mb-1">{job?.title}</h3>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
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
