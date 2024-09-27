import React from 'react'

export default function DogCart({ dog }) {
  console.log(dog)
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="relative group">
        <img
          className='rounded-2xl h-60 w-full transition-transform duration-300 transform group-hover:scale-105 group-hover:brightness-75 group-hover:saturate-50'
          src={dog.image}
          alt={dog.name} />

        <button className="absolute top-2 left-2 backdrop-blur-lg px-4 py-2 rounded-3xl text-white transition-opacity duration-300 opacity-100 group-hover:opacity-0">
          {dog.breed}
        </button>

        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg font-medium px-4 py-2 rounded-3xl text-white opacity-0 group-hover:opacity-100 transition duration-300">
          {dog.status}
        </button>
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {dog.name}
          <div className="badge badge-secondary">{dog.gender}</div>
        </h2>
        <p>{dog.description}</p>
        <div className="card-price">
          <h4 className=""><span className=" font-bold">Weight:</span> {dog.weight} pound</h4>
          <h4 className=""><span className=" font-bold">Age:</span> {dog.age} years</h4>
          <h4 className=""><span className=" font-bold">Adoption Fee:</span> ${dog.adoptionFee}</h4>
        </div>
        <div className="card-actions justify-end cursor-pointer">
          <div className="badge badge-outline badge-success">Details</div>
          <div className="badge badge-outline badge-primary">Adopt Now</div>
        </div>
      </div>
    </div>
  )
}
