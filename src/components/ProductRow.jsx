import React, { useState } from 'react'
import { Button, Label, Table, TextInput } from 'flowbite-react'
import {  HiPencilSquare, HiPlus,  HiTrash } from 'react-icons/hi2'
import { useSWRConfig } from 'swr'
import { bouncy } from 'ldrs'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ShowDateTime from './ShowDateTime'



// Default values shown


const ProductRow = ({product:{
    id,name,price,created_at
}}) => {
    bouncy.register()
    const {mutate} = useSWRConfig();
    const created = new Date(created_at);
    const [deleteLoading,setDeleteLoading] = useState(false);
    const date = created.toLocaleDateString('de-DE',{
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    });
    const time = created.toLocaleTimeString('de-DE',{
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    
    const handleDelete = async() => {
        setDeleteLoading(true);
        const data = await fetch(import.meta.env.VITE_BASE_URL+`/products/${id}`, {
            method: 'DELETE',
        })
        setDeleteLoading(false);
       mutate(import.meta.env.VITE_BASE_URL+"/products");
       toast.success('Successfully Product Deleted!')
    }
  return (
    <>
   
         
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
             {id}
            </Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell className=' text-end'>{price}</Table.Cell>
            <ShowDateTime created_at={created_at}/>
            <Table.Cell className=' text-end'>
            <Button.Group>
      <Button color="gray" className='flex items-center justify-center w-10' >
      <Link to={`/product/${id}`}>
        {<HiPencilSquare className=' text-gray-700'/>}
        </Link>
      </Button>
      <Button color="gray" className=' flex items-center justify-center w-10' onClick={handleDelete}> 
        {
            deleteLoading ? (<l-bouncy
                size="15"
                speed="1.75" 
                color="black" 
              ></l-bouncy>):(<HiTrash className='text-red-600'/>)
        }
      
        </Button>
      
    </Button.Group>
              
            </Table.Cell>
          </Table.Row>
    </>
  )
}

export default ProductRow
