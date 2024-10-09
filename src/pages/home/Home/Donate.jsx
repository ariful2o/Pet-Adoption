import React from 'react'
import pet from '../../../../src/assets/icons/Frame (1).svg'
import donate from '../../../../src/assets/icons/Frame (5).svg'
import pledge from '../../../../src/assets/icons/Frame (6).svg'
import DonateCart from '../../../componts/DonateCart'

export default function Donate() {
  return (
    <div className='bg-base-200 text-center py-8 lg:py-20'>
      <h2 className="text-3xl lg:text-4xl font-semibold lg:font-bold text-[#0E2515]">Donate and Save Lives</h2>
      <p className="text-lg text-[#8C8C8C] max-w-3xl mx-auto py-4">Your donation can make a life-saving difference. Join us in our mission to rescue, care for, and rehome pets in need rescue, care for, and rehome pets in need by contributing today..</p>
      <div className="flex flex-col lg:flex-row justify-around gap-6 px-10">
        <DonateCart img={donate} title="One-Time Donation" description="Make a single donation to support our ongoing efforts in rescuing and caring for pets in need."></DonateCart>
        <DonateCart img={pledge} title="Monthly Pledge" description="Become a monthly donor and provide consistent support to help us save more lives every month."></DonateCart>
        <DonateCart img={pet} title="Sponsor a Pet" description="Sponsor a pet in our care and directly contribute to their needs until they find their forever home."></DonateCart>
      </div>
    </div>
  )
}
