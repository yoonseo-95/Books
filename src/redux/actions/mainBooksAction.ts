import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MainBooks } from "../../types";

interface QueryType {
  query: string[];
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getMainBooks = createAsyncThunk<MainBooks[], QueryType>(
  'mainBooks/getMainBooks',
  async ({ query }, { rejectWithValue }) => {
    
    const API = process.env.NODE_ENV === 'production' ? "https://yoonseo-95.github.io/books/v1/search/book.json" : "/v1/search/book.json";

    try {
      const responses:any[] = [];

      for(const item of query) {
        const response = await axios.get(API, {
          params: {
            query: item,
            display: 10,
            start: 1,
            sort: 'sim'
          }
        });
        responses.push(response.data.items);
        await delay(1000);
      }

      const item: MainBooks[] = [].concat(...responses).map((item: any) => ({
        title: item.title || '',
        link: item.link || '',
        image: item.image || '',
        author: item.author || '',
        price: item.price || 0,
        discount: item.discount || 0,
        pubdate: item.pubdate,
        publisher : item.publisher,
        description : item.description
      }));


      return item;

    } catch (error: any) {
      if(error.response?.status === 429) {
        await delay(60000);
      }
      return rejectWithValue(error.message);
    }
  }
);