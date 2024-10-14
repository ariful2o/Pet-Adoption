import exploreIcon from "../assets/icons/Frame.svg";
import PropTypes from 'prop-types';

export default function CustomBtn({ text }) {
  return (
    <button className="btn text-[#0E2515] border-1 border-[#E0E8E0]">{text} <img src={exploreIcon} /></button>
  )
}

CustomBtn.propTypes = {
  text: PropTypes.string.isRequired,
}