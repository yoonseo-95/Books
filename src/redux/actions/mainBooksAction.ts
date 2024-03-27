import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MainBooks } from "../../types";

interface QueryType {
  query: string[];
}

export const getMainBooks = createAsyncThunk<MainBooks[], QueryType>(
  'mainBooks/getMainBooks',
  async ({ query }, { rejectWithValue }) => {
    
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/v1/search/book.json`;
    
    let allItems:any[] = [];
    for(const item of query) {
      try {
        const response = await axios.get(URL, {
          params: {
            query: item,
            display: 6,
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
      
    const item: MainBooks[] = allItems.map((item: any) => ({
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