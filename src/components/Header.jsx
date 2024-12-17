
import React from 'react'
import Container from './Container'
import useCookie from 'react-use-cookie';
import useUserStore from '../store/useUserStore';

const Header = () => {
  const [user] = useCookie("userProfile");

  const {name,email,profile_image} = JSON.parse(user);
  const {records} = useUserStore(); 
  // console.log(records)
  return (
    <header className="mb-5">
      
        
       <Container>
      <div className=' flex justify-between items-center'>
      <div>
      <h1 className=' text-3xl font-bold'>Vouncher App</h1>
      <p className=' text-stone-500'>MMS Software</p>
      </div>
      <div className=' flex items-center gap-5'>
        <img src={records.profile_image ? (records.profile_image): ("../profile.webp")} className=' size-10 rounded-full' alt="" />
        <div className=' text-center'>
          <p>{records.name}</p>
          <p>{records.email}</p>
        </div>
      </div>
      </div>
       </Container>
    </header>
  )
}

export default Header
