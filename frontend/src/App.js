import './App.css';
import { Home } from './components/Home';
import { ProductDetail } from './components/products/ProductDetail'
import { Footer } from './components/layouts/Footer';
import Header from './components/layouts/Header';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ProductSearch } from './components/products/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import Store from './Store';
import { loadUser } from './actions/UserActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/router/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

function App() {

useEffect(()=>{
Store.dispatch(loadUser)  
},[loadUser])

  return (
    <Router>
    <div className="App">
    <HelmetProvider>
    <Header/>
    <div className='container container-fluid'>
    <ToastContainer theme='dark'/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/search/' element={<ProductSearch/>}/>
      <Route path='/search/:keyword' element={<ProductSearch/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
      <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
      <Route path='/password/forgot' element={<ForgotPassword/>}/>
      <Route path='/password/reset/:token' element={<ResetPassword/>}/>
    </Routes>
    </div>
    <Footer/>
    </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
