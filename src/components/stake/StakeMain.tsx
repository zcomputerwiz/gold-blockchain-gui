import React, { useState } from "react"
import { Box, IconButton, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Flex, Form, InputBase } from '@chia/core';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  Typography,
  Button,
} from '@material-ui/core';

const StyledInputBase = styled(InputBase)`
  min-width: 15rem;
`;


export default function StakeMain() {

    type FormData = {
        poolAddress: string;
        qdId: string;
    };

    const methods = useForm<FormData>({
        shouldUnregister: false,
        defaultValues: {
          poolAddress: '',
          qdId: '',
        },
    });

    async function handleSearch(values: FormData) {

    }

    return (
        <Flex flexDirection="column" gap={3}>

            <Typography variant="body1" color="textSecondary">
            Enter your chia pool contract address and NFT Launcher ID to recover the missing tSIT from your plot NFT.
            </Typography>

            <Form methods={methods} onSubmit={handleSearch}>
            <Paper elevation={0} variant="outlined">
                <Flex alignItems="center" gap={1}>
                <Box />
                <StyledInputBase
                    name="poolAddress"
                    placeholder='Pool Contract Address'
                    fullWidth
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
                </Flex>
            </Paper>
            </Form>

        </Flex>
    );
}