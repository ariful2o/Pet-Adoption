import React from 'react'
import image from "../../../assets/cat & dog/Image.png"
import AdopotCart from '../../../componts/AdopotCart'
import catfoet from "../../../assets/icons/Frame (1).svg"
import contacticon from "../../../assets/icons/Frame (2).svg"
import paperwoork from "../../../assets/icons/Frame (3).svg"
import takeHome from "../../../assets/icons/Frame (4).svg"


export default function HowAdopat() {
  return (
    <section className='flex flex-col lg:flex-row gap-8 bg-base-200 min-h-screen py-20'>
      <div className="w-1/2 lg:w-full">
        <div className="p-6">
        <h2 className="text-6xl font-medium text-[#0E2515] leading-[80px]">How to Adopt Your New Friend</h2>
        <p className="py-6 text-lg font-normal text-[#8C8C8C]">Ready to bring home your new best friend? Explore, meet, adopt, and start your journey of love and joy today!</p>
        </div>
        <div className="grid grid-cols-2 gap-12 p-4">
          <AdopotCart img={catfoet} heading="Find Your Match" description="Explore our website and find the perfect pet that steals your heart."></AdopotCart>
          <AdopotCart img={contacticon} heading="Contact and Meet" description="Contact the shelter to meet the pet and see if it's a match."></AdopotCart>
          <AdopotCart img={paperwoork} heading="Complete Paperwork" description="Complete the application and fee to finalize adoption."></AdopotCart>
          <AdopotCart img={takeHome} heading="Take Them Home" description="Bring your new furry friend home and start making memories together!"></AdopotCart>
        </div>
      </div>
      <div className="w-1/2 lg:w-full">
        <img src={image} alt="" />
      </div>
    </section>
  )
}
