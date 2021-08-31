import React from 'react';
import { t } from '@lingui/macro';
import { Box, IconButton, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Flex, Form, InputBase } from '@chia/core';
import { useForm } from 'react-hook-form';

import {
  Typography,
  Button,
  TextField,
} from '@material-ui/core';

const StyledInputBase = styled(InputBase)`
  min-width: 15rem;
`;

type FormData = {
  poolAddress: string;
  qdId: string;
};

export default function PoolCollection() {
  const history = useHistory();
  const methods = useForm<FormData>({
    shouldUnregister: false,
    defaultValues: {
      poolAddress: '',
      qdId: '',
    },
  });

  function handleSearch(values: FormData) {
    if (values.poolAddress) {
      alert(values.poolAddress)
    }
  }

  function handleCollection(values: FormData) {
    if (values.qdId) {
      alert(values.qdId)
    }
  }

  return (
    <Flex flexDirection="column" gap={3}>

      <Form methods={methods} onSubmit={handleSearch}>
        <Paper elevation={0} variant="outlined">
          <Flex alignItems="center" gap={1}>
            <Box />
            <StyledInputBase
              name="poolAddress"
              placeholder={t`PoolAddress`}
              fullWidth
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Flex>
        </Paper>
      </Form>

      <Typography variant="body1" color="textSecondary">
      Query Result:
      </Typography>

      <Form methods={methods} onSubmit={handleCollection}>
      <Paper elevation={0} variant="outlined">
          <Flex alignItems="center" gap={1}>
            <Box />
            <StyledInputBase
              name="qdId"
              placeholder={t`qdId`}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit">
              collection
            </Button>
          </Flex>
        </Paper>
      </Form>

    </Flex>
  );
}