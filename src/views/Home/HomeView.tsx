import Header from '@/layout/components/Header';
import FaceGallery from '../Welcome/FaceGallery';
import Footer from '../Welcome/Footer';
import { CategoryFeaturedGallery, ProductFeaturedGallery } from '@/components/products';
import HeroSection from '../Welcome/HeroSection';
import CustomArtworkRequest from '../Welcome/CustomArtworkRequest';

/**
 * Renders "Home" view
 * url: /home
 * @page Home
 */
const HomeView = () => {
  return (
    <>
      <Header />
      {/* <ImageCarousel /> */}
      <HeroSection />
      {/* <QualitySpeedSupport /> */}
      {/* <ProductGallery /> */}
      <CategoryFeaturedGallery />
      <CustomArtworkRequest />
      <ProductFeaturedGallery />
      <FaceGallery />
      <Footer />
    </>
  );
};

export default HomeView;
