import { Button, Label, Table, TextInput } from 'flowbite-react'
import React from 'react'
import { BiSearch } from 'react-icons/bi'


import {  HiPencilSquare, HiPlus,  HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import SaleListRow from './SaleListRow'


const VouncherList = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data, error, isLoading} = useSWR(import.meta.env.VITE_BASE_URL+"/vouchers", fetcher);
 (!isLoading && console.log(data))
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
     
    </Table.Head>
    <Table.Body className="divide-y">
    <Table.Row className="bg-white hidden dark:border-gray-700 dark:bg-gray-800 colspan-5 last:table-row">
        <Table.Cell colSpan={5} className=" text-center whitespace-nowrap  font-medium text-gray-900 dark:text-white col-span-5 w-full">
         There is not any Product
        </Table.Cell>
        
      </Table.Row>
    {
      isLoading ? (
        
<Table.Row  className="bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-400 dark:text-gray-600">
        <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
      <Table.Cell className="text-end">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
      <Table.Cell className="text-end">
        <div className="space-y-1">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </Table.Cell>
      <Table.Cell className="text-end">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
    </Table.Row>
    
 ):(
      data?.map((list)=> (<SaleListRow key={list.id} list={list}/>))
      )
    }
    
    </Table.Body>
  </Table>
</div>
  )
}

export default VouncherList
