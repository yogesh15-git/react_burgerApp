import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Drawertoggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar =(props)=>(
    <header className={classes.Toolbar}>
    {/* <div>MENU</div> */}
    <Drawertoggle clicked={props.drawerToggleClicked}/>
    <Logo/>
    <nav className={classes.DesktopOnly}>
        <NavigationItems auth={props.isAuth}/>
    </nav>
    </header>   
)
export default Toolbar