import { createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false
    },
    reducers:{
        productsRequest(state, action){
            return {loading: true}
        },
        productsSuccess(state,action){
            return {
            loading:false,
            products: action.payload.products,
            productsCount : action.payload.count,
            resPerPage: action.payload.resPerPage,
            }
        },
        productsFail(state, action){
            return{
                loading:false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer}  = ProductsSlice

export const {productsRequest, productsSuccess, productsFail} = actions;

export default reducer;