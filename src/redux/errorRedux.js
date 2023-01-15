import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

const initialState = {
    error: null,
    id: null
}

const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
            state.id = uuid();
        },
        clearError: (state) => {
            state.error = null;
            state.id = null;
        }
    }
});

export const { setError, clearError } = errorsSlice.actions;
export default errorsSlice.reducer;