import { Button, Label, Table, TextInput } from 'flowbite-react'
import React from 'react'
import { BiSearch } from 'react-icons/bi'


import {  HiPencilSquare, HiPlus,  HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'


const VouncherList = () => {
  return (
    <div className='mt-5'>
    <div className=' flex justify-between items-center mb-3'>
    <div className="max-w-md">
 
  <TextInput id="email4" type="text" icon={BiSearch}   placeholder="Search Vouncher" required />
   
  
</div>
<div className=' bg-blue-600 rounded-lg px-5 text-white '>
    <Link to="/sale" className=' flex p-3 rounded-lg justify-center items-center'>
    Sale
    <HiPlus/>
    </Link>
</div>
    </div>
    <Table striped>
    <Table.Head>
    <Table.HeadCell>#</Table.HeadCell>
      <Table.HeadCell>Customer name</Table.HeadCell>
      <Table.HeadCell className=' text-end'>Email</Table.HeadCell>
      <Table.HeadCell className=' text-end'>Created At</Table.HeadCell>
      <Table.HeadCell className=' text-end'>Action</Table.HeadCell>
      <Table.HeadCell>
        <span className="sr-only">Edit</span>
      </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
    <Table.Row className="bg-white hidden dark:border-gray-700 dark:bg-gray-800 colspan-5 last:table-row">
        <Table.Cell colSpan={5} className=" text-center whitespace-nowrap  font-medium text-gray-900 dark:text-white col-span-5 w-full">
         There is not any Product
        </Table.Cell>
        
      </Table.Row>
      
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
         1
        </Table.Cell>
        <Table.Cell>Sai</Table.Cell>
        <Table.Cell className=' text-end'>sai@gmail.com</Table.Cell>
        <Table.Cell className=' text-end'>
            <p>23.12.22</p>
            <p>2:00PM</p>
        </Table.Cell>
        <Table.Cell className=' text-end'>
        <Button.Group>
  <Button color="gray">{<HiPencilSquare className=' text-gray-700'/>}</Button>
  <Button color="gray"> {<HiTrash className='text-red-600'/>}</Button>
  
</Button.Group>
          
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</div>
  )
}

export default VouncherList
