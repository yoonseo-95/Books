import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getSearchBooks = createAsyncThunk(
  'books/getSearchBooks',
  async ({ query, page, itemsPerPage }: { query: string; page: number; itemsPerPage:number; }, {rejectWithValue }) => {

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/v1/search/book.json`;

    try {
      const response = await axios.get(URL, {
        params: {
          query,
          display: itemsPerPage * page,
          start: (page -1) * itemsPerPage + 1,
        }
      });

      const {items} = response.data;
      const books = items.map((item: any) => {
        return {
          title: item.title || '',
          link: item.link || '',
          image: item.image || '',
          author: item.author || '',
          price: parseInt(item.price) || 0,
          discount: parseInt(item.discount) || 0,
          pubdate: item.pubdate,
          publisher : item.publisher,
          description : item.description
        }
      })
      const total = response.data.total;
      return { items, books, total, page  };

    } catch (error) {
      return rejectWithValue('An error occurred while searching for books');
    }
  }
);