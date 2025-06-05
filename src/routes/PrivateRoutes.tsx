import { Navigate } from 'react-router-dom';
import { IS_DEBUG } from '@/config';
import { PrivateLayout } from '@/layout';
import { NotFoundView } from '@/views';
import AboutView from '@/views/admin/ProductManagement';
import DevView from '@/views/Dev';
import WelcomeView from '@/views/Welcome';
import NotImplementedView from '@/views/NotImplementedView';
import HomeView from '@/views/Home';
import CartView from '@/views/Cart';
import ProductDetailView from '@/views/ProductDetail';
import { CheckoutSuccessView, CheckoutView } from '@/views/Checkout';

const PRIVATE_ROUTES = [
  {
    element: <PrivateLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <NotFoundView />,
      },
      {
        path: '/',
        element: <WelcomeView />,
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
        path: '/detail/:id',
        element: <ProductDetailView />,
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
