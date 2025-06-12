import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    if (!query) {
      return
    }
    navigate('/browse')
  }

  return (
    <div className="text-center bg-gradient-to-br from-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 min-h-[60vh] sm:min-h-[70vh] flex items-center">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Tagline */}
        <span className="mx-auto px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full bg-[#e9e8ff] text-[#6A38C2] font-medium sm:font-semibold text-xs sm:text-sm md:text-base shadow-sm tracking-wide max-w-fit">
          India's Fastest Growing Job Discovery Platform
        </span>
        
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold sm:font-extrabold leading-tight sm:leading-tight md:leading-tight px-2 sm:px-4">
          Discover, Apply & Land Your{' '}
          <br className="hidden sm:block" />
          <span className="text-[#F83002] block sm:inline">Dream Job with Confidence</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Explore top companies, tailored roles, and career-changing opportunities — all in one place.
        </p>
        
        {/* Search Box */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row w-full border border-gray-300 rounded-lg sm:rounded-full shadow-md bg-white overflow-hidden">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, company, or keyword..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none placeholder-gray-500 rounded-t-lg sm:rounded-none"
            />
            <Button 
              onClick={searchJobHandler} 
              className="w-full h-[120] sm:w-auto rounded-b-lg sm:rounded-none sm:rounded-r-full bg-[#6A38C2] px-6 sm:px-7 py-3 sm:py-4 hover:bg-[#5730a3] transition-colors duration-200 font-medium"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white mr-2 sm:mr-0" />
              <span className="sm:hidden">Search Jobs</span>
            </Button>
          </div>
        </div>
        
        {/* Additional CTA section for mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6 px-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>1000+ jobs added daily</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>500+ top companies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;