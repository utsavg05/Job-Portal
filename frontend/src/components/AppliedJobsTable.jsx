import React from 'react';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="w-full">
      {/* Table for larger screens */}
      <div className="hidden md:block bg-white p-6 rounded-xl shadow border overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-gray-500 pt-2">
            A list of jobs you've applied to
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Job Role</TableHead>
              <TableHead className="text-left">Company</TableHead>
              <TableHead className="text-right pr-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs?.length > 0 ? (
              allAppliedJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob._id}
                  className="hover:bg-gray-50 transition-all border-b border-gray-100"
                >
                  <TableCell>{formatDate(appliedJob?.createdAt)}</TableCell>
                  <TableCell>{appliedJob?.job?.title || 'N/A'}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name || 'N/A'}</TableCell>
                  <TableCell className="text-right pr-4">
                    <Badge className={`text-xs px-3 py-1 rounded-full ${getStatusStyles(appliedJob?.status)}`}>
                      {appliedJob?.status?.toUpperCase() || 'PENDING'}
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

      {/* Card layout for mobile screens */}
      <div className="md:hidden space-y-4">
        {allAppliedJobs?.length > 0 ? (
          allAppliedJobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-xl shadow border space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Date:</span> {formatDate(job?.createdAt)}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Role:</span> {job?.job?.title || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Company:</span> {job?.job?.company?.name || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Status:</span>{' '}
                <Badge className={`text-xs px-2 py-1 rounded-full ${getStatusStyles(job?.status)}`}>
                  {job?.status?.toUpperCase() || 'PENDING'}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-6">You haven’t applied for any job yet.</div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobsTable;
