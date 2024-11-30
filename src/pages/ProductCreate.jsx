import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CreateForm from '../components/CreateForm'

const ProductCreate = () => {
  const bread = [
    {
      name:"Product Module",
      route:"/product"
    }
  ]
  return (
    <section>
      <Container>
      <BreadCrumb currentstate={"Product Create Module"} link={bread}/>
      <CreateForm/>
      </Container>
    </section>
  )
}

export default ProductCreate
