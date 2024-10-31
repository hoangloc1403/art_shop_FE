
import Header from "@/layout/Header";
import ImageCarousel from "../Welcome/CarouselView";
import ProductGallery from "../Welcome/ProductGallery";



/**
 * Renders "Home" view
 * url: /home
 * @page Home
 */
const HomeView = () => {
    return (
        <div>
            <Header />
            <ImageCarousel />
            <ProductGallery />
        </div>
    );
};

export default HomeView;
