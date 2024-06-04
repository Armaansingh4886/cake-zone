import React, { useContext, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { MdOutlineMail } from "react-icons/md";
import { GiStairsCake } from "react-icons/gi";
import { LuPhoneCall } from "react-icons/lu";



const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }
  return (
    <>
    <header className='h-20 shadow-md  fixed w-full z-40 '>
      <div className='flex w-full h-20 justify-between	px-40 items-center bg-orange-50'>
        <div className='flex cursor-pointer'>
          <div className=''><span className='text-4xl '><MdOutlineMail /></span></div>
          <div className='flex  flex-col items-start ml-2'>
            <span className='font-semibold '>EMAIL</span>
            <span className='text-sm text-slate-500 '>cakezone@gmail.com</span>
          </div>
        </div>
        <div>
          <div className='flex border h-[80px] w-[550px] items-center justify-center bg-amber-500 	'>
            <Link to={"/"}>
              <div className='flex items-center justify-center h-[65px] w-[530px] border-white border-2 '><span className='text-5xl cursor-pointer'><GiStairsCake /></span>
                <span className='text-5xl font-bold text-white cursor-pointer'>CAKEZONE</span></div>
            </Link>
          </div>

        </div>
        <div className='flex cursor-pointer'>
          <div className=''><span className='text-4xl'><LuPhoneCall /></span></div>
          <div className='flex  flex-col items-start ml-2'>
            <span className='font-semibold '>CALL US</span>
            <span className='text-sm text-slate-500 '>+91 6273621234</span>
          </div>
        </div>

      </div>
      
        <div className=' h-full bg-stone-900 w-full mx-auto flex items-center  px-40 justify-between'>
          <div className='flex gap-5'>
            <Link to={"/"}><span className='text-white text-xl font-bold hover:text-amber-500'>HOME</span></Link>
            <Link to={"/about"}><span className='text-white text-xl font-bold hover:text-amber-500'>ABOUT</span></Link>
            
            <Link to={"/orders"}><span className='text-white text-xl font-bold hover:text-amber-500'>ORDERS</span></Link>
            <Link to={"/master"}><span className='text-white text-xl font-bold hover:text-amber-500'>MASTER CHEFS</span></Link>
                      </div>
          {/* <div className='hidden lg:flex items-center w-full justify-between max-w-sm border-gray bg-white h-11 rounded-lg focus-within:shadow pl-2'>
            <input type='text' placeholder='search product here...' className='w-full outline-none px-3 ' onChange={handleSearch} value={search} />
            <div className='text-xl min-w-[50px] cursor-pointer bg-gray-900 flex items-center justify-center h-11 rounded-r-lg text-white font-bold'>
              <GrSearch />
            </div>
          </div> */}


          <div className='flex items-center gap-7'>

            <div className='relative flex justify-center'>

              {
                user?._id && (
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                    {
                      user?.profilePic ? (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full ' alt={user?.name} />
                      ) : (
                        <span className='text-white'><FaRegCircleUser /></span>
                      )
                    }
                  </div>
                )
              }


              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 font-semibold' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                        )
                      }

                    </nav>
                  </div>
                )
              }

            </div>

            {
              user?._id && (
                <Link to={"/cart"} className='text-3xl relative text-white'>
                  <span><FaShoppingCart /></span>

                  <div className='bg-amber-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm font-bold'>{context?.cartProductCount}</p>
                  </div>
                </Link>
              )
            }



            <div>
              {
                user?._id ? (
                  <button onClick={handleLogout} className=' py-1 text-xl font-bold px-4 rounded-lg  text-white bg-amber-500 hover:bg-amber-600'>Logout</button>
                )
                  : (
                    <>
                      <div>
                        <Link to={"/login"} className=' text-xl font-bold px-4 py-2 rounded-lg text-white hover:text-amber-500'>Login</Link>
                        <Link to={"/sign-up"} className=' text-xl font-bold px-4 py-2 rounded-lg text-white bg-amber-500 hover:bg-amber-600'>Signup</Link>

                      </div>

                    </>
                  )
              }

            </div>

          </div>

        </div>
      </header>
    </>
  )
}

export default Header