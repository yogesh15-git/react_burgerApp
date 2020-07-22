import React from 'react';
import classes from './order.module.css';

const order=(props)=>{
    const ingredients=[];
    for(let ing in props.ingredients){
        ingredients.push({
            name:ing,
            amount:props.ingredients[ing]
        });
    }
    const ingredientsOutput=ingredients.map(item=>{
    return(<span
        style={{textTransform:'capitalize',
                display:'inline-block',
            margin:'0 8px',
        border:'2px solid grey',
    padding:'5px'   }}
        key={item.name}>{item.name}({item.amount})</span>)
    })
    return(
        <div className={classes.order}>
        <p>Ingredients:{ingredientsOutput}</p>
    <p>Price:<strong>USD:{props.price}</strong></p>
        {console.log(ingredients)}
        {console.log(props.ingredients)}
        {console.log(ingredientsOutput,'io')}
        </div>
    )
   
}
export default order;