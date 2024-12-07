import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import VoucherCard from '../components/VoucherCard'

const VoucherDetail = () => {
  return (
    <section>
    <Container>
      <BreadCrumb link={[{name:"Vouncher Module",route:"/vouncher"}]} currentstate={"VoucherDetail Module"}/>
     
     <VoucherCard/>
    </Container>
  </section>
  )
}

export default VoucherDetail
