import React from 'react'
import DogCart from '../../componts/DogCart';
import useDogs from '../../hooks/dogs/useDogs'

export default function DogList() {
  const [dogs] = useDogs()

  console.log(dogs);
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-9'>
      {dogs.map((dog)=>{
        return <DogCart key={dog._id} dog={dog}></DogCart>
      })}
    </div>
  )
}
