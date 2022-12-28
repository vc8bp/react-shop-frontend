import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        quantity: 0,
    },
    reducers: {
        addProduct: (state) => {
            state.quantity += 1;
        },
        deleteProduct: (state) => {
            state.quantity -= 1;          
        },  
        setProduct: (state , action) => {
            state.quantity = action.payload;          
        },    

    }
})

export const { addProduct, deleteProduct, setProduct} = cartSlice.actions;
export default cartSlice.reducer;