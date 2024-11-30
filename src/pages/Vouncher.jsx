
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import React from 'react'
import VouncherList from '../components/VouncherList'

const Vouncher = () => {
  return (
    <section>
    <Container>
     <BreadCrumb currentstate={"Vouncher Module"}/>
     <VouncherList/>
    </Container>
    </section>
  )
}

export default Vouncher
