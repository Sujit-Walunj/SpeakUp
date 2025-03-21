import React from 'react'
import IconBtn from '../common/IconBtn'
import { RiEditBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { formattedDate } from "../../../Util/dateFormatter"

import { BiSolidUser } from "react-icons/bi";


const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.profile)

  return (
    <div className='bg-richblack-900  mx-0 md:mx-5' >
      <h1 className='font-medium text-richblack-5 text-3xl mb-7 md:mb-14' >My Profile</h1>

      <div className='flex items-center justify-between rounded-md border border-richblack-700 bg-blue-100 p-8 px-3 md:px-12 my-1'>
        <div className='flex flex-row gap-x-2 md:gap-x-4 items-center' >
          <div>
          <BiSolidUser />
          </div>

          <div className='space-y-1'>
            <h2 className='text-lg font-semibold' >{user?.firstname} {user?.lastname}</h2>
            <h2 className='text-lg font-semibold' >{user?.username}</h2>
            <p className='text-sm text-richblack-300'>{user?.email}</p>
          </div>
        </div>

        <IconBtn customClasses={"hidden md:block"} text={'Edit'} onClickHandler={() => navigate('/dashboard/settings')} children={<RiEditBoxLine />} />
      </div>

      <div className='md:hidden  '>
        <IconBtn
          text={'Edit Profile'}
          onClickHandler={() => navigate('/dashboard/settings')}
          customClasses="w-full my-5 !py-1 text-center grid place-items-center"
          children={<RiEditBoxLine />} />
      </div>

     

      <div className='flex flex-col gap-y-5 md:gap-y-10 rounded-md border p-8 px-3 md:px-12 
      bg-blue-50 '>
        <div className='flex items-center justify-between w-full' >
          <h2 className='text-lg font-semibold' >Personal Details</h2>
          <IconBtn text={'Edit'} customClasses="hidden md:block" onClickHandler={() => navigate('/dashboard/settings')} children={<RiEditBoxLine />} />
        </div>

        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>First Name</p>
            <p className='text-sm  font-medium' >{user?.firstname}</p>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm '>Last Name</p>
            <p className='text-sm font-medium' >{user?.lastname}</p>
          </div>
        </div>


        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm '>Email</p>
            <p className='text-sm font-medium' >{user?.email}</p>
          </div>

        </div>


      
      </div>

    </div>
  )
}

export default MyProfile