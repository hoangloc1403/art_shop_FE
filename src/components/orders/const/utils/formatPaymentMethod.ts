export default function formatPaymentMethod(method: string) {
  switch (method) {
    case 'credit_card':
      return 'Thẻ tín dụng';
    case 'paypal':
      return 'PayPal';
    case 'cash_on_delivery':
      return 'Thanh toán khi nhận hàng';
    case 'bank_transfer':
      return 'Chuyển khoản';
    default:
      return method;
  }
}
