import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MainBooks } from "../../types";

interface QueryType {
  query: string[];
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const retryDelay = (attempt: number) => 1000 * Math.pow(2, attempt);

export const getMainBooks = createAsyncThunk<MainBooks[], QueryType>(
  'mainBooks/getMainBooks',
  async ({ query }, { rejectWithValue }) => {
    
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/v1/search/book.json`;
    
    async function ExponentialBackoff(item: string, attempt = 0): Promise<any> {
      try {
        const responses = await axios.get(URL, {
          params: {
            query: item,
            display: 10,
            start: 1,
            sort: 'sim'
          },
          headers: {
            "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET
          }
        })
        return responses;
      } catch (error: any) {
        if(error.response?.status === 429 && attempt < 3) {
          await delay(retryDelay(attempt));
          return ExponentialBackoff(item, attempt + 1);
        }
        throw error;
      }
    }
    try {
      const responses: any[] = [];
      for(const item of query) {
        const response = await ExponentialBackoff(item);
        response.push(response.data.items);
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
    }catch(error:any) {
      return rejectWithValue(error.message);
    }
  }
);