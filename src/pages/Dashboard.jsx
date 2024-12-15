import React from 'react'
import Container from '../components/Container'
import Module from '../components/Module'
import { HiCircleStack, HiComputerDesktop, HiDocumentDuplicate } from 'react-icons/hi2'
import { Button } from 'flowbite-react'
import Logout from '../components/Logout'
import useCookie from 'react-use-cookie'

const Dashboard = () => {
  
  return (
    <section>
      <Container>
        <div className='grid gap-5 md:grid-cols-3 grid-cols-1'>
          <div className=' col-span-1'>
            <Module icon={<HiCircleStack className='size-14 text-gray-50'/>} name={"Product Module"} url={"product"}/>
          </div>
          <div className=' col-span-1'>
          <Module icon={<HiComputerDesktop className='size-14 text-gray-50'/>} name={"Sale Module"} url={"/sale"}/>
          </div>
          <div className=' col-span-1'>
          <Module icon={<HiDocumentDuplicate className='size-14 text-gray-50'/>} name={"Vouncher Module"} url={"/vouncher"}/>
          </div>
        </div>
        <Logout/>
      </Container>
    </section>
  )
}

export default Dashboard
