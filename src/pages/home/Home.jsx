import Banner from "./Home/Banner";
import Carsual from "./Home/Carsual";
import FindFriends from "./Home/FindFriends";
import HowAdopat from "./Home/HowAdopat";


export default function Home() {
  return (
    <section>
      <Carsual></Carsual>
      <Banner></Banner>
      <FindFriends></FindFriends>
      <HowAdopat></HowAdopat>
    </section>
  )
}
