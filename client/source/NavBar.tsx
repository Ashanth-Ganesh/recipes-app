// NavigationDrawer.tsx
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Home, Search, Kitchen, CalendarToday, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';



const NavBar = () => {
  const [open, setOpen] = useState(true);

  const drawerWidth = 240;
  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  const [selectedItem, setSelectedItem] = useState('Search Recipes');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 72,
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <IconButton onClick={toggleDrawer} sx={{ m: 1 }}>
        <MenuIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedItem === 'Home'}
            onClick={() => handleItemClick('Home')}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedItem === 'Search Recipes'}
            onClick={() => handleItemClick('Search Recipes')}
          >
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            {open && <ListItemText primary="Search Recipes" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedItem === 'My Kitchen'}
            onClick={() => handleItemClick('My Kitchen')}
          >
            <ListItemIcon>
              <Kitchen />
            </ListItemIcon>
            {open && <ListItemText primary="My Kitchen" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedItem === 'Schedule'}
            onClick={() => handleItemClick('Schedule')}
          >
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            {open && <ListItemText primary="Schedule" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavBar;
