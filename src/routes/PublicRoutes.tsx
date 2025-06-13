import { Navigate } from 'react-router-dom';
import AboutView from '@/views/admin/ProductManagement';
import AuthView from '@/views/Auth';
import { PublicLayout } from '@/layout';
import { IS_DEBUG } from '@/config';
import DevView from '@/views/Dev';
import HomeView from '@/views/Home';
import { SignInView, SignUpView } from '@/views/AuthView';
import { FilterProductView, ProductDetailView } from '@/views/Product';
import { ScrollToTop } from '@/components';

const PUBLIC_ROUTES = [
  {
    element: (
      <>
        <ScrollToTop />
        <PublicLayout />
      </>
    ),
    children: [
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
      {
        path: '/',
        // element: <AuthView />,
        element: <HomeView />,
      },
      {
        path: '/sign_in',
        element: <SignInView />,
      },
      {
        path: '/sign_up',
        element: <SignUpView />,
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
        path: '/product/detail/:id',
        element: <ProductDetailView />,
      },
      {
        path: '/product',
        element: <FilterProductView />,
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
