import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
  const [input, setInput] = useState("")
  useGetAllCompanies()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-18'>
        <div className='flex items-center justify-between my-10'>
          <Input className='w-fit'
            onChange={(e) => setInput(e.target.value)}
            placeHolder='Filter By Name' />
          <Button className="bg-[#6A38C2] hover:bg-[#5c30a6] text-white" onClick={() => { navigate('/admin/companies/create') }}>New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies
