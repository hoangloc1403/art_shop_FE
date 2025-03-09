import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { ReactNode } from 'react';

const StyledText = styled(Typography)({
  fontStyle: 'italic',
  textDecoration: 'underline',
  textDecorationColor: '#2196f3',
});

interface ServiceFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({ icon, title, description }) => (
  <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
    {icon}
    <Typography variant="h6" fontWeight="bold" mt={1}>
      {title}
    </Typography>
    <StyledText variant="body2">{description}</StyledText>
  </Grid>
);

const QualitySpeedSupport: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        <ServiceFeature
          icon={<StarIcon fontSize="large" color="primary" />}
          title="Chất lượng"
          description="Đảm bảo chất lượng những dịch vụ tốt nhất."
        />
        <ServiceFeature
          icon={<SpeedIcon fontSize="large" color="primary" />}
          title="Tốc độ"
          description="Giao hàng nhanh chóng đến địa chỉ khách hàng."
        />
        <ServiceFeature
          icon={<SupportAgentIcon fontSize="large" color="primary" />}
          title="Trợ giúp"
          description="Tư vấn và trợ giúp đặt hàng nhanh chóng."
        />
      </Grid>
    </Box>
  );
};

export default QualitySpeedSupport;
