import React, { useMemo } from 'react';
import { useToggle } from 'react-use';
import { Button, Divider, Menu, MenuItem } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

type Props = {
  defaultValue: string;
  values: string[];
};

export default function StakeSelect(props: Props) {
  const { defaultValue, values } = props;
  const [open, toggleOpen] = useToggle(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleOpen();
  };

  function handleSelect(value: string) {
    toggleOpen();
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
