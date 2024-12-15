import { Breadcrumb } from 'flowbite-react'
import React from 'react'
import { HiMiniHome } from 'react-icons/hi2'

const BreadCrumb = ({currentstate,link}) => {
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="/dashboard">
      {<HiMiniHome/>}
        Home
      </Breadcrumb.Item>
      
    {link &&  (link.map(el=>(
      <Breadcrumb.Item href={el.route} key={el}>{el.name}</Breadcrumb.Item>
    )))}
     
      <Breadcrumb.Item >{currentstate}</Breadcrumb.Item>
     
    </Breadcrumb>
  )
}

export default BreadCrumb
BreadCrumb