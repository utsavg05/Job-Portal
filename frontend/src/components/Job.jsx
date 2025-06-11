// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const Job = ({job}) => {
//     const navigate = useNavigate();
//     // const jobId = "lsekdhjgdsnfvsdkjf";

//     // const daysAgoFunction = (mongodbTime) => {
//     //     const createdAt = new Date(mongodbTime);
//     //     const currentTime = new Date();
//     //     const timeDifference = currentTime - createdAt;
//     //     return Math.floor(timeDifference/(1000*24*60*60));
//     // }
    
//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
//             <div className='flex items-center justify-between'>
//                 {/* <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p> */}
//                 <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
//             </div>

//             <div className='flex items-center gap-2 my-2'>
//                 <Button className="p-6" variant="outline" size="icon">
//                     <Avatar>
//                         <AvatarImage src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg" />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className='font-medium text-lg'>Company Name</h1>
//                     <p className='text-sm text-gray-500'>India</p>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='font-bold text-lg my-2'>title</h1>
//                 <p className='text-sm text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur architecto reprehenderit laboriosam!</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={'text-blue-700 font-bold'} variant="ghost">10 Positions</Badge>
//                 <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part Time</Badge>
//                 <Badge className={'text-[#7209b7] font-bold'} variant="ghost">20 LPA</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button variant="outline">Details</Button>
//                 <Button className="bg-[#7209b7]">Save For Later</Button>
//             </div>
//         </div>
//     )
// }

// export default Job


import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = 'skjcijhdsnjcaukae'

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (24*60*60*1000))
  }

  return (
    <div className="p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition duration-200">
      {/* Top: Save Icon */}
      <div className="flex items-center justify-between">
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Posted Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="text-gray-600 hover:text-[#7209b7]" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#6A38C2] mb-1">{job?.title}</h3>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge className="text-blue-700 bg-blue-100 font-medium" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] bg-red-100 font-medium" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] bg-purple-100 font-medium" variant="ghost">{job?.salary} LPA</Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id || '12345'}`)}
          className="hover:border-[#6A38C2] hover:text-[#6A38C2]"
        >
          View Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5e1f9c] text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
