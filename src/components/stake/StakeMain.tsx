import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Box, Paper } from '@material-ui/core';
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { Flex, Form, InputBase, Loading } from '@chia/core';
import styled from 'styled-components';

import isNumeric from 'validator/es/lib/isNumeric';
import { get_plots, get_coin_records_by_puzzle_hash } from '../../modules/fullnodeMessages';
import { send_transaction, send_transaction_multi } from '../../modules/message';
import { chia_to_mojo } from '../../util/chia';
import { address_to_puzzle_hash } from '../pool/address_to_puzzle_hash';
import type { RootState } from '../../modules/rootReducer';
import usePlots from '../../hooks/usePlots';


const StyledInputBase = styled(InputBase)`
  min-width: 15rem;
`;

var stakeCoins = new Array()


export default function StakeMain() {
    const dispatch = useDispatch();

    // const { loading, hasPlots, hasQueue } = usePlots();
    // if (loading) {
    //   return <Loading center />;
    // }


    //PlotSelect
    //=========================================================================
    //=========================================================================
    const [open, toggleOpen] = useToggle(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [plotValue, setPlotValue] = useState("Loading&-&0");
    const [plotValues, setPlotValues] = useState(["Loading&-&0"]);

    useEffect(() => {
      async function initialPlotValues() {
        const data = await dispatch(get_plots());
        let plots = data.plots;
  
        let publickey = plots.map((x) => {
          return x["farmer_public_key"] + "&" + x["farmer_puzzle_hash"];
        });
  
        let plotValues: string[] = Array.from(new Set(publickey))
        plotValues = dealPlotCount(plotValues, plots)
        if (plotValues.length < 1) {
          plotValues = ["Can not detect any plot files&-&0"]
        }
        setPlotValues(plotValues);
        setPlotValue(plotValues[0]);
        handleSearch(plotValues[0].split('&')[1]);      
      }
      initialPlotValues();
    }, []);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {

      setAnchorEl(event.currentTarget);
      toggleOpen();
      
      const data = await dispatch(get_plots());
      let plots = data.plots;

      let publickey = plots.map((x) => {
        return x["farmer_public_key"] + "&" + x["farmer_puzzle_hash"];
      });

      let plotValues: string[] = Array.from(new Set(publickey))
      plotValues = dealPlotCount(plotValues, plots)
      if (plotValues.length < 1) {
        plotValues = ["Can not detect any plot files&-&0"]
        setPlotValue("Can not detect any plot files&-&0")
      }
      setPlotValues(plotValues);
    };

    const handleClose = () => {
      setAnchorEl(null);
      toggleOpen();
    };

    function handleSelect(value: string) {
      toggleOpen();
      setPlotValue(value);

      handleSearch(value.split('&')[1]);
    }

    function dealPlotCount(plotValues: string[], plots: any) : string[] {
      let result: string[] = []
      for (let value of plotValues) {
        let farmer_public_key = value.split('&')[0]
        let count: number = 0

        for (let x of plots) {
          if (farmer_public_key == x["farmer_public_key"]) {
            count += 1
          }
        }

        let newValue = value + "&" + (count)
        result.push(newValue)
      }
      return result
    }


    //SearchResult
    //=========================================================================
    //=========================================================================
    const [searchResult, setSearchResult] = useState(" ")
    
    async function handleSearch(address: string) {
      setSearchResult(" ");
      stakeCoins = new Array()

      if (address.startsWith("-")) {
        return;
      }

      try {
        let puzzlehash = address_to_puzzle_hash(address)
        const data = await dispatch(get_coin_records_by_puzzle_hash(puzzlehash));
        if (data.success) {
          let result = dealSearchResult(data.coin_records)
          setSearchResult(result)
        } else {
          alert(data.error)
        }
      } catch (error) {
        alert(error)
      }
    }

    function dealSearchResult(records:any[]):string {
      var total: number = 0
      var temp = new Array()
      for(let record of records) {
        var amount: number = record.coin.amount  
        total += amount
        temp.push(record.coin)
      }
      stakeCoins = temp
      return "Staking Balance: " + total/1000000000000
    }


    //Stake
    //=========================================================================
    //=========================================================================
    type FormData = {
      amount: string;
    };

    const methods = useForm<FormData>({
        shouldUnregister: false,
        defaultValues: {
          amount: '',
        },
    });

    async function handleStake(values: FormData) {
      if (plotValue.startsWith("---")) {
        alert("Must select a farmer_public_key!!!");
        return;
      }

      let amount = values.amount.trim();
      if (!isNumeric(amount)) {
        alert("Please enter a valid numeric amount!!!");
        return;
      }

      const amountValue = Number.parseFloat(chia_to_mojo(amount));
      let address =  plotValue.split('&')[1];
      if (address.startsWith('0x') || address.startsWith('0X')) {
        address = address.slice(2);
      }

      //console.log(amountValue);
      //console.log(address);
      try {
        let result = await dispatch(send_transaction(1, amountValue, 0, address));
        console.log(result);
      } catch (error) {
        console.log("error")
        console.log(error)
      }

    }


    //Withdraw
    //=========================================================================
    //=========================================================================
    const wallet = useSelector((state: RootState) =>
      state.wallet_state.wallets?.find((item) => item.id === 1),
    );

    async function handleWithdraw() {
      if (!wallet) {
        console.log("get wallet failed");
        return;
      }

      var totalAmount: number = 0
      for(let record of stakeCoins) {
        var amount: number = record.amount  
        totalAmount += amount
      }

      const { address } = wallet;
      try {
        let puzzlehash = address_to_puzzle_hash(address)

        // console.log(stakeCoins);
        // console.log(totalAmount);
        // console.log(puzzlehash);

        let result = await dispatch(send_transaction_multi(stakeCoins, totalAmount, puzzlehash));
        if (result.success) {
          alert("success")
        } else {
          alert(result.error)
        }
      } catch (error) {
        alert(error)
      }
    }



    return (
        <Flex flexDirection="column" gap={3}>


          <Typography variant="body1" color="textSecondary">
          Please select your staking address and send SIT to it.
          </Typography>





          <Flex>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} endIcon={<ExpandMore />}>
              {plotValue.split('&')[0] + "(" + plotValue.split('&')[2] + ")"}
            </Button>

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
              {plotValues.map((item) => (
                <MenuItem
                  onClick={() => handleSelect(item)}
                  selected={item === plotValue}
                >
                  {item.split('&')[0] + "(" + item.split('&')[2] + ")"}
                </MenuItem>
              ))}
            </Menu>
          </Flex>




          <Typography variant="body1" color="textSecondary"  dangerouslySetInnerHTML={{__html: searchResult}}>
          </Typography>




          <Form methods={methods} onSubmit={handleStake}>
          <Paper elevation={0} variant="outlined">
              <Flex alignItems="center" gap={1}>
                <Box/>
                <StyledInputBase name="amount" placeholder='Stake Amount' fullWidth/>

                <Button variant="contained" color="primary" type="submit"> Stake </Button>
              </Flex>
          </Paper>          
          </Form>

          <Flex alignItems="center" justifyContent="flex-end" gap={1}>
          <Button variant="contained" color="primary" onClick={handleWithdraw}> Withdraw </Button>
          </Flex>

        </Flex>
    );
}