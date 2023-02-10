import {Box, Stack} from '@mui/material';
import React from 'react';
import FiltersForm from './Filters';
import CollapsibleTable from "./SeedsTable";

const HomePage = () => {

    return (
        <Box sx={{p: {xs: 1, md: 4}}}>
            <Stack spacing={2}>
                <FiltersForm/>
                <CollapsibleTable/>
            </Stack>
        </Box>
    )
}

export default HomePage;
