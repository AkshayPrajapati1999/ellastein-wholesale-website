import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: [],
    total: 0,
    itemtotal:0,
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addToCart(state, action):any {
        //     state.cart =action.payload
        //     // const itemIndex = state.cart.findIndex(
        //     //     (item) => item.id === action.payload.id
        //     //   );
        //     //   // if (itemIndex >= 0) {
        //     //   //   state.cart[itemIndex].quantity += 1;
        //     //   // } else {
        //     //   //   const product = { ...action.payload, quantity: 1 };
        //     //   //   state.cart.push(product);
        //     //   // }
        
        //     //   localStorage.setItem("cart", JSON.stringify(state.cart));
        // },
        addAmount(state, action) {
            state.total = action.payload;
          },
        
    },

});
export const { addAmount } = cartSlice.actions
export default cartSlice.reducer;