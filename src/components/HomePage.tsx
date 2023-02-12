import {Box, Stack} from '@mui/material';
import React from 'react';
import FiltersForm from './Filters';
import SeedsTable from "./SeedsTable";
import SeedsTable2 from "./SeedsTable2";

const HomePage = () => {

    return (
        <Box sx={{p: {xs: 1, md: 4}}}>
            <Stack spacing={2}>
                <FiltersForm/>
                <SeedsTable/>
                <SeedsTable2 />
            </Stack>
        </Box>
    )
}

export default HomePage;
