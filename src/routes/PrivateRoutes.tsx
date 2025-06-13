import { Navigate } from 'react-router-dom';
import { IS_DEBUG } from '@/config';
import { PrivateLayout } from '@/layout';
import { NotFoundView } from '@/views';
import AboutView from '@/views/admin/ProductManagement';
import DevView from '@/views/Dev';
import NotImplementedView from '@/views/NotImplementedView';
import HomeView from '@/views/Home';
import CartView from '@/views/Cart';
import { CheckoutSuccessView, CheckoutView } from '@/views/Checkout';
import { ProfileView } from '@/views/Profile';
import { OrderDetailView } from '@/views/Order';
import { ScrollToTop } from '@/components';
import { FilterProductView, ProductDetailView } from '@/views/Product';

const PRIVATE_ROUTES = [
  {
    element: (
      <>
        <ScrollToTop />
        <PrivateLayout />
      </>
    ), // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <NotFoundView />,
      },
      {
        path: '/',
        element: <HomeView />,
      },
      {
        path: '/home',
        element: <HomeView />,
      },
      {
        path: '/cart',
        element: <CartView />,
      },
      {
        path: '/checkout',
        element: <CheckoutView />,
      },
      {
        path: '/checkout/success',
        element: <CheckoutSuccessView />,
      },
      {
        path: '/product/detail/:id',
        element: <ProductDetailView />,
      },
      {
        path: '/product',
        element: <FilterProductView />,
      },
      {
        path: '/order/:id',
        element: <OrderDetailView />,
      },

      {
        path: '/profile',
        element: <ProfileView />,
      },
      {
        path: 'auth/*',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
      {
        path: '/me',
        element: <NotImplementedView />,
      },
    ],
  },
];

// Add debug routes
IS_DEBUG &&
  PRIVATE_ROUTES[0].children.push({
    path: '/dev',
    element: <DevView />,
  });

export default PRIVATE_ROUTES;
