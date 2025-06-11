import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {
        status
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <Table>
        <TableCaption className="text-gray-500 text-sm pt-4">
          A list of your recent applicants
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead className="text-right pr-4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition-all border-b border-gray-100"
              >
                <TableCell className="py-4 font-medium text-gray-800">
                  {item?.applicant?.fullName}
                </TableCell>
                <TableCell className="text-sm text-gray-600">{item?.applicant?.email}</TableCell>
                <TableCell className="text-sm text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline text-sm"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">Not uploaded</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item?.applicant?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item._id)}
                          className="text-sm text-gray-700 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                No applicants yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
