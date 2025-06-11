// import React, { useEffect, useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from '../ui/table';
// import { Avatar, AvatarImage } from '../ui/avatar';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import store from '../../redux/store';

// const AdminJobsTable = () => {
//     const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
//     console.log("allAdminJobs:", allAdminJobs);

//     const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('called');
//         if (!Array.isArray(allAdminJobs)) return;
//         const filteredJobs = allAdminJobs.filter((job) => {
//             if (!searchJobByText) {
//                 return true;
//             };
//             return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
//         });
//         setFilterJobs(filteredJobs);
//     }, [allAdminJobs, searchJobByText])

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//             <Table>
//                 <TableCaption className="text-gray-500 mt-2">
//                     A list of your recent posted jobs
//                 </TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="w-[120px]">Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right pr-4">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {filterJobs?.map((job) => (
//                         <TableRow
//                             key={job._id}
//                             className="hover:bg-gray-50 transition-all border-b border-gray-100"
//                         >
//                             <TableCell className="py-4 font-medium text-gray-800">{job?.company?.name}</TableCell>
//                             <TableCell>{job?.title}</TableCell>

//                             <TableCell className="py-4 text-sm text-gray-600">
//                                 {job?.createdAt?.split('T')[0]}
//                             </TableCell>

//                             <TableCell className="py-4 text-right pr-4">
//                                 <Popover>
//                                     <PopoverTrigger>
//                                         <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-36 p-2">
//                                         <div
//                                             onClick={() => navigate(`/admin/companies/${job._id}`)}
//                                             className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
//                                         >
//                                             <Edit2 className="w-4 h-4" />
//                                             <span className="text-sm">Edit</span>
//                                         </div>
//                                         <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
//                                             <Eye className='w-4' />
//                                             <span>Applicants</span>
//                                         </div>
//                                     </PopoverContent>
//                                 </Popover>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AdminJobsTable;



import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(allAdminJobs)) return;

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <Table>
        <TableCaption className="text-gray-500 text-sm pt-4">
          A list of your recently posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-gray-700 font-semibold">Company</TableHead>
            <TableHead className="text-gray-700 font-semibold">Role</TableHead>
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-right pr-4 text-gray-700 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-gray-50 border-b border-gray-100 transition-all duration-200"
            >
              <TableCell className="py-4 text-base text-gray-800 font-medium">
                {job?.company?.name}
              </TableCell>

              <TableCell className="py-4 text-gray-600">{job?.title}</TableCell>

              <TableCell className="py-4 text-sm text-gray-500">
                {job?.createdAt?.split('T')[0]}
              </TableCell>

              <TableCell className="py-4 text-right pr-4">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-gray-700 transition" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 rounded-md shadow-lg border bg-white">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 text-gray-700" />
                      <span className="text-sm">Edit Job</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 p-2 mt-1 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                      <span className="text-sm">View Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
