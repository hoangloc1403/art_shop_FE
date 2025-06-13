import { OrderDetailContainer } from '@/components/orders';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';

/**
 * Renders "OrderDetail" view
 * url: /order/:id
 * @page OrderDetail
 */
const OrderDetailView = () => {
  return (
    <>
      <Header />
      <OrderDetailContainer />
      <Footer />
    </>
  );
};

export default OrderDetailView;
