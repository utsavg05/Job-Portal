import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

  const seachJobHandler = (query) => {
      dispatch(setSearchedQuery(query))
      navigate('/browse')
    }

  return (
    <div className="w-full py-8 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">Explore Job Categories</h2>

      <Carousel className="w-full max-w-3xl mx-auto px-4">
        <CarouselContent className="flex items-center">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                variant="outline"
                onClick={() => seachJobHandler(cat)}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-200 px-6 py-3 text-sm font-medium"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
