import React, { Component } from 'react';
import CheckOutSummary from '../../components/orders/checkoutSummary/CheckOutSummary';
import { Route,Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

 class CheckOut extends Component {
     
     


    state = {
        ingredients: null,
        price:0
    }

    // componentWillMount() {
    //     console.log('cdsjnbjkjnk');
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredient = {};
    //    let price=0;
    //     for (let param of query.entries()) {
    //         if(param[0]=='price'){
    //             price=param[1]
    //         }
    //         else{
    //         ingredient[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredient, price:price });

    // }

    cancelCheckout = () => {
        this.props.history.goBack();
    }
    continueCheckout = () => {
        this.props.history.push('checkout/contact-data')
    }
    render() {
        let summary=<Redirect to='/'/>
        if (this.props.ings){
            const purchaseRedirect=this.props.purchased ? <Redirect to = '/' /> : null
            summary=(
                <div>
                    {purchaseRedirect}
                      <CheckOutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.cancelCheckout}
                    checkoutContinued={this.continueCheckout} />
                <Route path={this.props.match.path + '/contact-data'}
                component={ContactData}/>
                </div>
            )
        }
        return (
            summary
              
                //  {/* render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} */}
                  
        
        )
    }
}
const mapStateToProps=state=>{
    return{
    ings:state.burgerBuilder.ingredients,
    purchased:state.orders.purchased
    }
}


export default connect(mapStateToProps)( CheckOut)