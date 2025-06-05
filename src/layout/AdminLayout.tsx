import { FunctionComponent, PropsWithChildren } from 'react';
import { IS_DEBUG } from '@/config';
import { LinkToPage } from '@/utils';
import TopBarAndSideBarLayout from './TopBarAndSideBarLayout';

const TITLE_ADMIN = 'Quản trị hệ thống'; // Title for admin pages

/**
 * SideBar navigation items with links for Admin Layout
 */
const ADMIN_SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: 'dashboard',
  },
  {
    title: 'Đơn Hàng',
    path: '/admin/orders',
    icon: 'order',
  },
  {
    title: 'Sản Phẩm',
    path: '/admin/products',
    icon: 'product',
  },
  {
    title: 'Thể Loại',
    path: '/admin/categories',
    icon: 'category',
  },
  {
    title: 'Người dùng',
    path: '/admin/users',
    icon: 'account',
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: 'settings',
  },
];

// Add debug links
IS_DEBUG &&
  ADMIN_SIDE_BAR_ITEMS.push({
    title: '[Debug Tools]',
    path: '/admin/not-implemented',
    icon: 'bug_report',
  });

/**
 * Renders "Admin Layout" composition
 * @layout AdminLayout
 */
const AdminLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_ADMIN;
  document.title = title;

  return (
    <TopBarAndSideBarLayout sidebarItems={ADMIN_SIDE_BAR_ITEMS} title={title} variant="sidebarPersistentOnDesktop">
      {children}
    </TopBarAndSideBarLayout>
  );
};

export default AdminLayout;
