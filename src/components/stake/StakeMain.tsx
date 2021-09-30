import React, { useState } from "react"
import { Trans } from '@lingui/macro';
import { Box, Paper } from '@material-ui/core';
import { Flex, Form, InputBase } from '@chia/core';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import StakeSelect from "./StakeSelect"

import {
  Typography,
  Button,
} from '@material-ui/core';

const StyledInputBase = styled(InputBase)`
  min-width: 15rem;
`;


export default function StakeMain() {

    type FormData = {
        amount: string;
        publicKey: string;
    };

    const methods = useForm<FormData>({
        shouldUnregister: false,
        defaultValues: {
          amount: '',
          publicKey: '',
        },
    });

    async function handleSearch(values: FormData) {

    }


    return (
        <Flex flexDirection="column" gap={3}>

            <Typography variant="body1" color="textSecondary">
            xxxxxxxxxxxxxxxxxxxxxx.
            </Typography>

            <Form methods={methods} onSubmit={handleSearch}>
            <Paper elevation={0} variant="outlined">
                <Flex alignItems="center" gap={1}>
                <Box />
                <StyledInputBase
                    name="amount"
                    placeholder='Amount'
                    fullWidth
                />
                <StakeSelect/>
                </Flex>
            </Paper>

            <Flex justifyContent="flex-end" gap={1}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              > <Trans>Send</Trans>
              </Button>
            </Flex>
            </Form>

        </Flex>
    );
}