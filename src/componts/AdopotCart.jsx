import PropTypes from 'prop-types';

export default function AdopotCart({ img, heading, description }) {
  return (
    <div className="w-full lg:w-80 px-2 lg:px-8 py-6 bg-[#E0E8E0] border-1 border-[#E0E8E0] rounded-md">
      <img className='w-8 h-8' src={img} alt={heading} />
      <h3 className="text-[#0E2515] text-xl lg:text-2xl font-normal mt-2">{heading}</h3>
      <p className="text-[#8C8C8C] font-normal ">{description}</p>
    </div>
  )
}


AdopotCart.propTypes = {
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}