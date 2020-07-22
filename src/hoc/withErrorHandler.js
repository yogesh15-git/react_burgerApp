import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/Auxilary';


const withErrorHandler=(WrappedComponent,Axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentWillMount() {
        
            
           this.reqinterceptors= Axios.interceptors.request.use( request =>{
                this.setState({error:null});
                return request
            });

            this.resinterceptors=Axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
            
        }
        errorConfirmHandler=()=>{
            this.setState({error:null})
        }
        componentWillUnmount(){
            Axios.interceptors.request.eject(this.reqinterceptors);
            Axios.interceptors.response.eject(this.resinterceptors);
        }
        
        render(){
            
            return(
                <Aux>   
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message:null}
                    
                </Modal>
                <WrappedComponent {...this.props} />
          </Aux>
            )
        }
    }
}
export default withErrorHandler