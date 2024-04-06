import {ReviewData} from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookReviewState {
  review: ReviewData[];
  isReviewed:boolean;
}

const initialState:BookReviewState = {
  review: [],
  isReviewed: false,
}

const bookReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview: (state, action:PayloadAction<ReviewData>) => {
      state.review.push(action.payload);
      state.isReviewed = true;
      localStorage.setItem('review', JSON.stringify(state.review))
    },
    editReview: (state, action:PayloadAction<{index: number, textarea?: string, score: number}>) => {
      const {index, textarea, score} = action.payload;
      if (textarea !== undefined || score !== 0) {
        state.review[index] = {
          ...state.review[index],
          textarea: textarea !== undefined ? textarea : state.review[index].textarea,
          score : score !== 0 ? score : state.review[index].score,
        }
      }
      localStorage.setItem('review', JSON.stringify(state.review));
      window.location.reload();
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.review = state.review.filter(review  => review.password !== action.payload);
      localStorage.setItem('review', JSON.stringify(state.review));
    }
  }
})

export const {addReview, removeReview, editReview} = bookReviewSlice.actions;
export default bookReviewSlice.reducer;