import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    items: JSON.parse(localStorage.getItem("cart")) ?? [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addCart(state, action){
            //Set State
            state.items = JSON.parse(localStorage.getItem("cart")) ?? [];

            //Find exist cart item
            const currentUser = localStorage.getItem('currentUser');          
            let existingCartItemIndex = -1;

            for(let index in state.items){
                if(state.items[index].id === action.payload.id && state.items[index].userId === currentUser._id){
                    existingCartItemIndex = index;
                }
            }

            //Update state cart items
            let updateItems;

            if(existingCartItemIndex !== -1){
                let existingCartItem = state.items[existingCartItemIndex];

                let updateItem = existingCartItem;
                updateItem.amount = updateItem.amount + action.payload.amount;
                updateItem.totalPrice = updateItem.totalPrice + action.payload.totalPrice;

                updateItems = state.items;
                updateItems[existingCartItemIndex] = updateItem;
                state.items = updateItems;
            }
            else{
                state.items.push(action.payload);
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        deleteCart(state, action){
            //Set State
            state.items = JSON.parse(localStorage.getItem("cart")) ?? [];

            //Check exsit cart item
            if(!state.items[action.payload.index]){
                alert("Cart item do not exist");
                return;
            }

            //Update State
            state.items.splice(action.payload.index, 1);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateCart(state, action){
            //Set State
            state.items = JSON.parse(localStorage.getItem("cart")) ?? []; 

            //Check exsit cart item
            if(!state.items[action.payload.index]){
                alert("Cart item do not exist");
                return;
            }

            //Update State
            state.items[action.payload.index].amount = state.items[action.payload.index].amount + action.payload.amount;
            if(action.payload.amount === 1 ){
                state.items[action.payload.index].totalPrice = state.items[action.payload.index].totalPrice + state.items[action.payload.index].price;
            }

            if(action.payload.amount === -1 ){
                state.items[action.payload.index].totalPrice = state.items[action.payload.index].totalPrice - state.items[action.payload.index].price;
            }

            if(state.items[action.payload.index].amount <= 0){
                state.items[action.payload.index].amount = 1;
                state.items[action.payload.index].totalPrice = state.items[action.payload.index].price;
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        reloadCart(state){
            state.items = JSON.parse(localStorage.getItem("cart")) ?? []; 
        }

    }
})

export default cartSlice;