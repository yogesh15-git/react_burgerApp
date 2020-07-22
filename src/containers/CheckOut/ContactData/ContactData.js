import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axiox-order';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actionTypes from '../../../store/actions/index';
import {Redirect} from 'react-router-dom'

 class ContactData extends Component {
    
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name'
                },
                value:''
                ,
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },
                value:''
                ,
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your ZIPCODE'
                },
                value:''
                ,
                validation:{
                    require:true,
                    minLength:5,
                    MaxLength:8,
                    isNumeric:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your country'
                },
                value:''
                ,
                validation:{
                    require:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value:''
                ,
                validation:{
                    require:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            deliverymethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayvalue:'fastest'},
                        {value:'cheapest', displayvalue:'cheapest'}

                    ]
                },
                validation:{},
                value:'fastest',
                touched:false,
                valid:true
            }
        },
        formIsValid:false
    }



    orderHandler=(event)=>{
        event.preventDefault();
        const formData={}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
        }
        console.log(this.props );
          this.setState({loading:true})
        const order={
            
            ingredients:this.props.ings,
            TotalPrice:this.props.price.toFixed(2),
            orderData:formData,
            userId:this.props.userId

        }
        this.props.onOrderBurger(order,this.props.token);
                    // this.props.history.push('/')

        // Axios.post('/orders.json',order)
        // .then(res=>{
        //     this.setState({loading:false});
        //     this.props.history.push('/')
        //     console.log(res);
            
        // })
        // .catch(err=>{
        //     this.setState({loading:false});})
        
    }
    
    checkValidity=(value,rules)=>{
        let isValid=true;
        // if(!rules){
        //     return true
        // }
        if(rules.require){
            isValid=value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid
        }
        if(rules.MaxLength){
            isValid=value.length <=rules.MaxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        const updateOrderForm={...this.state.orderForm};
        const updatedFormElement={
            ...updateOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true
        updateOrderForm[inputIdentifier]=updatedFormElement;
        let formIsValid=true;
        for(let items in updateOrderForm){
            formIsValid=updateOrderForm[items].valid && formIsValid
        }
        console.log(updatedFormElement,'validation');
        
        this.setState({orderForm:updateOrderForm,formIsValid:formIsValid});
        
        
    }
    
    render() {
        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
       let form=(
            <form onSubmit={this.orderHandler}>         
            
            {formElementArray.map(formElement=>(
                
                    <Input key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                     value={formElement.config.value}
                     invalid={!formElement.config.valid}
                     validation={formElement.config.validation}
                     touched={formElement.config.touched}
                     changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                     />
                
            ))}
           
            <br></br>
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.props.loading){
            form=<Spinner/>
        }
        return (
            <div className={classes.ContactData}>
            <h2>Enter Your Details</h2>
           {form}
           </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return{
    onOrderBurger:(order,token)=>dispatch(actionTypes.purchaseBurger(order,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,Axios));