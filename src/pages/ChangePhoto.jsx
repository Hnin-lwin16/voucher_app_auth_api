import React, { useRef } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useCookie from "react-use-cookie";
import toast from "react-hot-toast";
import { use } from "react";
import useUserStore from "../store/useUserStore";
import { HiCamera } from "react-icons/hi2";
const ChangePhoto = () => {
  const [token] = useCookie("myToken");
  const [user, setUser] = useCookie("userProfile");
  const { records, setRecord } = useUserStore();
  const { name, email, profile_image } = JSON.parse(user);
  const fileInput = useRef(null);
  const handelUpload = () => {
    fileInput.current.click();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(event.target.files[0]);
    formData.append("profile_image", event.target.files[0]);
    console.log(formData);

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user-profile/change-profile-image`,
      {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/json',
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const json = await res.json();
    if (res.status == 200) {
      toast.success("Successfully Updated!");
      setUser(JSON.stringify(json.user));
      setRecord(json.user);
    } else {
      toast.error(json.message);
    }
  };
  return (
    <section>
      <Container>
        <BreadCrumb
          link={[{ name: "User Profile", route: "/dashboard/userProfile" }]}
          currentstate={"Change Photo Module"}
        />

        <div className=" border-2 mt-5 p-5 inline-block relative">
          <img
            src={profile_image ? profile_image : "../profile.webp"}
            className=" size-28 "
            alt=""
          />
          <HiCamera
            onClick={handelUpload}
            className=" absolute bottom-14 start-14 size-10"
          />
        </div>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Change Your Photo" />
          </div>
          <FileInput
            ref={fileInput}
            className=" hidden"
            onChange={handleSubmit}
            id="file-upload"
          />
        </div>
      </Container>
    </section>
  );
};

export default ChangePhoto;
