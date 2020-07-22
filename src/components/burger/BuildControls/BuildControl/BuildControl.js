import React from 'react';
import classes from './BuildControl.module.css';


const buildcontrol=(props)=>(
<div className={classes.Label}>{props.label}
<button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
<button className={classes.More}onClick={props.added} >More</button>
</div>
)
export default buildcontrol