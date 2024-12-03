import React, { useState } from 'react'
import { Button, Label, Table, TextInput } from 'flowbite-react'
import {  HiPencilSquare, HiPlus,  HiTrash } from 'react-icons/hi2'
import ShowDateTime from './ShowDateTime'
import { useSWRConfig } from 'swr'
import { bouncy } from 'ldrs'
import toast from 'react-hot-toast'
import axios from 'axios'
import { list } from 'postcss'
bouncy.register()
const SaleListRow = ({list:{
   voucherId,
   id,
    customer,
    date,
    email,
    created_at
}}) => {
   
   
    const {mutate} = useSWRConfig();
    const [deleteLoading,setDeleteLoading] = useState(false);
    // console.log(voucherId)
  const handleSaleDelete = async ()=>{

    await fetch(import.meta.env.VITE_BASE_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });
    toast.success("Voucher deleted successfully");
    mutate(import.meta.env.VITE_BASE_URL + `/vouchers`);
  
  console.log(`http://localhost:5000/vouchers/${id}`)
  // console.log(import.meta.env.VITE_BASE_URL+`/vouchers/${id}`)

  }
  return (

    <>
    
      
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        1
        </Table.Cell>
        <Table.Cell>{customer}</Table.Cell>
        <Table.Cell className=' text-end'>{email}</Table.Cell>
       <ShowDateTime created_at={created_at}/>
        <Table.Cell className=' text-end'>
      
 
        <Button color="gray" className=' flex items-center justify-center w-10' onClick={handleSaleDelete}> 
        {
            deleteLoading ? (<l-bouncy
                size="15"
                speed="1.75" 
                color="black" 
              ></l-bouncy>):(<HiTrash className='text-red-600'/>)
        }
      
        </Button>
  

          
        </Table.Cell>
      </Table.Row>
    </>
   
  )
}

export default SaleListRow
