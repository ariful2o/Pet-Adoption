import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

export default function Carsual() {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={35}
      totalSlides={4}
      className='relative'
    >
      <Slider>
        <Slide index={0}>
          <img className='w-full h-full' src="https://people.com/thmb/BJO005QLK6f4YcZHW0iONQxoJ1g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/family-adopt-dog-6c2f1eedd593433f85549e94e07af8bf.jpg" alt="" />
        </Slide>
        <Slide index={1}>
          <img className='w-full h-full' src="https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt1473f8fa02cf305c/6261d1c93348304067e0dc0e/img-requirements-to-adopt-a-pet.jpg" alt="" />
        </Slide>
        <Slide index={2}>
          <img className='w-full h-full' src="https://media-be.chewy.com/wp-content/uploads/2020/10/28102619/pet-adoption-statistics.jpg" alt="" />
        </Slide>
        <Slide index={3}>
          <img className='w-full h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdjPmU0NoGtjNhs3ZrWrCW72ZfbRi4fM7Bw&s" alt="" />
        </Slide>

      </Slider>
      <div className="w-full justify-between lg:justify-end gap-4 p-4  flex absolute bottom-10 lg:bottom-8">
        <ButtonBack><FaRegArrowAltCircleLeft className='text-2xl' /></ButtonBack>
        <ButtonNext><FaRegArrowAltCircleRight className='text-2xl' /></ButtonNext>
      </div>
    </CarouselProvider>
  )
}