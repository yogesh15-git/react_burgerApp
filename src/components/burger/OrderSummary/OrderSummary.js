import React,{Component} from 'react';
import Aux from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button';

class Ordersummary extends Component{
    componentWill
    
    
    componentWillUpdate(nextProps, nextState) {
        console.log('OS chlra khali');

    }
    
    
    
    render(){
        const ingredientsummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
                                   
        return(<li key={igKey}>{igKey} : {this.props.ingredients[igKey]}</li>);
        }) ;
        return(
            <Aux>
        
        
            <h3>Your Order</h3>
            <p>A delicious burger is Ready!!!</p>
    <ul>{ingredientsummary}</ul>
    <p><strong>Price: {this.props.totalPrice.toFixed(2)}$</strong></p>

    <p>Continue to checkout</p>
    
    <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
    <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
     </Aux>
        )
    }    
    };

    export default Ordersummary