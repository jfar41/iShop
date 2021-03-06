import React, { Component } from 'react';
import './App.css';
import {logo} from '../../logo.svg';
import {Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';
//importing Switch allows us to make paths exclusive rather than inclusive
//Switch renders only first route that matches the location
//Route, Link, NavLink, Switch, & Redirect are all components

import AddProductPage from '../../pages/AddProductPage/AddProductPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import EditProductPage from '../../pages/EditProductPage/EditProductPage';
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage';
//Seller LOGIN and SIGN-IN
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import userService from "../../utils/userService";
import productService from "../../utils/productService";
import * as productAPI from '../../utils/productService';


class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      user: userService.getUser(),
    };
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

  handleUpdateProduct = async (updatedItemData) => {
    const updatedProduct = await productAPI.update(updatedItemData);
    //Using map to replace just the product that was updated
    const newProductsArray = this.state.products.map((p) =>
      p._id === updatedProduct._id ? updatedProduct : p
    );
    this.setState(
      {products: newProductsArray},
      //cb runs after update of state
      () => this.props.history.push("/")
    )
  }

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
  handleSignupOrLogin = async () => {
    this.setState({
      user: userService.getUser(),
      products: await productService.getAll()
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
          <img src="https://icon-library.com/images/shopping-cart-icon-vector/shopping-cart-icon-vector-23.jpg" className="App-logo"/>
          <h1 className="App-title">iShopMed</h1>
        </header>
          <nav className="menu">
            {this.state.user ? (
              <ul>
                <li>
                  <NavLink exact to="/">
                  YOUR PRODUCTS
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/add">
                    ADD PRODUCT
                  </NavLink>
                </li>
                <li>  
                  <Link to="" onClick={this.handleLogout} >
                    LOGOUT
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                <NavLink exact to="/login">
                  LOGIN
                </NavLink>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li>
                <NavLink exact to="/signup">
                  SIGN UP
                </NavLink>
                </li>
              </ul>
            )}
          </nav>
        <main>
          {this.state.user ? <h2>Welcome, {this.state.user.name}</h2> : <h2>You are not logged in!</h2>}
          <Switch>
            <Route exact path="/" render={()=> (
              userService.getUser() ?
              <ProductListPage
              user={this.state.user}
              products={this.state.products}
              handleDeleteProduct={this.handleDeleteProduct}
              />
              :
              <Redirect to ="/login" />
            )}/>
            <Route exact path="/add" render={() => (
              userService.getUser() ?
              <AddProductPage
              handleAddProduct={this.handleAddProduct} />
              :
              <Redirect to='/login' />
            )}/>
            <Route exact path="/edit" render={({location}) => (
              userService.getUser() ?
              <EditProductPage
              handleUpdateProduct={this.handleUpdateProduct}
              location = { location }
              /> 
              :
              <Redirect to="/login" />
            )}
            />
            <Route exact path="/details" render={({ location }) =>(
              userService.getUser() ?
              <ProductDetailPage location={location}/>
              :
              <Redirect to="/login" />
              )}
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
            <Redirect to="/login"/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
