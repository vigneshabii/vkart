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
        },
        clearErrorSearch(state, action){
            return{
                ...state,
                error: null
            }
        }
    }
});

const {actions, reducer}  = ProductsSlice

export const {productsRequest, productsSuccess, productsFail, clearErrorSearch} = actions;

export default reducer;