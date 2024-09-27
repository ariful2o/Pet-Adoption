import React from 'react'
import Cart from '../../componts/Cart';
import useDogs from '../../hooks/dogs/useDogs'

export default function DogList() {
  const [dogs] = useDogs()

  console.log(dogs);
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-9'>
      {dogs.map((dog) => {
        return <Cart key={dog._id} data={dog}></Cart>
      })}
    </div>
  )
}
