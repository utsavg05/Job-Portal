// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from './ui/table';
// import { Badge } from './ui/badge';
// import { useSelector } from 'react-redux';
// import store from '../redux/store';

// const AppliedJobsTable = () => {
//   const {allAppliedJobs} = useSelector(store => store.job)
  

//   return (
//     <div className="w-full bg-white p-6 rounded-md shadow-md">
//       <Table>
//         <TableCaption className="text-sm text-gray-500 mb-2">
//           A list of your applied jobs
//         </TableCaption>

//         {/* Table Head */}
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-left font-semibold">Date</TableHead>
//             <TableHead className="text-left font-semibold">Job Role</TableHead>
//             <TableHead className="text-left font-semibold">Company</TableHead>
//             <TableHead className="text-right font-semibold">Status</TableHead>
//           </TableRow>
//         </TableHeader>

//         {/* Table Body */}
//         <TableBody>
//            {
//              allAppliedJobs <= 0 ? <span>You haven't applied for any job yet.</span> : allAppliedJobs.map((appliedJob) => (
//               <TableRow key={appliedJob._id}>
//                 <TableCell className="text-left">{appliedJob.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="text-left">{appliedJob.job.title}</TableCell>
//                 <TableCell className="text-left">{appliedJob.job.company.name}</TableCell>
//                 <TableCell className="text-right">
//                   <Badge className={`${appliedJob.status === 'rejected' ? 'bg-red-300 text-red-900' : appliedJob.status === 'pending' ? 'bg-purple-300 text-purple-700' : 'bg-green-300 text-green-900' }`}>{appliedJob?.status.toUpperCase()}</Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           }
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AppliedJobsTable;



import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow border">
      <Table>
        <TableCaption className="text-sm text-gray-500 pt-2">
          A list of jobs you've applied to
        </TableCaption>

        {/* Table Head */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-left text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-left text-gray-700 font-semibold">Job Role</TableHead>
            <TableHead className="text-left text-gray-700 font-semibold">Company</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold pr-4">Status</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-all border-b border-gray-100"
              >
                <TableCell className="py-4 text-sm text-gray-800">
                  {appliedJob?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Badge className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyles(appliedJob?.status)}`}>
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You haven’t applied for any job yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
