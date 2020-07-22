import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
        <ToolBar isAuth={this.props.auth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer isAuth={this.props.auth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
    
<main className={classes.contents}>{this.props.children}</main>



</Aux>
        )
    }
    
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)