import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Browse = () => {
    // const randomJobs = [1, 2, 3, 4, 5, 6]
    useGetAllJobs()
    const {allJobs} = useSelector(store => store.job)
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='text-xl font-semibold'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-5 mt-7'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job job={job} key={job._id} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
