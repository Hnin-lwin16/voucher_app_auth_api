import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import useCookie from 'react-use-cookie';
import { HiPencil } from 'react-icons/hi2';
import { Link } from 'react-router-dom';


const UserProfile = () => {
    const [user] = useCookie("userProfile");
    const {name,email,profile_image} = JSON.parse(user);
  return (
    
  <section>
      <Container>
      <BreadCrumb currentstate={"User Profile"}/>
      <div className="space-y-4 border-2  mt-5 p-5 inline-block">
  <div className="flex space-x-4">
  <div className=' relative'>
  <img src={profile_image ? (profile_image): ("../profile.webp")} className=' size-28 ' alt="" />
  <div className='bg-blue-700 absolute top-[-10px] end-[-10px]  rounded-full inline-block p-1'>
     <Link to="userChangePhoto"><HiPencil className=' text-white '/></Link>
      </div>
  </div>
    <div>
    <p className="font-semibold text-2xl text-gray-900 dark:text-white">Your Name</p>
     <div className=' flex gap-1 items-center'>
     <h2 className="flex items-center   leading-none text-gray-900 dark:text-white sm:text-2xl">{name}</h2>
      <div className='bg-blue-700  rounded-full inline-block p-1'>
     <Link to="userChangeName"><HiPencil className=' text-white '/></Link>
      </div>
     </div>
    </div>
  </div>
  <dl>
    <dt className="font-semibold text-2xl text-gray-900 dark:text-white">Email Address</dt>
    <dd className="text-gray-500 dark:text-gray-400">{email}</dd>
  </dl>
  
  
  <Link to="userChangePassword" type="button" data-modal-target="accountInformationModal2" data-modal-toggle="accountInformationModal2" className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">
  <svg className="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
</svg>
       

        Change Password
</Link>
 
</div>
    </Container>
  </section>
  )
}

export default UserProfile
