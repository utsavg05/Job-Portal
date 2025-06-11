import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Let’s Set Up Your Company Profile
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Start by giving your company a recognizable name. This will appear on job listings and your public profile.
                    </p>
                </div>

                {/* Company Name Input */}
                <div className="mb-6">
                    <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                        Company Name
                    </Label>
                    <Input
                        type="text"
                        placeholder="e.g. Lenskart, Deston Technologies, Boat"
                        className="mt-2 w-1/2"
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-8">
                    <Button onClick={() => navigate('/admin/companies')} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany} className="bg-[#6A38C2] hover:bg-[#5c30a6] text-white">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
