import { Navigate } from 'react-router-dom';
import AboutView from '@/views/admin/ProductManagement';
import AuthView from '@/views/Auth';
import { PublicLayout } from '@/layout';
import { IS_DEBUG } from '@/config';
import DevView from '@/views/Dev';
import HomeView from '@/views/Home';
import ProductDetailView from '@/views/ProductDetail';
import CartView from '@/views/Cart';
import CheckoutView from '@/views/Checkout';
import { SignInView } from '@/views/SignIn';

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
      {
        path: '/',
        element: <AuthView />,
      },
      {
        path: '/sign_in',
        element: <SignInView />,
      },
      {
        path: '/home',
        element: <HomeView />,
      },
      {
        path: '/about',
        element: <AboutView />,
      },
      {
        path: '/detail/:id',
        element: <ProductDetailView />,
      },
      {
        path: '/cart',
        element: <CartView />,
      },
      {
        path: '/auth',
        element: <AuthView />,
      },
    ],
  },
];

// Add debug routes
IS_DEBUG &&
  PUBLIC_ROUTES[0].children.push({
    path: '/dev',
    element: <DevView />,
  });

export default PUBLIC_ROUTES;
