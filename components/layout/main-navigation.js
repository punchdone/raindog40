import React, { useState } from 'react';
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/client';

// import { menuItems } from './menuData';
// import MenuItems from './MenuItems';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // const [session, loading] = useSession();

  // function logoutHandler() {
  //   signOut();
  // }

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
  };

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>RW</div>
        </a>
      </Link>
      <nav>
        <ul>
          <div>
            <Button 
              id="catalog-button"
              aria-controls={open4 ? 'catalog-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open4 ? 'true' : undefined}
              onClick={handleClick4}
            >
              Catalog
            </Button>
            <Menu
              id="catalog-menu"
              anchorEl={anchorEl4}
              open={open4}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'catalog-button',
              }}
            >
              <MenuItem onClick={handleClose}><Link href='/products'>Product Listing</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href='/products/catalog'>Product Catalog</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href='/products/new'>New Product</Link></MenuItem>
            </Menu>
          </div>
          <div>
            <Button 
              id="production-button"
              aria-controls={open3 ? 'production-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open3 ? 'true' : undefined}
              onClick={handleClick3}
            >
              Production
            </Button>
            <Menu
              id="production-menu"
              anchorEl={anchorEl3}
              open={open3}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'production-button',
              }}
            >
              <MenuItem onClick={handleClose}><Link href='/projects'>Production List</Link></MenuItem>
            </Menu>
          </div>
          <div>
            <Button 
              id="op-button"
              aria-controls={open ? 'op-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Order Processing
            </Button>
            <Menu
              id="op-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'op-button',
              }}
            >
              <MenuItem onClick={handleClose}><Link href='/projects/newWB'>New WB/DB Project</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href='/projects/newSummit'>New Summit Project</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href='/projects/orders'>OrderDrop</Link></MenuItem>
            </Menu>
          </div>
          <div>
            <Button 
              id="backorder-button"
              aria-controls={open2 ? 'backorder-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open2 ? 'true' : undefined}
              onClick={handleClick2}
            >
              Backorders
            </Button>
            <Menu
              id="backorder-menu"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'backorder-button',
              }}
            >
              <MenuItem onClick={handleClose}><Link href='/backorders/new'>Add Backorder</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href='/backorders'>Backorders</Link></MenuItem>
            </Menu>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
