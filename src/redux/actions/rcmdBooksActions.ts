import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PickBooks } from "../../types";

interface QueryType {
  query: string[];
}

export const getRcmdBooks = createAsyncThunk<PickBooks[], QueryType>(
  'rcmdBooks/getRcmdBooks',
  async ({ query }, { rejectWithValue }) => {
    
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/v1/search/book.json`;
    
    let allItems:any[] = [];
    for(const item of query) {
      try {
        const response = await axios.get(URL, {
          params: {
            query: item,
            display: 4,
            start: 1,
            sort: 'sim'
          },
          headers: {
            "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET
          }
        })
        allItems = allItems.concat(response.data.items);
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
    const item: PickBooks[] = allItems.map((item: any) => ({
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

  }
);