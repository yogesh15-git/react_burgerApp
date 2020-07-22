import React, { Component } from 'react'
import Aux from '../../hoc/Auxilary';
import './BurgerBuilder.module.css';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Ordersummary from '../../components/burger/OrderSummary/OrderSummary';
import Axios from '../../axiox-order';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import Checkout from '../CheckOut/CheckOut';
import {Route} from 'react-router-dom';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';


const INGREDIENT_PRICE={
    salad:1,
    bacon:0.5,
    cheese:2,
    meat:2.5
}


class BurgerBuilder extends Component{

    state={
        // ingredients:null,
        totalPrice:2,
        purchasable:false,
        purchasing:false,
        
    }

    componentDidMount() {
        this.props.onInitIngredients()
        console.log(this.props);

        
        // Axios.get('https://my-burger-app-decfc.firebaseio.com/ingredients.json')
        // .then(res=>{
        //     // console.log(res,'get axios'); 
            
        //     this.setState({ingredients:res.data})
        // })
        // .catch(err=>{
        //     // console.log(err,'error')
        //     this.setState({error:err})
            
        // })
    }
    

    updatePurchaseState(ingredients){
    
        const sum =Object.keys(ingredients)
        .map(igKeys=>{
            return ingredients[igKeys];
        })
        .reduce((sum,el)=>{
            return sum + el
        },0)
        return(sum > 0);
    }
    
     addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
               
        const priceAddition=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        
     }


     removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return ;

        }
        const updatedCount=oldCount - 1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
     }
     
     purchaseHandler=()=>{
         if(this.props.auth){
            this.setState({purchasing:true})
         }
         this.props.history.push('/auth');
      
     }
     
     purchaseCancelHandler=()=>{
         this.setState({purchasing:false});
     }

     purchaseContinueHandler=()=>{
         this.props.onPurchaseInit();
         this.props.history.push('/checkout');
         
        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+ this.state.totalPrice);
        // const queryString=queryParams.join('&')
        //  this.props.history.push({
        //      pathname:"/checkout",
        //      search:'?' + queryString
        //  })


         
        //  alert('you continue');
        // this.setState({loading:true})
        // var order={
        //     customer:{
        //         Name:"Yogesh",
        //         Mobile:"9728595260",
        //         Address:"Kurukshetra"
        //     },
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice

        // }
        // Axios.post('/orders.json',order)
        // .then(res=>{
        //     this.setState({loading:false,purchasing:false});
        //     console.log(res);
            
        // })
        // .catch(err=>{
        //     this.setState({loading:false,purchasing:false});

        //     console.log(err);
            
        // })
     }       
    render(){
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let ordersummary= null;
        
        
        let burger= this.props.error?<p>ingredients can't be Loaded</p>:null
         
         if(this.props.ings){
             burger= ( <Aux>
             <Burger ingredients={this.props.ings}/>
        <BuildControls
        
         ingredientAdded={this.props.onIngredientAdded}
         ingredientRemoved={this.props.onIngredientRemoved}
         disabled={disabledInfo}
         price={this.props.pri}
         auth={this.props.token}
         purchasable={this.updatePurchaseState(this.props.ings)}
         ordered={this.purchaseHandler}/>
         </Aux>
             );
             ordersummary=<Ordersummary 
             ingredients={this.props.ings} click={this.BackdropHandler}
             purchaseCancelled={this.purchaseCancelHandler}
             purchaseContinue={this.purchaseContinueHandler}
             totalPrice={this.props.pri}/>;
         }


        return(
            <Aux>
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {ordersummary}

                    </Modal> 
                    {burger}
                        
            </Aux>
        )   
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        pri:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        token:state.auth.token!==null
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch(action.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(action.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(action.initIngredients()),
        onPurchaseInit:()=>dispatch(action.purchaseInit())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios)); 