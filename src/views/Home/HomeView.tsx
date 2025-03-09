import Header from '@/layout/components/Header';
import ImageCarousel from '../Welcome/CarouselView';
import FaceGallery from '../Welcome/FaceGallery';
import Footer from '../Welcome/Footer';
import { CategoryFeaturedGallery, ProductGallery } from '@/components/products';
import { QualitySpeedSupport } from './components';

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
      <QualitySpeedSupport />
      <ProductGallery />
      <CategoryFeaturedGallery />
      <FaceGallery />
      <Footer />
    </>
  );
};

export default HomeView;
