import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const CategoryCarousel = () => {
  const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Data Scientist',
    'Software Developer',
    'Fullstack Developer',
    'Digital Marketing',
    'Graphic Designer',
    'Business Analyst',
    'Project Manager',
    'UI/UX Designer',
    'DevOps Engineer',
    'Cybersecurity Specialist',
    'Content Writer',
  ];

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            Explore Job Categories
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover opportunities across various industries and specializations
          </p>
        </div>

        {/* Mobile Grid View (< sm) */}
        <div className="sm:hidden">
          <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
            {categories.slice(0, 6).map((cat, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => searchJobHandler(cat)}
                className="w-full rounded-full border-gray-300 text-gray-700 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-200 px-4 py-3 text-sm font-medium shadow-sm hover:shadow-md"
              >
                {cat}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => navigate('/browse')}
              className="w-full text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-200 mt-2"
            >
              View All Categories →
            </Button>
          </div>
        </div>

        {/* Tablet Grid View (sm to md) */}
        <div className="hidden sm:block md:hidden">
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            {categories.slice(0, 8).map((cat, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => searchJobHandler(cat)}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-200 px-4 py-3 text-sm font-medium shadow-sm hover:shadow-md"
              >
                {cat}
              </Button>
            ))}
            <div className="col-span-2 flex justify-center mt-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/browse')}
                className="text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-200"
              >
                View All Categories →
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Carousel View (md and above) */}
        <div className="hidden md:block">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="flex items-center -ml-2 md:-ml-4">
              {categories.map((cat, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <Button
                    variant="outline"
                    onClick={() => searchJobHandler(cat)}
                    className="w-full max-w-xs rounded-full border-gray-300 text-gray-700 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-100 px-4 md:px-6 py-3 text-sm md:text-base font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    {cat}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Carousel Navigation */}
            <div className="hidden lg:block">
              <CarouselPrevious className="left-0 md:-left-4 lg:-left-8 bg-white shadow-lg border-gray-200 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-200" />
              <CarouselNext className="right-0 md:-right-4 lg:-right-8 bg-white shadow-lg border-gray-200 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-200" />
            </div>
          </Carousel>
          
          {/* Carousel Indicators for Medium screens */}
          <div className="flex justify-center mt-6 lg:hidden">
            <Button
              variant="ghost"
              onClick={() => navigate('/browse')}
              className="text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-200"
            >
              Swipe to see more categories →
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 sm:mt-10 md:mt-12 max-w-4xl mx-auto">
          <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#6A38C2]">500+</div>
            <div className="text-xs sm:text-sm text-gray-600">Companies</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#F83002]">10K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">50K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Job Seekers</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">95%</div>
            <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;