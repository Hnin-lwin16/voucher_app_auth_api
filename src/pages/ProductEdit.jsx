import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import EditForm from '../components/EditForm'

const ProductEdit = () => {
    const bread = [
        {
          name:"Product Module",
          route:"/product"
        }
      ]
  return (
    <section>
        <Container>
      <BreadCrumb currentstate={"Product Edit Module"} link={bread}/>
    <EditForm/>
      </Container>
    </section>
  )
}

export default ProductEdit
