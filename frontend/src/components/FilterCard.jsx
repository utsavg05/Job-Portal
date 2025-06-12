import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Gurugram", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Digital Marketing"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 md:p-5 rounded-lg shadow-md border border-gray-200 sticky top-5">
      <h2 className="font-bold text-lg md:text-xl mb-4 text-gray-800">Filter Jobs</h2>

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            <h3 className="text-md font-semibold text-gray-700 mb-2">{data.filterType}</h3>
            <div className="flex flex-col gap-2">
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="h-4 w-4 border-gray-400 text-blue-600 focus:ring-blue-400"
                    />
                    <Label htmlFor={itemId} className="text-sm text-gray-600 cursor-pointer">{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
