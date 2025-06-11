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
import { setLoading, setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const {loading, user} = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setInput({
      email: "",
      password: "",
      role: ""
    });

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }

  }

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form onSubmit={submitHandler} className="w-full max-w-lg border border-gray-200 rounded-md p-6 my-10 shadow-sm">
          <h1 className="font-bold text-2xl text-center mb-6">Login</h1>

          {/* Email */}
          <div className="mb-4">
            <Label className="block mb-1" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="e.g. user@email.com"
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

          </div>

        {
          loading ? <Button className='w-full mb-3 bg-primary-gradient'><Loader2 className='mr-2 w-4 h-4 animate-spin'/>Please wait</Button> : <Button type="submit" className="w-full mb-3 bg-primary-gradient">Login</Button>
        }
          
          {/* Login Link */}
          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login
