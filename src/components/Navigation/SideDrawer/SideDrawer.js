import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';


const SideDrawer =(props)=>{
    let attachedClasses=[classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open];
    }
    return( 
        <div>
            <BackDrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
        <Logo height="70%"/>
        </div>
        <nav>
            <NavigationItems auth={props.isAuth}/>
        </nav>
    </div>
    </div>
    ) 
}
export default SideDrawer