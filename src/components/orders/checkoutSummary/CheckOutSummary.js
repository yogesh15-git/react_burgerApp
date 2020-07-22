import React from 'react';
import classes from './CheckOutSummary.module.css';
import Burger from '../../burger/Burger';
import Button from '../../UI/Button/Button';


const CheckOutSummary =(props)=>{
    return(
        <div className={classes.CheckOutSummary}>
            <h1 className={classes.HeadingSpace}>Your Delicious Burger is Ready!</h1>
            <div style={{margin:'auto',width:'100%'}}>
            <Burger ingredients={props.ingredients} />
            </div>
            <Button
            btnType="Danger"
            clicked={props.checkoutCancelled}
            >Cancel
            </Button>
            <Button
            btnType="Success"
            clicked={props.checkoutContinued}
            >Continue
            </Button>
            
            
        </div>
    )

}

export default CheckOutSummary;