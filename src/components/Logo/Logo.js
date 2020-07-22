import React from 'react';
import img from '../../assets/logo.png'
import classes from './Logo.module.css';

const Logo =(props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
<img src={img} alt="image gayab"/>
</div>
);
export default Logo
