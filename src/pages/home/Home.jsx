import Banner from "./Home/Banner";
import Carsual from "./Home/Carsual";
import Donate from "./Home/Donate";
import FindFriends from "./Home/FindFriends";
import HowAdopat from "./Home/HowAdopat";
import JoinCommunty from "./Home/JoinCommunty";
import Subscribe from "./Home/Subscribe";
import Volunteer from "./Home/Volunteer";


export default function Home() {
  return (
    <section>
      <Carsual></Carsual>
      <Banner></Banner>
      <FindFriends></FindFriends>
      <HowAdopat></HowAdopat>
      <JoinCommunty></JoinCommunty>
      <Donate></Donate>
      <Volunteer></Volunteer>
      <Subscribe></Subscribe>
    </section>
  )
}
