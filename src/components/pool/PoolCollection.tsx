import { Trans } from '@lingui/macro';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Form, InputBase } from '@chia/core';


import {
  Typography,
  Button,
  TextField,
} from '@material-ui/core';


type FormData = {
  pool_address: string,
};



export default function PoolCollection() {

  function queryBtnClicked(values: FormData) {
    alert(values.pool_address)
  }

  const methods = useForm<FormData>({
    shouldUnregister: false,
    defaultValues: {
      pool_address: '',
    },
  });
  

  return (

    <Flex flexDirection="column" gap={3}>

      <Form methods={methods} onSubmit={queryBtnClicked}>
        <Flex gap={1}>
          <TextField
            name="pool_address"
            variant="filled"
            color="secondary"
            fullWidth
            label={<Trans>PoolAddress</Trans>}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
          <Trans>Query</Trans>
          </Button>
        </Flex>
      </Form>

      <Typography variant="body1" color="textSecondary">
      Query Result:
      </Typography>


    </Flex>
  );
}