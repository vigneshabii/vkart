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

function App() {
  return (
    <Router>
    <div className="App">
    <HelmetProvider>
    <Header/>
    <div className='container container-fluid'>
    <ToastContainer theme='dark'/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/search/:keyword' element={<ProductSearch/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
    </Routes>
    </div>
    <Footer/>
    </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
