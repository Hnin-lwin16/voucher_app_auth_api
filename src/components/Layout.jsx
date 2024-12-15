import React from 'react'
import Header from './Header'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useCookie from 'react-use-cookie'


const Layout = () => {
  const [token] = useCookie("myToken");
 
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
