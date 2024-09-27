import React from 'react'
import Cart from '../../componts/Cart'
import useCats from '../../hooks/cats/useCars'

export default function CatList() {
  const [cats, refetch] = useCats()
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-9'>
      {cats.map((cat) => {
        return <Cart key={cat._id} data={cat}></Cart>
      })}
    </div>
  )
}
