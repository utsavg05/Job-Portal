import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="p-5 md:p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition duration-200 h-full flex flex-col justify-between">
      
      {/* Top: Save Icon & Time */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Posted Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="text-gray-600 hover:text-[#7209b7] w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-3">
        <Avatar className="w-12 h-12 md:w-14 md:h-14">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800">{job?.company?.name}</h2>
          <p className="text-xs md:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-[#6A38C2] mb-1">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge className="text-blue-700 bg-blue-100 font-medium" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] bg-red-100 font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] bg-purple-100 font-medium" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 mt-auto">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id || '12345'}`)}
          className="hover:border-[#6A38C2] hover:text-[#6A38C2] w-full md:w-auto"
        >
          View Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5e1f9c] text-white w-full md:w-auto">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
