// import '@/App.css';
import { Route, Switch } from 'react-router-dom'

import Login from '@/pages/Shop/Login'
import Home from '@/pages/Shop/Home'
import Category from '@/pages/Shop/Category'
import Shop from '@/pages/Shop/Shop'
import Checkout from '@/pages/Shop/Checkout'

import AdminLogin from '@/pages/Admin/Login'
import AdminHome from '@/pages/Admin/Dashboard/Home'
import Products from '@/pages/Admin/Product/Products'
import Product from '@/pages/Admin/Product/Product'
import AddProduct from '@/pages/Admin/Product/AddProduct'
import ProductDetail from '@/pages/Shop/ProductDetail'
import AddCategory from '@/pages/Admin/Category/AddCategory'
import Categories from '@/pages/Admin/Category/Categories'
import AdminCategory from '@/pages/Admin/Category/Category'
import CreateZone from '@/pages/Admin/Zones/CreateZone'
import Zones from '@/pages/Admin/Zones/Zones'
import Zone from '@/pages/Admin/Zones/Zone'
import Orders from '@/pages/Admin/Orders/Orders'
import Order from '@/pages/Admin/Orders/Order'
import Setting from '@/pages/Admin/Settings'
import NotFound from '@/pages/NotFound'
import Nav from '@/components/Layout/Nav'
import AdminNav from '@/components/Layout/AdminNav'
import { AdminContextProvider } from '@/store/Admin/admin-context';
import PrivateRoute from '@/components/Common/PrivateRoute'
import ContextPrivateRoute from '@/components/Common/ContextPrivateRoute'
import { UserContextProvider } from '@/store/User/user_context';
import { ProductsContextProvider } from '@/store/Admin/products-context';
import { OrdersContextProvider } from '@/store/Admin/orders-context';
import { ZonesContextProvider } from '@/store/Admin/zones-context';
import React from 'react';


const App: React.FC = () => {

  return (
    <div className="App  m-auto">
      <Switch>
        <Route path="/admin/:path?" >
          <AdminContextProvider>
            <AdminNav>
              <Switch>

                <ContextPrivateRoute path="/admin/products/create/" Provider={ProductsContextProvider} component={AddProduct} />
                <ContextPrivateRoute path="/admin/products/:slug" Provider={ProductsContextProvider} component={Product} />
                <ContextPrivateRoute path="/admin/products" Provider={ProductsContextProvider} component={Products} />

                <PrivateRoute path="/admin/category/create">  <AddCategory /> </PrivateRoute>
                <PrivateRoute  teRoute path="/admin/category/:id">  <AdminCategory /> </PrivateRoute>
                <PrivateRoute path="/admin/category">  <Categories /> </PrivateRoute>

                <ContextPrivateRoute path="/admin/zones/create" Provider={ZonesContextProvider} component={CreateZone} />
                <ContextPrivateRoute path="/admin/zones/:id" Provider={ZonesContextProvider} component={Zone} />
                <ContextPrivateRoute path="/admin/zones" Provider={ZonesContextProvider} component={Zones} />

                <ContextPrivateRoute path="/admin/orders/:id" Provider={OrdersContextProvider} component={Order} />
                <ContextPrivateRoute path="/admin/orders/" Provider={OrdersContextProvider} component={Orders} />

                <PrivateRoute path="/admin/dashboard">  <AdminHome /> </PrivateRoute>
                <PrivateRoute path="/admin/settings" ><Setting /> </PrivateRoute>

                <Route path="/admin/login">  <AdminLogin /> </Route>
              </Switch>
            </AdminNav>
          </AdminContextProvider>
        </Route>

        <Route >
          <UserContextProvider>
            <Nav>
              <Switch>
                <Route path='/category/:name' exact component={Category} />
                <Route path='/my-shop/' exact component={Shop} />
                <Route path='/checkout/' exact component={Checkout} />
                <Route path='/products/:slug' exact component={ProductDetail} />
                <Route path='/login' exact component={Login} />
                <Route path='/' exact component={Home} />
                
              </Switch>
            </Nav>
          </UserContextProvider>
        </Route>


        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
