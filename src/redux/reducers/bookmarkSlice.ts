import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types";

interface BookmarkState {
  bookmark: Book[];
}

const initialState: BookmarkState = {
  bookmark: [],
}

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Book>) => {
      const isBookmarked = state.bookmark.some(book => book.title === action.payload.title);
      if(!isBookmarked) {
        state.bookmark.push(action.payload);
        localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmark = state.bookmark.filter(book => book.title !== action.payload);
      localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
    }
  }
})

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;