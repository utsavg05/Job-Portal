import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import {useDispatch} from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice';
import {useNavigate} from 'react-router-dom'

const HeroSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const seachJobHandler = () => {
    dispatch(setSearchedQuery(query))
    if(!query) {
      return
    }
    navigate('/browse')
  }

  return (
    <div className="text-center bg-gradient-to-br from-white to-gray-50 py-16">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4">
        
        {/* Tagline */}
        <span className="mx-auto px-5 py-2 rounded-full bg-[#e9e8ff] text-[#6A38C2] font-semibold text-sm shadow-sm tracking-wide">
          India’s Fastest Growing Job Discovery Platform
        </span>
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Discover, Apply & Land Your <br />
          <span className="text-[#F83002]">Dream Job with Confidence</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-gray-600 text-base md:text-lg">
          Explore top companies, tailored roles, and career-changing opportunities — all in one place.
        </p>
        
        {/* Search Box */}
        <div className="flex w-full md:w-[70%] border border-gray-300 rounded-full shadow-md items-center mx-auto overflow-hidden bg-white">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, company, or keyword..."
            className="flex-1 px-6 py-3 text-sm outline-none placeholder-gray-500"
          />
          <Button onClick={seachJobHandler} className="rounded-none rounded-r-full bg-[#6A38C2] px-7 py-6 hover:bg-[#5730a3] transition">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
