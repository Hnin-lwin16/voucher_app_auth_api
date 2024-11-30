import React from 'react'
import { Button, Label, Table, TextInput } from 'flowbite-react'

const ProductEmptySpace = () => {
  return (
   <>
    <Table.Row className="bg-white  dark:border-gray-700 dark:bg-gray-800 colspan-5 ">
            <Table.Cell colSpan={5} className=" text-center whitespace-nowrap  font-medium text-gray-900 dark:text-white col-span-5 w-full">
             There is not any Product
            </Table.Cell>
            
          </Table.Row>
   </>
  )
}

export default ProductEmptySpace
