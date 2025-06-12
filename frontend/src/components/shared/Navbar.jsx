// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
// import { Button } from '../ui/button'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { LogOut, User2 } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import store from '../../redux/store'
// import { toast } from 'sonner'
// import { USER_API_END_POINT } from '@/utils/constant'
// import axios from 'axios'
// import { setUser } from '../../redux/authSlice'
// import { useState } from 'react'
// import { useEffect } from 'react'


// const Navbar = () => {

//   const [scrolled, setScrolled] = useState(false)


//   useEffect(() => {

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)

//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const navigate = useNavigate()
//   const { user } = useSelector(store => store.auth)
//   const dispatch = useDispatch()

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, { witCredentials: true })

//       if (res.data.success) {
//         dispatch(setUser(null))
//         navigate("/")
//         toast.success(res.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.response.data.message)
//     }

//   }

//   return (
//     <div className='relative bg-white mb-4'>
//       <div className={`flex justify-between items-center max-w-full px-29 h-16 mx-auto ${scrolled ? 'h-14 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 w-full rounded-b-md z-50 px-5' : null}`}>
//         <Link to="/">
//           <div>
//             {/* <h1 className='text-3xl text-black font-bold'>Job<span className='text-[#6A38C2]'>Seek</span></h1> */}
//             <h1 className="text-3xl font-bold text-[#1E293B]">
//               Job
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Seek</span>
//             </h1>
//           </div>
//         </Link>
//         <div className='flex items-center gap-12'>
//           <ul className='flex items-center font-medium gap-5'>
//             {
//               user && user.role === 'recruiter' ? (
//                 <>
//                   <li><Link to='/admin/companies'>Companies</Link></li>
//                   <li><Link to='/admin/jobs'>Jobs</Link></li>
//                 </>
//               ) : (
//                 <>
//                   <li><Link to='/'>Home</Link></li>
//                   <li><Link to='/jobs'>Jobs</Link></li>
//                   <li><Link to='/browse'>Browse</Link></li>
//                 </>
//               )
//             }
//           </ul>

//           {
//             !user ? (
//               <div className='flex items-center gap-2'>

//                 <Link to='/login'><Button variant="outline">Login</Button></Link>
//                 <Link to='/signup'><Button className="bg-primary-gradient">SignUp</Button></Link>
//               </div>
//             ) : (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                     <AvatarFallback className='bg-amber-300'>{user?.fullName.split(" ")[0].slice(0, 1)}{user?.fullName.split(" ")[1].slice(0, 1)}</AvatarFallback>
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80">
//                   <div className="">
//                     <div className="flex gap-2 space-y-2">
//                       <Avatar className="cursor-pointer">
//                         <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                         <AvatarFallback className='bg-amber-300'>{user?.fullName.split(" ")[0].slice(0, 1)}{user?.fullName.split(" ")[1].slice(0, 1)}</AvatarFallback>
//                       </Avatar>
//                       <div className='flex flex-col gap-1'>
//                         <h4 className="font-medium leading-none">{user?.fullName}</h4>
//                         <p className="text-sm text-muted-foreground">
//                           {user?.profile?.bio}
//                         </p>
//                       </div>
//                     </div>

//                   </div>

//                   <div className='flex flex-col my-3 text-gray-600'>
//                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                       {
//                         user && user.role === 'student' && (
//                           <>
//                           <User2 />
//                           <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
//                           </>
//                         )
//                       }
//                     </div>
//                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                       <LogOut />
//                       <Button onClick={logoutHandler} variant="link">Logout</Button>
//                     </div>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             )
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2, Menu, X } from 'lucide-react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu when clicking outside or on links
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
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
    setMobileMenuOpen(false)
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Spacer for fixed navbar */}
      {scrolled && <div className="h-14 sm:h-16"></div>}
      
      <div className='relative bg-white mb-2 sm:mb-4'>
      <div className={`flex justify-between items-center max-w-full px-4 sm:px-6 lg:px-8 xl:px-29 h-14 sm:h-16 mx-auto transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-100' : ''
      }`}>
        
        {/* Brand Logo */}
        <Link to="/" onClick={handleLinkClick}>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E293B]">
              Job
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Seek</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 lg:gap-12'>
          <ul className='flex items-center font-medium gap-4 lg:gap-6 text-sm lg:text-base'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to='/admin/companies' className="hover:text-purple-600 transition-colors">Companies</Link></li>
                  <li><Link to='/admin/jobs' className="hover:text-purple-600 transition-colors">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to='/' className="hover:text-purple-600 transition-colors">Home</Link></li>
                  <li><Link to='/jobs' className="hover:text-purple-600 transition-colors">Jobs</Link></li>
                  <li><Link to='/browse' className="hover:text-purple-600 transition-colors">Browse</Link></li>
                </>
              )
            }
          </ul>

          {/* Desktop Auth Section */}
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to='/login'><Button variant="outline" size="sm">Login</Button></Link>
                <Link to='/signup'><Button className="bg-primary-gradient" size="sm">SignUp</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-8 w-8 lg:h-10 lg:w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                    <AvatarFallback className='bg-amber-300 text-xs lg:text-sm'>
                      {user?.fullName.split(" ")[0]?.slice(0, 1)}{user?.fullName.split(" ")[1]?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-72 lg:w-80 mr-4">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                        <AvatarFallback className='bg-amber-300'>
                          {user?.fullName.split(" ")[0]?.slice(0, 1)}{user?.fullName.split(" ")[1]?.slice(0, 1)}
                        </AvatarFallback>
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
                    {user && user.role === 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 size={16} />
                        <Button variant="link" className="p-0 h-auto"><Link to='/profile'>View Profile</Link></Button>
                      </div>
                    )}
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut size={16} />
                      <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>

        {/* Mobile Menu Button & User Avatar */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile User Avatar */}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  <AvatarFallback className='bg-amber-300 text-xs'>
                    {user?.fullName.split(" ")[0]?.slice(0, 1)}{user?.fullName.split(" ")[1]?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 mr-4">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                      <AvatarFallback className='bg-amber-300'>
                        {user?.fullName.split(" ")[0]?.slice(0, 1)}{user?.fullName.split(" ")[1]?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                      <h4 className="font-medium leading-none text-sm">{user?.fullName}</h4>
                      <p className="text-xs text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col my-3 text-gray-600'>
                  {user && user.role === 'student' && (
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 size={14} />
                      <Button variant="link" className="p-0 h-auto text-sm"><Link to='/profile' onClick={handleLinkClick}>View Profile</Link></Button>
                    </div>
                  )}
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut size={14} />
                    <Button onClick={logoutHandler} variant="link" className="p-0 h-auto text-sm">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Hamburger Menu Button */}
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
            onClick={(e) => {
              e.stopPropagation()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-gray-600" />
            ) : (
              <Menu size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-25" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-4">
          <ul className='flex flex-col gap-4 font-medium'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li>
                    <Link 
                      to='/admin/companies' 
                      className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/admin/jobs' 
                      className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to='/' 
                      className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/jobs' 
                      className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/browse' 
                      className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )
            }
          </ul>

          {/* Mobile Auth Section */}
          {!user && (
            <div className='flex flex-col gap-3 mt-6 pt-6 border-t'>
              <Link to='/login' onClick={handleLinkClick}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to='/signup' onClick={handleLinkClick}>
                <Button className="bg-primary-gradient w-full">SignUp</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar

