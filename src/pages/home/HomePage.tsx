import HeroSection from "./HeroSection";
import Services from "./Services";
import OurDestinations from "./OurDestinations";
import SlidingBanners from "./SlidingBanners";
import ExploreServices from "./ExploreServices";
import Articales from "./Articales";

const HomePage = () => {
  return (
    <>
      <SlidingBanners />
      <HeroSection />
      <OurDestinations />
      <Services />
      <Articales />
      <ExploreServices />
    </>
  );
};
export default HomePage;
