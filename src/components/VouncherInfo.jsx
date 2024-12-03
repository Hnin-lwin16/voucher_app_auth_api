import React, { useState } from 'react'
import { Button, Checkbox, Datepicker, Label, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form';
import SaleForm from './SaleForm';
import useRecordStore from '../store/useRecordStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const VouncherInfo = () => {
    const{
        register,
        handleSubmit,
        reset,
        formState:{
            errors
        }
    } = useForm();
    const {records,resetRecord} = useRecordStore();
    const [sendLoading,setSendLoading] = useState(false);

    const handleForm = async (sale) => {
      setSendLoading(true);
       const total = records.reduce((total,record)=>total+record.cost,0);
      const taxi = total * 0.07;
      const netTotal = total+taxi;
      const created_at = new Date();
      
      const {data} = await axios.post(import.meta.env.VITE_BASE_URL+"/vouchers", {...sale,records,total,taxi,netTotal,created_at},{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      setSendLoading(false);

      toast.success('Successfully Voucher Created!')
        // const data= await res.json();
        // console.log({...sale,records,total,taxi,netTotal})
        reset();
      resetRecord();
      }

       // Function to generate a random alphanumeric string
  const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  const generateVoucherId = () => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
    const randomString = generateRandomString(6); // Adjust the length as needed
    const voucher = `${formattedDate}-${randomString}`;
    return voucher;
  };


  return (
    <div>
         <form className=" my-5" onSubmit={handleSubmit(handleForm)} id='form'>
     <div className=' grid grid-cols-1 md:grid-cols-4 gap-5'>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Voucher Id" className={`${errors.voucherId && ( "text-red-700")}`} />
        </div>
        <TextInput defaultValue={generateVoucherId()}  {...register("voucherId",{ required: true, minLength: 3 })} color={`${errors.voucherId &&  ( "failure")}`}
   type="text" placeholder="20241120-I2IYMC" />
        {errors.voucherId && errors.voucherId.type === "required" && (<p className=' text-red-500 text-sm'>Voucher Id should be required</p>)}
        {errors.voucherId && errors.voucherId.type === "minLength" && (<p className=' text-red-500 text-sm'>Voucher Id should be at least 3 characters</p>)}
        </div>
        </div>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Customer Name" className={`${errors.customer && ( "text-red-700")}`} />
        </div>
        <TextInput  {...register("customer",{ required: true, minLength: 3 })} color={`${errors.customer &&  ( "failure")}`}
   type="text" placeholder="Sai" />
        {errors.customer && errors.customer.type === "required" && (<p className=' text-red-500 text-sm'>Customer Name should be required</p>)}
        {errors.customer && errors.customer.type === "minLength" && (<p className=' text-red-500 text-sm'>Customer Name should be at least 3 characters</p>)}
        </div>
        </div>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Customer Email" className={`${errors.email && ( "text-red-700")}`} />
        </div>
        <TextInput  {...register("email",{ required: true, minLength: 3 })} color={`${errors.email &&  ( "failure")}`}
   type="text" />
        {errors.email && errors.email.type === "required" && (<p className=' text-red-500 text-sm'>Customer Email should be required</p>)}
        {errors.email && errors.email.type === "minLength" && (<p className=' text-red-500 text-sm'>Customer Email should be at least 3 characters</p>)}
        </div>
        </div>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Sale Date" className={`${errors.date && ( "text-red-700")}`} />
        </div>
        <input defaultValue={new Date().toISOString().split('T')[0]} type='date' {...register("date",{ required: true})}  className={`${errors.date && ( " border-red-700")} border-2 rounded-lg w-full`} />
       
        {errors.date && errors.date.type === "required" && (<p className=' text-red-500 text-sm'>Date should be required</p>)}
        </div>
        </div>
        
     </div>
     </form>
     <SaleForm/>
    <div className=' flex gap-5 justify-end'>
    <div className="flex items-center gap-2">
        <Checkbox form='form' id="remember" {...register("check",{ required: true })}/>
        <Label htmlFor="remember">Make Sure all field are correct</Label>
       
      </div>
     <Button form='form' outline type="submit" className=' flex items-center justify-center w-[150px]'>
        {sendLoading ? (<div className=' flex items-center justify-center gap-3'>
          <l-tailspin
  size="15"
  stroke="5"
  speed="0.9" 
  color="black" 
></l-tailspin>Sending...
        </div>) : "Confirm Voucher"}
      </Button>
    </div>
    </div>
  )
}

export default VouncherInfo
