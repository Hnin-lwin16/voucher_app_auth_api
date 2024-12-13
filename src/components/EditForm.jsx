import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { tailspin } from 'ldrs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import useSWR from 'swr'

tailspin.register()

const EditForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(import.meta.env.VITE_BASE_URL+"/products/"+id, fetcher);
   
    const [sendLoading,setSendLoading] = React.useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{
            errors
        }
    } = useForm();

    const handleForm = async(result) => {
        console.log(result)
      const item =  {
        product_name: result.product_name,
        price: result.price ,
        
      }
      setSendLoading(true);
      
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      setSendLoading(false);
      if(result.back){
       navigate("/product")
      }
      toast.success('Successfully Product Updated!')
     
    }
   
  return (
    <div className=' mt-5 w-[600px]'>
      <h1 className=' text-3xl font-bold'>Edit Product</h1>
      <p className=' mt-3 text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil omnis eligendi porro mollitia eos numquam ab optio, odit ipsa vitae.</p>
     {isLoading ? ( 
 <div className="flex max-w-md flex-col gap-4 mt-5">
  {/* Skeleton for Product Name */}
  <div>
    <div className="mb-2 block">
      <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>
    </div>
    <div className="h-10 w-full bg-gray-300 animate-pulse rounded"></div>
  </div>

  {/* Skeleton for Product Price */}
  <div>
    <div className="mb-2 block">
      <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>
    </div>
    <div className="h-10 w-full bg-gray-300 animate-pulse rounded"></div>
  </div>

  {/* Skeleton for Checkbox 1 */}
  <div className="flex items-center gap-2">
    <div className="h-5 w-5 bg-gray-300 animate-pulse rounded"></div>
    <div className="h-4 w-64 bg-gray-300 animate-pulse rounded"></div>
  </div>

  {/* Skeleton for Checkbox 2 */}
  <div className="flex items-center gap-2">
    <div className="h-5 w-5 bg-gray-300 animate-pulse rounded"></div>
    <div className="h-4 w-64 bg-gray-300 animate-pulse rounded"></div>
  </div>

  {/* Skeleton for Buttons */}
  <div className="flex gap-5">
    <div className="h-10 w-[150px] bg-gray-300 animate-pulse rounded"></div>
    <div className="h-10 w-[150px] bg-gray-300 animate-pulse rounded"></div>
  </div>
</div>):( 
    <form className="flex max-w-md flex-col gap-4 mt-5" onSubmit={handleSubmit(handleForm)}>
      <div>
        
        <div className="mb-2 block">
          <Label htmlFor="name" value="Product Name" />
        </div>
        <TextInput defaultValue={data.data.product_name}  {...register("product_name",{ required: true, minLength: 3 })} className={`${errors.product_name && errors.product_name.type === "required" && ( "focus")} ${errors.name && errors.name.type === "minLength" && ( "focus")}`}
  id="name" type="text" placeholder="apple" />
        {errors.product_name && errors.product_name.type === "required" && (<p className=' text-red-500'>Name should be required</p>)}
        {errors.product_name && errors.product_name.type === "minLength" && (<p className=' text-red-500'>Name should be at least 3 characters</p>)}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product Price" />
        </div>
        <TextInput {...register("price",{ required: true,min: 100, max: 20000  })} defaultValue={data.data.price}  className={`${errors.price && errors.price.type === "required" && ( "focus")} ${errors.price && errors.price.type === "min" && ( "focus")} ${errors.price && errors.price.type === "max" && ( "focus")}`} id="price" type="number" placeholder='100'/>

        {errors.price && errors.price.type === "required" && (<p className=' text-red-500'>Price should be required</p>)}
        {errors.price && errors.price.type === "min" && (<p className=' text-red-500'>Price should be 100 minimum</p>)}
        {errors.price && errors.price.type === "max" && (<p className=' text-red-500'>Name should be 20000 maximum</p>)}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" {...register("check",{ required: true })}/>
        <Label htmlFor="remember">Make Sure all field are correct</Label>
       
      </div>
      {errors.check && errors.check.type === "required" && (<p className=' text-red-500'>Check should be made</p>)}
      <div className="flex items-center gap-2">
        <Checkbox id="back" {...register("back")}/>
        <Label htmlFor="back">Back to Product List after saving</Label>
       
      </div>
      
      <div className=' flex gap-5'>
      <Button className=' w-[150px] bg-white text-black broder-2 border-cyan-700 hover:text-white'>
        <Link to='/product'>Cancel</Link>
      </Button>
      <Button type="submit" className=' flex items-center justify-center w-[150px]'>
        {sendLoading ? (<div className=' flex items-center justify-center gap-3'>
          <l-tailspin
  size="15"
  stroke="5"
  speed="0.9" 
  color="black" 
></l-tailspin>Sending...
        </div>) : "Update Product"}
      </Button>
      </div>
    </form>)}
     
  


    </div>
  )
}

export default EditForm
