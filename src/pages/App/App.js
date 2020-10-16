import React, { Component } from 'react';
import './App.css';
import {logo} from '../../logo.svg';
import {Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';
//importing Switch allows us to make paths exclusive rather than inclusive
//Switch renders only first route that matches the location
//Route, Link, NavLink, Switch, & Redirect are all components

import * as productAPI from '../../utils/productService';
import AddProductPage from '../../pages/AddProductPage/AddProductPage';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import EditProductPage from '../../pages/EditProductPage/EditProductPage';
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage';
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
          <img src="https://icon-library.com/images/shopping-cart-icon-vector/shopping-cart-icon-vector-23.jpg" className="App-logo"/>
          <h1 className="App-title">iShop</h1>
        </header>
          <nav className="menu">
            {this.state.user ? (
              <ul>
                <li>
                  <NavLink exact to="/">
                  Products Listed
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/add">
                    ADD ITEM
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
            <Route exact path="/edit" render={({location}) => (
              <EditProductPage
              handleUpdateProduct={this.handleUpdateProduct}
              location = { location }
              />
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
