import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types";

interface CartState {
  cart: Book[];
}

const initialState:CartState = {
  cart: [],
}

const bookCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action:PayloadAction<Book>) => {
      const isCart = state.cart.some(book => book.title === action.payload.title);
      if(!isCart) {
        state.cart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    removeCart: (state, action:PayloadAction<string>) => {
      state.cart = state.cart.filter(book => book.title !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }
})

export const {addCart, removeCart} = bookCartSlice.actions;
export default bookCartSlice.reducer;