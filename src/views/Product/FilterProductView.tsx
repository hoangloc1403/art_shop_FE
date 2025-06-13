import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import ProductFilterContainer from '@/components/products/ProductFilterContainer';

const FilterProductView = () => {
  return (
    <>
      <Header />
      <ProductFilterContainer />
      <Footer />
    </>
  );
};

export default FilterProductView;
