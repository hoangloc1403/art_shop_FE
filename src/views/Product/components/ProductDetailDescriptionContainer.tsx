import { Product } from '@/types';
import { Box, Container, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

type Props = { product: Product };

const ProductDetailDescriptionContainer = ({ product }: Props) => {
  return (
    <Grid container spacing={4} alignItems="flex-start" sx={{ py: 6 }}>
      <Grid item xs={12} md={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#333',
          }}
          gutterBottom
        >
          Chi tiết về tác phẩm
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography
          variant="body1"
          sx={{
            color: '#4f4f4f',
            fontSize: '1.5rem',
            lineHeight: 1.8,
            maxWidth: '700px',
          }}
        >
          {product.description}
        </Typography>
      </Grid>
    </Grid>
  );
  // return (
  //   <Box sx={{ mt: 4 }}>
  //     <Typography variant="h6" fontWeight="bold" gutterBottom>
  //       Mô tả
  //     </Typography>
  //     <Typography variant="body1" sx={{ color: '#4f4f4f', mb: 4 }}>
  //       {product.description}
  //     </Typography>

  //     <Typography variant="h6" fontWeight="bold" gutterBottom>
  //       Thông tin kỹ thuật
  //     </Typography>
  //     <Table>
  //       <TableBody>
  //         <TableRow>
  //           <TableCell sx={{ fontWeight: 'bold', color: '#333', borderBottom: 'none' }}>CHẤT LIỆU</TableCell>
  //           <TableCell sx={{ borderBottom: 'none' }}>{product?.medium}</TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell sx={{ fontWeight: 'bold', color: '#333', borderBottom: 'none' }}>KÍCH THƯỚC</TableCell>
  //           <TableCell sx={{ borderBottom: 'none' }}>{`${product.width}cm x ${product.height}cm`}</TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell sx={{ fontWeight: 'bold', color: '#333', borderBottom: 'none' }}>TRANH HỌA SĨ</TableCell>
  //           <TableCell sx={{ borderBottom: 'none' }}>Tranh sáng tác, độc bản và có giấy tác quyền của họa sĩ</TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //   </Box>
  // );
};

export default ProductDetailDescriptionContainer;
