import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { Loader2 } from 'lucide-react';

const Signup = () => {

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: ""
  })

  const dispatch = useDispatch()
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("fullName", input.fullName)
    formdata.append("email", input.email)
    formdata.append("password", input.password)
    formdata.append("phoneNumber", input.phoneNumber)
    formdata.append("role", input.role)
    if (input.file) {
      formdata.append("file", input.file)
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }

  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form onSubmit={submitHandler} className="w-full max-w-lg border border-gray-200 rounded-md p-6 my-10 shadow-sm">
          <h1 className="font-bold text-2xl text-center mb-6">Sign Up</h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="block mb-1" htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="e.g. fullname"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="block mb-1" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="e.g. user@gmail.com"
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label className="block mb-1" htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="e.g. 98xxxxxxxx"
              className="w-full"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="block mb-1" htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          {/* Role and Profile Upload */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <RadioGroup className="flex gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  id="student"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  id="recruiter"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col w-full md:w-auto">
              <Label htmlFor="profile" className="mx-auto mb-2">Upload Profile</Label>
              <Input
                id="profile"
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {
            loading ? <Button className='w-full mb-3 bg-primary-gradient'><Loader2 className='mr-2 w-4 h-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full mb-3 bg-primary-gradient">Signup</Button>
          }

          {/* Login Link */}
          <p className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
