import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useCookie from "react-use-cookie";
import toast from "react-hot-toast";
import { use } from "react";
import useUserStore from "../store/useUserStore";
import js from "@eslint/js";

const ChangeName = () => {
  const {register,handleSubmit} = useForm();
  const [token] = useCookie("myToken");
  const [user,setUser] = useCookie("userProfile");
  const {records,setRecord} = useUserStore();
  const {name,email,profile_image} = JSON.parse(user);
  console.log(user);
    const onSubmit = async(data) => {
      
console.log(data.name)
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user-profile/change-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    const json = await res.json();
    if(res.status == 200){
      toast.success('Successfully Updated!');
     setUser(JSON.stringify(json.user));
      setRecord(json.user);
    }else{
      toast.error(json.message);
    }
  }
  return (
    <section>
      <Container>
        <BreadCrumb
          link={[{ name: "User Profile", route: "/dashboard/userProfile" }]}
          currentstate={"Change Name Module"}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 mt-5 border-2 p-5">
          <div className="">
          
            <div className="mb-2 block">
              <Label htmlFor="name" value="Change Your Name" />
            </div>
            <div className="flex items-center gap-4">
            <TextInput {...register("name")}
              id="name"
              type="text"
              placeholder="Your Name"
              required
              shadow
            />
            <Button type="submit">Update Your Name</Button>
          </div>

          
          </div>
        </form>
      </Container>
    </section>
  );
};

export default ChangeName;
