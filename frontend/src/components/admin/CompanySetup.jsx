import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import useGetCompanyById from '../../hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const { singleCompany } = useSelector(store => store.company)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
        file: null
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log(input)

        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('location', input.location)
        formData.append('website', input.website)

        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/companies')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            location: singleCompany.location || "",
            website: singleCompany.website || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto mt-10 px-4">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        onClick={() => navigate('/admin/companies')}
                        variant="outline"
                        className="flex items-center gap-2 text-gray-600"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
                </div>

                {/* Form Container */}
                <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input onChange={changeEventHandler} type="text" name="name" id="name" value={input.name} placeholder="e.g. Lenskart" />
                        </div>

                        {/* Website */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input onChange={changeEventHandler} type="text" name="website" id="website" value={input.website} placeholder="e.g. www.lenskart.com" />
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input onChange={changeEventHandler} type="text" name="location" id="location" value={input.location} placeholder="e.g. Gurugram, India" />
                        </div>

                        {/* Logo Upload */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="logo">Company Logo</Label>
                            <Input onChange={changeFileHandler} type="file" name="logo" id="logo" accept="image/*" />
                        </div>
                    </div>

                    {/* Description (spans full width) */}
                    <div className="mt-6">
                        <Label htmlFor="description">Description</Label>
                        <Textarea onChange={changeEventHandler}
                            name="description"
                            id="description"
                            value={input.description}
                            rows={4}
                            placeholder="Tell us about the company..."
                            className="mt-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        {loading ? (
                            <Button disabled className="w-full">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5930a0] text-white">
                                Update Company
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
