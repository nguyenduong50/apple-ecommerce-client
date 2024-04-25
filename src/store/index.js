import { configureStore } from '@reduxjs/toolkit';

import productPopupSlice from './product-popup';
import cartSlice from './cart';

const store = configureStore({
    reducer: {
        productPopup: productPopupSlice.reducer,
        cart: cartSlice.reducer
    }
});

const productPopupActions = productPopupSlice.actions;
const cartActions = cartSlice.actions;

export {productPopupActions, cartActions};
export default store;