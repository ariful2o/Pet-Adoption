
import { Helmet } from 'react-helmet-async'
import Cart from '../../componts/Cart'
import TitleBanner from '../../componts/TitleBanner'
import useCats from '../../hooks/cats/useCats'

export default function CatList() {
  const [cats, isLoading] = useCats()


  if (isLoading) return <div className='w-full min-h-96 flex justify-center items-center'><span className="loading  text-accent loading-ring loading-lg"></span></div>
  return (
    <section>
      <Helmet>
        <title>Pet Adoption | Cats</title>
      </Helmet>
      <TitleBanner section="Cat List" image="https://www.bluecross.org.uk/sites/default/files/d8/styles/theme_feature_extra_large/public/2021-02/BX150932_HY_BC_EDDIE_032-lpr.JPG.webp?itok=6VofKpXj"></TitleBanner>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-9 py-8'>
        {cats.map((cat) => {
          return <Cart key={cat._id} data={cat}></Cart>
        })}
      </div>
    </section>
  )
}
