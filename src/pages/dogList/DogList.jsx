import React from 'react'
import useDogs from '../../hooks/dogs/useDogs'

export default function DogList() {
  const [dogs] = useDogs()

  console.log(dogs);
  return (
    <div>DogList</div>
  )
}
