import Banner from "./Home/Banner";
import Carsual from "./Home/Carsual";
import FindFriends from "./Home/FindFriends";
import HowAdopat from "./Home/HowAdopat";
import JoinCommunty from "./Home/JoinCommunty";


export default function Home() {
  return (
    <section>
      <Carsual></Carsual>
      <Banner></Banner>
      <FindFriends></FindFriends>
      <HowAdopat></HowAdopat>
      <JoinCommunty></JoinCommunty>
    </section>
  )
}
