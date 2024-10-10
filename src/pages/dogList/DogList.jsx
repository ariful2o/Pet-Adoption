import React from 'react'
import Cart from '../../componts/Cart';
import TitleBanner from '../../componts/TitleBanner';
import useDogs from '../../hooks/dogs/useDogs'

export default function DogList() {
  const [dogs] = useDogs()
  // console.log(dogs);
  return (
    <section>
      <TitleBanner section="Dog List" image="https://www.toronto.ca/wp-content/uploads/2017/08/94bc-adopt_pet-995x498.png"></TitleBanner>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-9'>
        {dogs.map((dog) => {
          return <Cart key={dog._id} data={dog}></Cart>
        })}
      </div>
    </section>
  )
}
