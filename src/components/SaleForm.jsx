import React from 'react'
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import VouncherTable from './VouncherTable';
import useRecordStore from '../store/useRecordStore';

const SaleForm = () => {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const{isLoading,data,error} = useSWR('http://localhost:5000/products',fetcher);
    const{
        register,
        handleSubmit,
        reset,
        formState:{
            errors
        }
    } = useForm();
    const [sendLoading,setSendLoading] = React.useState(false);
    const {addRecord,records,changeQuantity} = useRecordStore();
    const onSubmit = (data) => {
      const currentProduct = JSON.parse(data.product);
      const currentProductId = currentProduct.id;
      const isExisted = records.find(({product:{id}}) => id === currentProductId);

      if(isExisted){
        changeQuantity(isExisted.id,data.quantity);
        reset();
      }else{
        const item = {
          id: Date.now(),
          product: currentProduct,
         
         quantity : data.quantity,
         cost: currentProduct.price * data.quantity,
          
        }
        addRecord(item);
        reset();
      }
     
        
        // const data= await res.json();
        // console.log(item)
        
      }
  return (
    <div className=" bg-white p-5 rounded-lg border">
      <form action="#" id="recordForm" onSubmit={handleSubmit(onSubmit)} className=' mb-5'>
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2">
            <label
              htmlFor="productSelect"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Your Product
            </label>
            <select
              id="productSelect"
              {...register("product")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select a product</option>
              {!isLoading &&
                data.map((product) => (
                  <option key={product.id}  value={JSON.stringify(product)}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="quantityInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantityInput"
              {...register("quantity")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="text-blue-700 w-full h-full flex justify-center items-center hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
      <VouncherTable/>
    </div>
  )
}

export default SaleForm
