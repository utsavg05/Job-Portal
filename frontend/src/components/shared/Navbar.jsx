import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '../../redux/authSlice'
import { useState } from 'react'
import { useEffect } from 'react'


const Navbar = () => {

  const [scrolled, setScrolled] = useState(false)

  
  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { witCredentials: true })

      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className='relative bg-white mb-4'>
      <div className={`flex justify-between items-center max-w-full px-29 h-16 mx-auto ${scrolled ? 'h-14 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 w-full rounded-b-md z-50 px-5' : null}`}>
        <Link to="/">
          <div>
            {/* <h1 className='text-3xl text-black font-bold'>Job<span className='text-[#6A38C2]'>Seek</span></h1> */}
            <h1 className="text-3xl font-bold text-[#1E293B]">
              Job
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Seek</span>
            </h1>
          </div>
        </Link>
        <div className='flex items-center gap-12'>
          <ul className='flex items-center font-medium gap-5'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to='/admin/companies'>Companies</Link></li>
                  <li><Link to='/admin/jobs'>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/jobs'>Jobs</Link></li>
                  <li><Link to='/browse'>Browse</Link></li>
                </>
              )
            }
          </ul>

          {
            !user ? (
              <div className='flex items-center gap-2'>

                <Link to='/login'><Button variant="outline">Login</Button></Link>
                <Link to='/signup'><Button className="bg-primary-gradient">SignUp</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    <AvatarFallback className='bg-amber-300'>{user?.fullName.split(" ")[0].slice(0, 1)}{user?.fullName.split(" ")[1].slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                        <AvatarFallback className='bg-amber-300'>{user?.fullName.split(" ")[0].slice(0, 1)}{user?.fullName.split(" ")[1].slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col gap-1'>
                        <h4 className="font-medium leading-none">{user?.fullName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className='flex flex-col my-3 text-gray-600'>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      {
                        user && user.role === 'student' && (
                          <>
                          <User2 />
                          <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                          </>
                        )
                      }
                    </div>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar