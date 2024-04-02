import {Book} from "../../types";
import {v4 as uuidv4} from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookReviewState {
  id: string;
  review: Book[];
}

const initialState:BookReviewState = {
  id: uuidv4(),
  review: [],
}

const bookReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview: (state, action:PayloadAction<Book>) => {
      const isReviewed = state.review.some(book => book.title === action.payload.title);
      if(isReviewed) {
        state.review.push(action.payload);
        localStorage.setItem('review', JSON.stringify(state.review))
      }
    }
  }
})

export const {addReview} = bookReviewSlice.actions;
export default bookReviewSlice.reducer;