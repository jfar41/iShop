import React, { Component } from 'react';
import './App.css';
import {Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';
//importing Switch allows us to make paths exclusive rather than inclusive
//Switch renders only first route that matches the location
//Route, Link, NavLink, Switch, & Redirect are all components

import * as productAPI from '../../utils/productService';
import AddProductPage from '../../pages/AddProductPage/AddProductPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage';
// import EditProductPage from '../../pages/EditProductPage/EditProductPage';
//Seller LOGIN and SIGN-IN
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import userService from "../../utils/userService";


class App extends Component {
  state = {
    products: [],
    user: userService.getUser(),
  }


  /*--- Product CRUD ---*/
  handleAddProduct = async (newProductData) => {
    const newProduct = await productAPI.create(newProductData);
    this.setState(
      (state) => ({
        products: [...state.products, newProduct],
      }),
      //using callback to wait for state to update before rerouting
      () => this.props.history.push("/")
    );
  };

  handleDeleteProduct = async (id) => {
    await productAPI.deleteOne(id);
    this.setState(
      (state) => ({
        //filter returns the new new array
        products: state.products.filter((p) => p._id !== id),
      }),
      () => this.props.history.push("/")
    );
  };

  /*--- User Auth ---*/
  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser(),
    });
    console.log(this.state.user);
  };

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const products= await productAPI.getAll();
    this.setState({ products });
  }
  
  handleLogout = () => {
    userService.logout();
    this.setState({ user:null });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          iShop
          <nav>
            {this.state.user ? (
              <>
                <NavLink exact to="/">
                  Products Listed
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to="/add">
                  ADD ITEM
                </NavLink>
                &nbsp;&nbsp;&nbsp;    
                <Link to="" onClick={this.handleLogout} >
                  LOGOUT
                </Link>
                &nbsp;&nbsp;&nbsp;
              </>
            ) : (
              <>
                <NavLink exact to="/login">
                  LOGIN
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to="/signup">
                  SIGN UP
                </NavLink>
              </>
            )}
          </nav>
        </header>
        <main>
          {this.state.user ? <h2>Welcome, {this.state.user.name}</h2> : <h2>You are not logged in!</h2>}
          <Switch>
            <Route exact path="/" render={()=> (
              <ProductListPage
              user={this.state.user}
              products={this.state.products}
              handleDeleteProduct={this.handleDeleteProduct}
              />
            )}/>
            <Route exact path="/add" render={() => (
              <AddProductPage
              handleAddProduct={this.handleAddProduct} />
            )}/>
            <Route exact path="/details" render={({ location }) =>
              <ProductDetailPage location={location}/>}
            />
            <Route exact path = "/signup" render={({history})=>(
              <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}/>
            )}/>
            
            <Route exact path="/login" render={({ history }) => (
              <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
            )}/>
            <Redirect to="/"/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
