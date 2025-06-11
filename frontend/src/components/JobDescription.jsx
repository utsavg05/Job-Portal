import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {

  const params = useParams()
  const jobId = params.id
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        console.log(res)
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="text-blue-700 bg-blue-100 font-medium">{singleJob?.position} Positons</Badge>
            <Badge className="text-[#F83002] bg-red-100 font-medium">{singleJob?.jobType}</Badge>
            <Badge className="text-[#7209b7] bg-purple-100 font-medium">{singleJob?.salary} LPA</Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-4 md:mt-0 rounded-lg px-6 ${isApplied
              ? 'bg-gray-500 cursor-not-allowed text-white'
              : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'
            }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Description Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Job Details</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>
            <strong>Role:</strong> <span className="ml-2">{singleJob?.title}</span>
          </li>
          <li>
            <strong>Location:</strong> <span className="ml-2">{singleJob?.location}</span>
          </li>
          <li>
            <strong>Description:</strong>
            <p className="ml-2 mt-1 text-gray-600">{singleJob?.description}</p>
          </li>
          <li>
            <strong>Experience:</strong> <span className="ml-2">{singleJob?.experienceLevel}</span>
          </li>
          <li>
            <strong>Requirements:</strong> <span className="ml-2 gap-2">{
              singleJob?.requirements.map((req, idx) => {
                return <Badge className='text-[#081c8e] bg-purple-100 font-medium ml-1'  variant='outline' key={idx}>{req}</Badge>
              })
              }</span>
          </li>
          <li>
            <strong>Salary:</strong> <span className="ml-2">{singleJob?.salary} LPA</span>
          </li>
          <li>
            <strong>Total Applicants:</strong> <span className="ml-2">{singleJob?.applications.length}</span>
          </li>
          <li>
            <strong>Posted Date:</strong> <span className="ml-2">{singleJob?.createdAt.split("T")[0]}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobDescription;
