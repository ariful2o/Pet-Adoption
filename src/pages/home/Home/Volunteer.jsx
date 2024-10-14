
import img1 from '../../../assets/cat & dog/Image (1).png'
import img2 from '../../../assets/cat & dog/Image (2).png'
import img3 from '../../../assets/cat & dog/Image (3).png'
export default function Volunteer() {
  return (
    <section className='py-4 lg:py-20 bg-base-200'>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center px-4 lg:px-10 ">
        <h2 className="text-[#0E2515] font-normal text-3xl lg:text-4xl min-w-96">Volunteer Spotlight</h2>
        <p className="text-[#8C8C8C] ">Explore the inspiring stories of our volunteers, highlighting their heartfelt experiences and the impact of their dedication. Join us in celebrating their commitment to making a difference in the lives of pets in need.</p>
      </div>
      <div className="flex flex-col lg:flex-row-reverse p-4 lg:p-10 gap-6 justify-center">
        <img className='h-80 w-full lg:w-[400px]' src={img1} alt="" />
        <img className='h-80 w-full lg:w-[400px]' src={img2} alt="" />
        <img className='h-80 w-full lg:w-[400px] rounded-xl' src={img3} alt="" />
      </div>
    </section>
  )
}
