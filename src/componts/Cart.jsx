import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

export default function Cart({ data }) {
  const { name, age, petLocation, description, breed, gender, adoptionFee, weight, image, status,
    _id } = data;

  const location = useLocation();

  // Extract the path based on the current pathname
  const pathSegments = location.pathname.split('/'); // Split the pathname
  const path = pathSegments[1] // Get the second-to-last segment
  const id = _id;
  return (
    <div className="card bg-base-100 w-full lg:w-96 shadow-xl mx-auto">
      <figure className="relative group">
        <img
          className='rounded-2xl h-60 w-full transition-transform duration-300 transform group-hover:scale-105 group-hover:brightness-75 group-hover:saturate-50'
          src={image}
          alt={name} />

        <button className="absolute top-2 left-2 backdrop-blur-lg px-4 py-2 rounded-3xl text-white transition-opacity duration-300 opacity-100 group-hover:opacity-0">
          {breed}
        </button>

        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg font-medium px-4 py-2 rounded-3xl text-white opacity-0 group-hover:opacity-100 transition duration-300">
          {status}
        </button>
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">{gender.label}</div>
        </h2>
        <p>{description}</p>
        <div className="card-price">
          <h4 className=""><span className=" font-bold">Location:</span> {petLocation} pound</h4>
          <h4 className=""><span className=" font-bold">Weight:</span> {weight} pound</h4>
          <h4 className=""><span className=" font-bold">Age:</span> {age} years</h4>
          <h4 className=""><span className=" font-bold">Adoption Fee:</span> ${adoptionFee}</h4>
        </div>
        {/* /details/:path/:id */}
        <div className="card-actions justify-end cursor-pointer">
          <div className="badge badge-outline badge-success">
            <NavLink to={`/${path}/${id}`}>Details</NavLink>
          </div>
          {/* <div className="badge badge-outline badge-primary">Adopt Now</div> */}
        </div>
      </div>
    </div>
  )
}


Cart.propTypes = {
  data: PropTypes.object.isRequired,

}