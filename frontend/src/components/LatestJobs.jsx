import React from 'react'
import {Badge} from './ui/badge'
import LatestJobsCard from './LatestJobsCard'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    // const randomJobs = [1,2,3,4,5,6,7,8]
    const { allJobs } = useSelector(store => store.job)
  return (
    <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-blue-700'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-5 my-5'>
                {
                   allJobs.length <= 0 ? <span className='text-lg font-semibold'>No Jobs Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobsCard key={job._id} job={job} />)
                }
            </div>
        </div>
  )
}

export default LatestJobs
