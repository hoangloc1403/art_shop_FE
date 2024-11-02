
import Header from "@/layout/Header";
import ImageCarousel from "../Welcome/CarouselView";
import ProductGallery from "../Welcome/ProductGallery";
import FaceGallery from "../Welcome/FaceGallery";
import Footer from "../Welcome/Footer";



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
            <FaceGallery />
            <Footer />
        </div>
    );
};

export default HomeView;
