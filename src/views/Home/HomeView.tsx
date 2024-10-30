// import { Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
// import { AppButton, AppView } from '@/components';
// import { getCurrentVersion } from '@/utils';

import { AppView } from "@/components";
import Header from "@/layout/Header";
// import { Typography } from "@mui/material";

/**
 * Renders "Home" view
 * url: /home
 * @page Home
 */
const HomeView = () => {
    return (
        <AppView>
            <Header />
        </AppView>
    );
};

export default HomeView;
