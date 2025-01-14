import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductList from '../components/ProductList'
import ProductRow from '../components/ProductRow'
import Pagination from '../components/Pagination'


const Product = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentstate={"Product Module"}/>
        <ProductList/>
      
      </Container>
    </section>
  )
}

export default Product
