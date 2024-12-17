import React, { useEffect } from 'react'
import Header from './Header'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useCookie from 'react-use-cookie'
import useUserStore from '../store/useUserStore'


const Layout = () => {
  const [token] = useCookie("myToken");
  const [user] = useCookie("userProfile");
  const {setRecord} = useUserStore();
  useEffect(() => {
    setRecord(JSON.parse(user));
  },[])
 if(!token){
  return <Navigate to="/"/>
 }
 
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <Toaster   position="top-right"
  reverseOrder={false}/>
      <Outlet/>
    </div>
  )
}

export default Layout
