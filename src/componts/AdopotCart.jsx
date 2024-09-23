import React from 'react'

export default function AdopotCart({img,heading,description}) {
  return (
    <div className="w-80 px-8 py-6 bg-[#E0E8E0] border-1 border-[#E0E8E0] rounded-md">
    <img className='w-8 h-8' src={img} alt="" />
    <h3 className="text-[#0E2515] text-2xl font-normal mt-2">{heading}</h3>
    <p className="text-[#8C8C8C] font-normal ">{description}</p>
  </div>
  )
}
