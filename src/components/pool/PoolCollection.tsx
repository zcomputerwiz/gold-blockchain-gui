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

import {
  recover_pool_nft
} from '../../modules/message';

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

var can_records = new Array()
var pool_contract_hash = ""

export default function PoolCollection() {

  function dealSearchResult(records:any[]):string {

    var can: number = 0
    var cannot: number = 0
    var temp = new Array()

    var record: any
    for(let record of records) {
      var amount: number = record.coin.amount
      var timestamp: number = record.timestamp

      var current = (new Date()).getTime()/1000
      if ((current-timestamp)>604800) {
        can += amount
        temp.push(record)
      } else {
        cannot += amount
      }
    }

    can_records = temp
    return "can:" + can/1000000000000 + "\n" + "can not:" + cannot/1000000000000
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
      pool_contract_hash = ""
      can_records = new Array()

      let puzzlehash = address_to_puzzle_hash(address)
      const data = await dispatch(get_coin_records_by_puzzle_hash(puzzlehash));
      if (data.success) {
        pool_contract_hash = puzzlehash
        let result = dealSearchResult(data.coin_records)
        alert(result)
      } else {
        alert("fail")
      }

      // console.log(data)
    }
  }
  
  async function handleCollection(values: FormData) {

    console.log("=====")
    console.log(pool_contract_hash)
    console.log(can_records)

    let qdId = values.qdId
    if (!qdId) {
      alert("Input NFT Launcher Id")
      return
    }
    if (can_records.length < 1) {
      alert("No coin records")
      return
    }

    const data = await dispatch(recover_pool_nft(pool_contract_hash, qdId, can_records));
    console.log(data)
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