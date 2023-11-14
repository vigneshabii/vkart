import axios from 'axios'
import { clearErrorSearch, productsFail, productsRequest, productsSuccess } from '../slices/ProductsSlice'
import { createReviewFail, createReviewRequest, createReviewSuccess, productFail, productRequest, productSuccess } from '../slices/ProductSlice'

export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) =>{
    try{
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;
        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category){
            link += `&category=${category}`
        }
        if(rating){
            link += `&ratings=${rating}`
        }
        console.log(link)
        const {data} =await axios.get(link)
        dispatch(productsSuccess(data))
    } catch (error){
        dispatch(productsFail(error.response.data.message))
    }
}

export const getProduct = id => async (dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} =await axios.get(`/api/v1/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error){
        dispatch(productFail(error.response.data.message))
    }
}

export const createReview = reviewData => async (dispatch) =>{
    try{
        dispatch(createReviewRequest())
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} =await axios.put(`/api/v1/review`,reviewData,config)
        dispatch(createReviewSuccess(data))
    } catch (error){
        dispatch(createReviewFail(error.response.data.message))
    }
}

export const clearSearchError = (dispatch) =>{
    dispatch(clearErrorSearch())
}