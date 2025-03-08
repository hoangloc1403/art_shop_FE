import Header from '@/layout/components/Header';
import ImageCarousel from '../Welcome/CarouselView';
import ProductGallery from '../Welcome/ProductGallery';
import FaceGallery from '../Welcome/FaceGallery';
import Footer from '../Welcome/Footer';

/**
 * Renders "Home" view
 * url: /home
 * @page Home
 */
const HomeView = () => {
  return (
    <>
      <Header />
      <ImageCarousel />
      <ProductGallery />
      <FaceGallery />
      <Footer />
    </>
  );
};

export default HomeView;
