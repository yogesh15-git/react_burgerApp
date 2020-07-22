import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'cheese',type:'cheese'},
    {label:'bacon',type:'bacon'},
    {label:'meat',type:'meat'},
    {label:'salad',type:'salad'},

]
const buildcontrols=(props)=>(
    <div className={classes.BuildControls}>
        <p>Burger Price:<strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl=>(
            <BuildControl
             key={ctrl.label}
              label={ctrl.label}
              added={()=> props.ingredientAdded(ctrl.type)}
              removed={()=>props.ingredientRemoved(ctrl.type)}
              disabled={props.disabled[ctrl.type]}/>
    
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.auth ? 'Order' : 'Signup First'}</button>
    </div>    
)


export default buildcontrols