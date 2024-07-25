import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function Carsual() {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={35}
      totalSlides={3}
     className='relative'
    >
      <Slider>
        <Slide index={0}>I am the first Slide.</Slide>
        <Slide index={1}>I am the second Slide.</Slide>
        <Slide index={2}>I am the third Slide.</Slide>
      </Slider>
      <div className="w-full justify-between lg:justify-end gap-4 p-4  flex absolute bottom-10 lg:bottom-8">
        <ButtonBack>Back</ButtonBack> 
        <ButtonNext>Next</ButtonNext>
      </div>
    </CarouselProvider>
  )
}