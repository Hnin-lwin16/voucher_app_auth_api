import { Button } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useCookie, { removeCookie } from 'react-use-cookie'

const Logout = () => {
    // const [removeToken] = useCookie("myToken");
    const navigate = useNavigate();
    const handleLogout = () => {
       removeCookie("myToken")
        console.log("start")
        navigate("/");
    }
  return (
    <div className=' flex justify-center items-center gap-3 mt-5'>
    <p>Are you sure to log out !</p>
    <Button onClick={handleLogout} outline gradientDuoTone="cyanToBlue">
  Log Out
</Button>
  </div>
  )
}

export default Logout
