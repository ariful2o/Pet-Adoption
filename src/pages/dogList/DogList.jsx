
import { Helmet } from 'react-helmet-async';
import Cart from '../../componts/Cart';
import TitleBanner from '../../componts/TitleBanner';
import useDogs from '../../hooks/dogs/useDogs';

export default function DogList() {
  const [dogs, isLoading] = useDogs()

  if (isLoading) return <div className='w-full min-h-96 flex justify-center items-center'><span className="loading  text-accent loading-ring loading-lg"></span></div>
  return (
    <section>
      <Helmet>
        <title>Pet Adoption | Dogs</title>
      </Helmet>
      <TitleBanner section="Dog List" image="https://www.toronto.ca/wp-content/uploads/2017/08/94bc-adopt_pet-995x498.png"></TitleBanner>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-9 py-4'>
        {
          dogs.map((dog) => {
            return <Cart key={dog._id} data={dog}></Cart>
          })}
      </div>
    </section>
  )
}
