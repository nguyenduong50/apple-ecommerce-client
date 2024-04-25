import { createSlice } from '@reduxjs/toolkit';

const initialProductPopupState = {
    productID: null,
    category: ""
}

const productPopupSlice = createSlice({
    name: 'productPopup',
    initialState: initialProductPopupState,
    reducers: {
        showPopup(state, action){
            state.productID = action.payload;
        },
        hidePopup(state){
            state.productID = null;
        }
    }
})

export default productPopupSlice;