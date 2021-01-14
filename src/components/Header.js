import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import {offLineSock} from '../socket/HomeSocket';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
}));

function Header(props) {

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN_NAME)) props.setAuth(false);  
  })

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };



    const handleClickMatch = (() => {
      props.history.push('/')
    })
    const handleClickUser = (() => {
      props.history.push('/ranking')
    })
    const handleClickHistory = () => {
      props.history.push('/history')
    }

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
        props.setAuth(false)
        offLineSock();
    }

    const handleProfile = () => {
        props.history.push('/user');
    }

    const titleApp = props.title;

    return (
    <div className={classes.root}>
      <CssBaseline />
      {props.auth && (
        <div> 
        <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        
          <Typography variant="h6" className={classes.title}>
              {titleApp}
          </Typography>
         
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Tài khoản</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key={'ranking'}>
              <ListItemIcon><InboxIcon /> </ListItemIcon>
              <ListItemText primary={'Ranking'} onClick={handleClickUser}/>
            </ListItem>
            <ListItem button key={'match'}>
              <ListItemIcon><MailIcon /> </ListItemIcon>
              <ListItemText primary={'Match'} onClick={handleClickMatch}/>
            </ListItem>
            <ListItem button key={'history'}>
              <ListItemIcon><MailIcon /> </ListItemIcon>
              <ListItemText primary={'History'} onClick={handleClickHistory}/>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
        </div>
      )}
    </div>
  );
}
export default withRouter(Header);