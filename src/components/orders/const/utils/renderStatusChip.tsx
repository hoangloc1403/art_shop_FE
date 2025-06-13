import { OrderStatus } from '@/types/Order';
import { Chip } from '@mui/material';

export default function renderStatusChip(status: OrderStatus) {
  let label = '';
  let color: 'default' | 'primary' | 'success' | 'error' | 'warning' = 'default';

  switch (status) {
    case OrderStatus.PENDING:
      label = 'Chờ xác nhận';
      color = 'default';
      break;
    case OrderStatus.CONFIRMED:
      label = 'Đã xác nhận';
      color = 'primary';
      break;
    case OrderStatus.SHIPPED:
      label = 'Đang giao';
      color = 'warning';
      break;
    case OrderStatus.DELIVERED:
      label = 'Đã giao';
      color = 'success';
      break;
    case OrderStatus.CANCELLED:
      label = 'Đã hủy';
      color = 'error';
      break;
    default:
      label = status;
  }

  return <Chip label={label} color={color} size="small" />;
}
