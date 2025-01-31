import { configureStore } from "@reduxjs/toolkit";
import shopNameSlice from './features/shop/shopNameSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
export const makeStore = ()=>{
    return configureStore({
        reducer:{
            shopName:shopNameSlice
        }
    })
}
setupListeners(makeStore().dispatch);
