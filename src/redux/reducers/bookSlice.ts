import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types";
import { getSearchBooks } from "../actions/bookActions";

interface BookState {
  isLoading: boolean;
  isError: boolean;
  data: Book[]; 
  hasMore: boolean;
  query: string;
  error: string | null;
  success: boolean;
  pageNumber: number;
}

const initialState: BookState = {
  isLoading: false,
  isError: false,
  data: [],
  hasMore: false,
  query: '',
  error: null,
  success: false,
  pageNumber: 1,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    incrementPageNumber: (state) => {
      state.pageNumber += 1;
    },
    resetPageNumber: (state) => {
      state.pageNumber = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSearchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload.page === 1) {
          state.data = action.payload.items;
        }else {
          state.data = [...state.data, ...action.payload.items]
        }
        state.hasMore = action.payload.total > state.data.length;
        state.query = action.meta.arg.query;
        state.success = true;

      })
      .addCase(getSearchBooks.rejected, (state, action) => {
        state.isLoading =false;
        state.isError = true;
        state.error = action.payload as string;
      })
  }
})
export const { incrementPageNumber, resetPageNumber } = bookSlice.actions;
export default bookSlice.reducer;