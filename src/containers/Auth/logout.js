import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';


 class logout extends Component {
     componentDidMount() {
         this.props.onLogout();
     }
     
    render() {
        return (
            <div>
                             <Redirect to ="/"/>

            </div>
        )
    }
}
 const mapDispatchToProps=(dispatch)=>{
    return{
        onLogout:()=>dispatch(actionTypes.logout())
    }
}
export default connect(null,mapDispatchToProps)(logout);
