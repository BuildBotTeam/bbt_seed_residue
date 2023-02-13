import {Box, Stack} from '@mui/material';
import React from 'react';
import FiltersForm from './Filters';
import SeedsTable from "./SeedsTable";

export default function HomePage() {

    return (
        <Box sx={{p: {xs: 1, md: 4}}}>
            <Stack spacing={2}>
                <FiltersForm/>
                <SeedsTable/>
            </Stack>
        </Box>
    )
}
