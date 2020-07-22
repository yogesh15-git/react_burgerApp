import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/spinner/spinner';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/orders/orders';
import Logout from './containers/Auth/logout';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/index';





class App extends Component {
  componentDidMount() {
    this.props.onAutoSignup();
  }
  render(){
    let routes=null;
    if(this.props.auth){
      routes=(
        <Layout>
        <Switch>
        <Route path="/checkout" component={CheckOut}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to='/'/>

  
        </Switch>
      </Layout>
      )
    }
    else{
      routes=(
        <Layout>
        <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>

  
        </Switch>
      </Layout>
      )
    }
  return (
  <div>
{routes}
  
    {/* <BrowserRouter>
    <Posts/>
    <PostData/>
    </BrowserRouter> */}
    
    
  </div>
  )}
}
const mapStateToProps=(state)=>{
  return{
    auth:state.auth.token!==null
  }
}

const mapDispatchToprops=(dispatch)=>{
  return{
    onAutoSignup:()=>dispatch(actionTypes.checkAuthStatus())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToprops)(App));
