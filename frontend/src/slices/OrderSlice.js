import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail :{},
        userOrders: [],
        loading:false
    },
    reducers:{ 
    createOrderRequest(state, action){
        return {
            ...state,
            loading: true
        }
    },
    createOrderSuccess(state, action){
        return {
            ...state,
            loading: false,
            orderDetail: action.payload.order
        }
    },
    createOrderFail(state, action){
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    clearOrderError(state,action){
        return {
            ...state,
            error:null
        }
    },
    userOrdersRequest(state, action){
        return {
            ...state,
            loading: true
        }
    },
    userOrdersSuccess(state, action){
        return {
            ...state,
            loading: false,
            userOrders: action.payload.order
        }
    },
    userOrdersFail(state, action){
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    orderDetailRequest(state, action){
        return {
            ...state,
            loading: true
        }
    },
    orderDetailSuccess(state, action){
        return {
            ...state,
            loading: false,
            orderDetail: action.payload.order
        }
    },
    orderDetailFail(state, action){
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    
    }
});
const {actions, reducer}  = OrderSlice

export const {
    createOrderFail,
    createOrderSuccess,
    createOrderRequest,
    clearOrderError,
    userOrdersFail,
    userOrdersSuccess,
    userOrdersRequest,
    orderDetailFail,
    orderDetailSuccess,
    orderDetailRequest,
} = actions;

export default reducer;