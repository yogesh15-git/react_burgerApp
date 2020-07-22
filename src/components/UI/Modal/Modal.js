import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary';

class Modal extends Component{
    shouldComponentUpdate(prevProps, nextProps){
    return prevProps.show !== this.props.show || nextProps !== this.props; 

    }
    
    render(){
        return(
            <Aux>
        <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={classes.Modal}
        style={{
            opacity:this.props.show ? '1' : '0'
        }}>
            {this.props.children}
        </div>
        </div>
    </Aux>
        )
    }
    

    }
export default Modal
    