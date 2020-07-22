import React, { Component } from 'react';
import Order from '../../components/orders/order';
import Axios from '../../axiox-order';
import withErrorHandler from '../../hoc/withErrorHandler';
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/spinner';

 class order extends Component {
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId)
        // Axios.get('/orders.json')
        // .then(res=>{
        //     const fetchOrders=[]
        //     for(let i in res.data){
        //         fetchOrders.push({
        //             ...res.data[i],
        //             id:i
        //         })
        //     }
        //     this.setState({loading:false,orders:fetchOrders})
            
            
        // })
        // .catch(err=>{
        //     console.log(err);
            
        // })
    }
    
    render() {
        let orders=<Spinner/>;
        if(!this.props.loading){
            orders=                
                this.props.orders.map(order=>(
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.TotalPrice}/>
                ))}
                
        
            
        
        return (
            <div>
                         {orders}

            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        orders:state.orders.orders,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=(Dispatch)=>{
    return{
        onFetchOrders:(token,userId)=>Dispatch(actions.fetchOrder(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(order,Axios));
