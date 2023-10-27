import React, { Fragment, useEffect, useState } from 'react'
import  MetaData  from './layouts/MetaData'
import { getProducts } from '../actions/ProductsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Product from './products/Product'
import { toast } from 'react-toastify'
import Pagination  from 'react-js-pagination'


export const Home = () => {

const dispatch = useDispatch();

const {products,loading,error, productsCount, resPerPage} = useSelector((state)=>state.productsState)
const [currentPage, setCurrentPage] = useState(1);
const setCurrentPageNo = (pageNo) =>{
  setCurrentPage(pageNo)
}

useEffect(()=>{
    if(error){
      return toast(error,{
        position:toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(getProducts(null, null, null, null, currentPage))
},[error, dispatch, currentPage])
  
  return (
    <Fragment>
    {loading ? <Loader></Loader>:
    <Fragment>
<MetaData title={'Buy best products '}/>
<h1 id="products_heading">Latest Products</h1>

<section id="products" className="container mt-5">
  <div className="row">
    {
    products && products.map(product =>(
      <Product col={3} key={product._id} product={product}/>
    ))  
    }
  </div>
</section>
{productsCount > 0 && productsCount > resPerPage ?
<div className='d-flex justify-content-center mt-5'>
<Pagination
    activePage={currentPage}
    onChange={setCurrentPageNo}
    totalItemsCount={productsCount}
    itemsCountPerPage={resPerPage}
    nextPageText={'Next'}
    prevPageText={'Previous'}
    firstPageText={'First'}
    lastPageText={'Last'}
    itemClass={'page-item'}
    linkClass={'page-link'}
    
/>
</div>:null}

    </Fragment>
    } 
    </Fragment>
    
  )
}
