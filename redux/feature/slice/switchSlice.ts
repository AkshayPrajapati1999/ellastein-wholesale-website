import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   isCheck : false,
};
const switchSlice = createSlice({
    name: "switch",
    initialState,
    reducers: {

        check(state, action) {
            state.isCheck = action.payload;
          },
        
    },

});
export const { check } = switchSlice.actions
export default switchSlice.reducer;