import { createAsyncThunk } from "@reduxjs/toolkit";
import { PickBooks } from "../../types";
import axios from "axios";

interface QueryRcmdType {
  query: string[];
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getRcmdBooks = createAsyncThunk<PickBooks[], QueryRcmdType>(
  'rcmdBooks/getRcmdBooks', 
  async ({query}, {rejectWithValue}) =>{

    const PROXY = process.env.NODE_ENV === 'production' ? "https://yoonseo-95.github.io/books" : "";
    const URL = `${PROXY}/v1/search/book.json`;

    try {
      const responses:any[] = [];

      for(const item of query) {
        const response = await axios.get(URL, {
          params: {
            query: item,
            display: 10,
            start: 1,
            sort: 'date'
          }
        });
        responses.push(response.data.items);
        await delay(1000);
      }

      const item: PickBooks[] = [].concat(...responses).map((item: any) => ({
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
    }catch (error: any) {
      if(error.response?.status === 429) {
        await delay(60000);
      }
      return rejectWithValue(error.message);
    }
  }
)