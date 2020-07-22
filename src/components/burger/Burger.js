import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom';




const burger=(props)=>{
    console.log(props.ingredients);
    
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
        console.log((props.ingredients))
        return[...Array(props.ingredients[igKey])].map((_, i)=>{
            // console.log(...Array(props.ingredients[igKey]));
            
            // console.log([...Array(props.ingredients)])
            // console.log(igKey,'i')
            // console.log(props.ingredients[igKey],'cnjkhbiu')

           return <BurgerIngredient key={igKey + i} type={igKey}/>
            });        
    })
    
    .reduce((igKey,el)=>{
      return igKey.concat(el)
    },[]);
    
    // console.log(...Array(props.ingredients[igKey]))
    console.log(transformedIngredients,'transformedingredients')
    if(transformedIngredients.length==0)
    transformedIngredients=<p>please add ingredients</p>

    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
            
        </div>
        
    )
}
export default withRouter(burger);