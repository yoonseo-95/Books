import { createSlice } from "@reduxjs/toolkit";
import { MainBooks } from "../../types";
import { getMainBooks } from "../actions/mainBooksAction";


interface MainState {
  isLoading: boolean;
  isError: boolean;
  data: MainBooks[];
  error: string;
}

const initialState: MainState = {
  isLoading: false,
  isError: false,
  data: [],
  error: '',
}

const mainBooksSlice = createSlice({
  name: 'mainBooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getMainBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMainBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message || '';
      })
  }
})

export default mainBooksSlice.reducer;