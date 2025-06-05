import { Navigate } from 'react-router-dom';
import { AdminLayout } from '@/layout';
// import AdminDashboardView from '@/views/admin/Dashboard';
// import UserManagementView from '@/views/admin/UserManagement';

// import AdminSettingsView from '@/views/admin/Settings';
import NotFoundView from '@/views/NotFoundView';
import NotImplementedView from '@/views/NotImplementedView';
import ProductManagementView from '@/views/admin/ProductManagement/ProductManagementView';
import ProductAddView from '@/views/admin/ProductManagement/ProductAddView';
import OrderManagementView from '@/views/admin/OrderManagement/OrderManagementView';
import { CategoryAddView, CategoryManagementView } from '@/views/admin/CategoryManagement';

const ADMIN_ROUTES = [
  {
    element: <AdminLayout />, // Admin layout wrapper
    children: [
      //   {
      //     path: '/admin',
      //     element: <AdminDashboardView />,
      //   },
      //   {
      //     path: '/admin/users',
      //     element: <UserManagementView />,
      //   },
      {
        path: '/admin/products',
        element: <ProductManagementView />,
      },
      {
        path: '/admin/products/add',
        element: <ProductAddView />,
      },
      {
        path: '/admin/products/edit',
        element: <ProductAddView />,
      },
      {
        path: '/admin/categories',
        element: <CategoryManagementView />,
      },
      {
        path: '/admin/categories/add',
        element: <CategoryAddView />,
      },
      {
        path: '/admin/orders',
        element: <OrderManagementView />,
      },
      //   {
      //     path: '/admin/settings',
      //     element: <AdminSettingsView />,
      //   },
      {
        path: '/admin/not-implemented',
        element: <NotImplementedView />,
      },
      {
        path: '/admin/*',
        element: <NotFoundView />,
      },
      {
        path: '/admin/auth/*',
        element: <Navigate to="/admin" replace />,
      },
    ],
  },
];

export default ADMIN_ROUTES;
