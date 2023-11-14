import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productsReducer from './slices/ProductsSlice'
import productReducer from './slices/ProductSlice'
import authReducer from './slices/AuthSlice'
import cartReducer from './slices/CartSlice'
import orderRedcer from './slices/OrderSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderRedcer,
})

const Store = configureStore({
    reducer,
    middleware: [thunk]
})

export default Store;