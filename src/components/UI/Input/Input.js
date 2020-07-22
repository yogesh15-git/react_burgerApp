import React from 'react';
import classes from './Input.module.css'
const Input=(props)=>{
    let inputElement=null;
    const inputClasses=[classes.InputElement];

    if(props.invalid && props.validation && props.touched){
        inputClasses.push(classes.Invalid)
    }
    // if (props.invalid && props.shouldValidate && props.touched) {
    //     inputClasses.push(classes.Invalid);
    // }

    switch(props.elementType){
        case('input'):
        inputElement=<input
         className={inputClasses.join(' ')}
          {...props.elementConfig}
           value={props.value}
         onChange={props.changed}  />;
        break;
        case('select'):
        inputElement=<select
         className={inputClasses.join(' ')}
          {...props.elementConfig}
           value={props.value}
          onChange={props.changed} >
               {props.elementConfig.options.map(option=>(
                   <option key={option.value} value={option.value}>{option.displayvalue}</option>
               ))}

           </select>;
        break;

        default:
            inputElement=<input 
            className={classes.InputElement} {...props.elementConfig}
            value={props.value}/>;
            
    }
    return(
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default Input;