import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <Table>
        <TableCaption className="text-gray-500 mt-2">
          A list of your recent registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right pr-4">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-50 transition-all border-b border-gray-100"
            >
              <TableCell className="py-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>

              <TableCell className="py-4 font-medium text-gray-800">{company.name}</TableCell>

              <TableCell className="py-4 text-sm text-gray-600">
                {company.createdAt?.split('T')[0]}
              </TableCell>

              <TableCell className="py-4 text-right pr-4">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
