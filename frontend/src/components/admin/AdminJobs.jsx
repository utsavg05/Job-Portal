import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'

const AdminJobs = () => {

    useGetAllAdminJobs()

    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-18'>
                <div className='flex items-center justify-between my-10'>
                    <Input className='w-fit'
                        onChange={(e) => setInput(e.target.value)}
                        placeHolder='Filter By company or role' />
                    <Button className="bg-[#6A38C2] hover:bg-[#5c30a6] text-white" onClick={() => { navigate('/admin/jobs/create') }}>Add New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs
