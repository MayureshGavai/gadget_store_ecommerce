import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Products from '../components/Products'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
        <Navbar/>
        <Carousel/>
      <Products/>
    </div>
  )
}

export default HomePage