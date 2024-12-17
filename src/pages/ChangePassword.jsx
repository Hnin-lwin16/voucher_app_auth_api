import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'

const ChangePassword = () => {
  return (
    <section>
        <Container>
            <BreadCrumb link={[{name:"User Profile",route:"/dashboard/userProfile"}]} currentstate={"Change Password Module"}/>
        </Container>
    </section>
  )
}

export default ChangePassword
