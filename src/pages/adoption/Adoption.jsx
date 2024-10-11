import React from 'react'
import { Helmet } from 'react-helmet-async'

function Adoption() {
  return (
    <div>
      <Helmet>
        <title>Pet Adoption | Adoption</title>
      </Helmet>
      <img className='w-full h-1/2 md:h-screen' src="https://cdn.pixabay.com/photo/2018/08/14/15/32/coming-3605857_640.jpg" alt="" />
    </div>
  )
}

export default Adoption