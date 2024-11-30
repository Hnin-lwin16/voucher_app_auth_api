import React from 'react'
import { Link } from 'react-router-dom'

const Module = ({icon,name,url}) => {
  return (
    
      <div className=' bg-blue-600 p-5 rounded-lg'>
        <Link to={url} className='flex flex-col items-center gap-2'>
      {icon}
      {name}
      </Link>
      </div>
    
  )
}

export default Module
