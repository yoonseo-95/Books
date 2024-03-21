import { PickBooks } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { getRcmdBooks } from "../actions/rcmdBooksActions";

interface rcmdBookState {
  isLoading: boolean;
  isError: boolean;
  data: PickBooks[];
  error: string;
}

const initialState:rcmdBookState = {
  isLoading: false,
  isError: false,
  data: [],
  error: '',
}

const rcmdBookSlice = createSlice({
  name: "rcmdBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRcmdBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRcmdBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getRcmdBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message || '';
      })
  }
})

export default rcmdBookSlice.reducer;