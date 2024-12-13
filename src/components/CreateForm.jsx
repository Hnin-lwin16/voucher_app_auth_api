import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { tailspin } from 'ldrs'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

tailspin.register()

// Default values shown

const CreateForm = () => {
  const [sendLoading,setSendLoading] = React.useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{
            errors
        }
    } = useForm();

    const handleForm = async(data) => {
      const item =  {
        product_name: data.name,
        price: data.price ,
       
      }
      setSendLoading(true);
      
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      setSendLoading(false);
      reset();
      toast.success('Successfully Product Created!')
      // const data= await res.json();
      // console.log(data)
    }
   
  return (
    <div className=' mt-5 w-[600px]'>
      <h1 className=' text-3xl font-bold'>Create New Product</h1>
      <p className=' mt-3 text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil omnis eligendi porro mollitia eos numquam ab optio, odit ipsa vitae.</p>
      <form className="flex max-w-md flex-col gap-4 mt-5" onSubmit={handleSubmit(handleForm)}>
      <div>
        
        <div className="mb-2 block">
          <Label htmlFor="name" value="New Product Name" className={`${errors.name && ( "text-red-700")}`} />
        </div>
        <TextInput  {...register("name",{ required: true, minLength: 3 })} className={`${errors.name &&  ( "focus")}`}
  id="name" type="text" placeholder="apple" />
        {errors.name && errors.name.type === "required" && (<p className=' text-red-500'>Name should be required</p>)}
        {errors.name && errors.name.type === "minLength" && (<p className=' text-red-500'>Name should be at least 3 characters</p>)}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product Price" className={`${errors.price && ( "text-red-700")}`}/>
        </div>
        <TextInput {...register("price",{ required: true,min: 100, max: 20000  })}  className={`${errors.price && ( "focus")}`} id="price" type="number" placeholder='100'/>

        {errors.price && errors.price.type === "required" && (<p className=' text-red-500'>Price should be required</p>)}
        {errors.price && errors.price.type === "min" && (<p className=' text-red-500'>Price should be 100 minimum</p>)}
        {errors.price && errors.price.type === "max" && (<p className=' text-red-500'>Name should be 20000 maximum</p>)}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" {...register("check",{ required: true })}/>
        <Label htmlFor="remember">Make Sure all field are correct</Label>
       
      </div>
      {errors.check && errors.check.type === "required" && (<p className=' text-red-500'>Check should be made</p>)}
      <div className=' flex gap-5'>
      <Button className=' w-[100px] bg-white text-black broder-2 border-cyan-700 hover:text-white'>
        <Link to='/product'>Cancel</Link>
      </Button>
      <Button type="submit" className=' flex items-center justify-center w-[100px]'>
        {sendLoading ? (<div className=' flex items-center justify-center gap-3'>
          <l-tailspin
  size="15"
  stroke="5"
  speed="0.9" 
  color="black" 
></l-tailspin>Sending...
        </div>) : "Submit"}
      </Button>
      </div>
    </form>
    </div>
  )
}

export default CreateForm
