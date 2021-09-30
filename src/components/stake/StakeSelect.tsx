import React, { useMemo, useState } from 'react';
import { useToggle } from 'react-use';
import { Button, Divider, Menu, MenuItem } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { useDispatch } from 'react-redux';
import { get_plots } from '../../modules/fullnodeMessages';


export default function StakeSelect() {
  const [defaultValue, setDefaultValue] = useState("--");
  const [values, setValues] = useState([" ", " "]);

  const dispatch = useDispatch();

  const [open, toggleOpen] = useToggle(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleOpen();
    
    const data = await dispatch(get_plots());
    let plots = data.plots;
    let publickey = plots.map((x) => {
      return x["farmer_public_key"];
    });
    setValues(Array.from(new Set(publickey)));
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleOpen();
  };

  function handleSelect(value: string) {
    toggleOpen();
    var sub = value.substring(0, 8);
    setDefaultValue(sub + "...");
  }


  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ExpandMore />}
      >
        {defaultValue}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {values.map((item) => (
          <MenuItem
            key={item}
            onClick={() => handleSelect(item)}
            selected={item === defaultValue}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
