import React, { useState } from 'react'
import { Button, Checkbox, Datepicker, Label, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form';
import SaleForm from './SaleForm';
import useRecordStore from '../store/useRecordStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    console.log(records.product)
    const handleForm = async (sale) => {
      setSendLoading(true);
       const total = records.reduce((total,record)=>total+record.cost,0);
      const tax = total * 0.07;
      const net_total = total+tax;
      const created_at = new Date();
      // const voucher_id = records.product.id;
      console.log({...sale,records,total,tax,net_total})
      const {data} = await axios.post(import.meta.env.VITE_BASE_URL+"/vouchers", {...sale,records,total,tax,net_total},{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // const res= await data.json();
      //   console.log(res)
      // setSendLoading(false);

      toast.success('Successfully Voucher Created!')
        
      //   // console.log({...sale,records,total,taxi,netTotal})
      //   reset();
      // resetRecord();
    
    //  console.log(JSON.stringify(res));
    
     if(sale.redirect){
      navigate("/vouncher/voucherDetail/"+res.id)
      }
      
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
    <div className=' grid grid-cols-4 gap-5 mt-5'>
      <div className="col-span-3">
      <SaleForm />
      </div>
         <form className=" col-span-1 flex flex-col h-full" onSubmit={handleSubmit(handleForm)} id='form'>
     <div className=' grid grid-cols-1 md:grid-cols-1 gap-3'>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Voucher Id" className={`${errors.voucher_id && ( "text-red-700")}`} />
        </div>
        <TextInput defaultValue={generateVoucherId()}  {...register("voucher_id",{ required: true, minLength: 3 })} color={`${errors.voucher_id &&  ( "failure")}`}
   type="text" placeholder="20241120-I2IYMC" />
        {errors.voucher_id && errors.voucher_id.type === "required" && (<p className=' text-red-500 text-sm'>Voucher Id should be required</p>)}
        {errors.voucher_id && errors.voucher_id.type === "minLength" && (<p className=' text-red-500 text-sm'>Voucher Id should be at least 3 characters</p>)}
        </div>
        </div>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Customer Name" className={`${errors.customer_name && ( "text-red-700")}`} />
        </div>
        <TextInput  {...register("customer_name",{ required: true, minLength: 3 })} color={`${errors.customer_name &&  ( "failure")}`}
   type="text" placeholder="Sai" />
        {errors.customer_name && errors.customer_name.type === "required" && (<p className=' text-red-500 text-sm'>Customer Name should be required</p>)}
        {errors.customer_name && errors.customer_name.type === "minLength" && (<p className=' text-red-500 text-sm'>Customer Name should be at least 3 characters</p>)}
        </div>
        </div>
        <div className=' grid-cols-1'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Customer Email" className={`${errors.customer_email && ( "text-red-700")}`} />
        </div>
        <TextInput  {...register("customer_email",{ required: true, minLength: 3 })} color={`${errors.customer_email &&  ( "failure")}`}
   type="text" />
        {errors.customer_email && errors.customer_email.type === "required" && (<p className=' text-red-500 text-sm'>Customer Email should be required</p>)}
        {errors.customer_email && errors.customer_email.type === "minLength" && (<p className=' text-red-500 text-sm'>Customer Email should be at least 3 characters</p>)}
        </div>
        </div>
        <div className=' grid-cols-1 mb-3'>
        <div>
        
        <div className="mb-2 block">
          <Label  value="Sale Date" className={`${errors.sale_date && ( "text-red-700")}`} />
        </div>
        <input defaultValue={new Date().toISOString().slice(0, 10)} type='date' {...register("sale_date",{ required: true})}  className={`${errors.sale_date && ( " border-red-700")} border-2 rounded-lg w-full`} />
       
        {errors.sale_date && errors.sale_date.type === "required" && (<p className=' text-red-500 text-sm'>Date should be required</p>)}
        </div>
        </div>
        
     </div>
     <div className='flex flex-col gap-3 items-center mt-auto'>
    <div className="flex items-center gap-2">
        <Checkbox form='form' id="remember" {...register("check",{ required: true })}/>
        <Label htmlFor="remember">Make Sure all field are correct</Label>
       
      </div>
      <div className="flex items-center gap-2">
        <Checkbox form='form'  {...register("redirect")}/>
        <Label >Redirect to voucher Detail</Label>
       
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
     </form>
    
   
    </div>
  )
}

export default VouncherInfo
