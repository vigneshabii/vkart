import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/ProductsSlice'

export const getProducts = async (dispatch) =>{
    try{    
        dispatch(productsRequest())
        const {data} = axios.get('/api/v1/products')
        dispatch(productsSuccess(data))
    } catch (err){
        dispatch(productsFail(err.response.data.message))
    }
}