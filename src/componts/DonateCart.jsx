import PropTypes from 'prop-types';
import CustomBtn from './CustomBtn';

export default function DonateCart({ img, title, description }) {
  return (
    <div className='bg-[#F8FCF9] hover:bg-[#1C4A2A] hover:text-white  p-4 space-y-4 rounded-xl'>
      <img className='mx-auto h-8 w-8' src={img} alt="" />
      <h2 className=" font-medium text-2xl">{title}</h2>
      <p className="text-[#8C8C8C] font-medium">{description}</p>
      <CustomBtn text="Donate Now"></CustomBtn>
    </div>
  )
}


DonateCart.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}