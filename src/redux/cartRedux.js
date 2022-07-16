import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        price:0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.price += action.payload.price * action.payload.quantity;
        },
        editProduct: (state, action) => {
            //const index = state.products.indexOf((p) => p._id === action.payload._id)
            state.products.push(action.payload);
            state.price += action.payload.price * action.payload.quantity;
        },
        deleteProduct: (state, action) => {
            const index = action.payload.index;
            state.products.splice(index, 1)
        }
    }
})

export const { addProduct, editProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;