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
} from '@material-ui/core';

import {
  get_coin_records_by_puzzle_hash
} from '../../modules/fullnodeMessages';

import { useDispatch } from 'react-redux';
import { date } from '@lingui/core/cjs/formats';

const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, get_coin_info_mojo, bytes_to_hex, hex_to_bytes } = require("chia-utils");

const StyledInputBase = styled(InputBase)`
  min-width: 15rem;
`;

type FormData = {
  poolAddress: string;
  qdId: string;
};

export default function PoolCollection() {

  //private==================================
  function dealSearchResult(records:any[]):string {

    var amount1: number = 0
    var amount2: number = 0

    var record: any
    for(let record of records) {
      var amount: number = record.coin.amount
      var timestamp: number = record.timestamp

      var current = (new Date()).getTime()/1000
      console.log(current)
      console.log(timestamp+604800)
      console.log("===")
      if ((timestamp+604800)>current) {
        amount1 += amount
      } else {
        amount2 += amount
      }
    }
    return "can:" + amount1 + "\n" + "can not:" + amount2
  }


  //==================================
  const dispatch = useDispatch();

  const methods = useForm<FormData>({
    shouldUnregister: false,
    defaultValues: {
      poolAddress: '',
      qdId: '',
    },
  });

  async function handleSearch(values: FormData) {
    let address = values.poolAddress
    if (address) {
      let puzzlehash = address_to_puzzle_hash(address)
      //const data = await dispatch(get_coin_records_by_puzzle_hash(puzzlehash));

      const data = {
        "coin_records": [
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb9240000000000000000000000000003807b",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 229501,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630300194
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb92400000000000000000000000000034c6e",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 216175,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630051755
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb92400000000000000000000000000034611",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 214549,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630023808
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb92400000000000000000000000000034715",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 214810,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630029159
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb92400000000000000000000000000036bd6",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 224218,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630201631
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb924000000000000000000000000000396d3",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 235221,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630409145
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb924000000000000000000000000000372bf",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 225985,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1630233807
            },
            {
                "coin": {
                    "amount": 1750000000000,
                    "parent_coin_info": "0xe3b0c44298fc1c149afbf4c8996fb9240000000000000000000000000003306d",
                    "puzzle_hash": "0x8773bacc0caf6e2d423a26e2bcab6d7b9d0be90534829c1f697bff78715d011e"
                },
                "coinbase": true,
                "confirmed_block_index": 209008,
                "spent": false,
                "spent_block_index": 0,
                "timestamp": 1629919003
            }
        ],
        "success": true
    }




      if (data.success) {
        let result = dealSearchResult(data.coin_records)
        alert(result)
      } else {
        alert("fail")
      }

      console.log(data)
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
              placeholder='Pool Contract Address'
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
              placeholder='NFT Launcher Id'
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