import Carousel from "../../layouts/Carousel";
import FeaturedProjects from "./components/FeaturedProjects";
import LocationCards from "./components/LocationCards";
import NewsSlider from "./components/NewsSlider";
import NewsTabsLayout from "./components/NewsTabsLayout";
import PropertyListing from "./components/PropertyListing";



const Home = () => {
    return (
        <div >
            <Carousel />
            <NewsTabsLayout />
            <PropertyListing />
            <FeaturedProjects />
            <LocationCards />
            <NewsSlider />
        </div>

    )
}

export default Home;