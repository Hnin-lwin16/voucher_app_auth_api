import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import VouncherInfo from '../components/VouncherInfo'

const Sale = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentstate={"Sale Module"}/>
        <VouncherInfo/>
      </Container>
    </section>
  )
}

export default Sale
