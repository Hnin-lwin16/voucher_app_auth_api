import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


const Layout = () => {
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
