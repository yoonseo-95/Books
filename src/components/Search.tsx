import React, { useCallback, useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from '../redux/hooks';
import { styled } from 'styled-components';
import { getSearchBooks } from '../redux/actions/bookActions'
import { useLocation } from 'react-router-dom';
import BookItem from './BookItem';
import { TbBookOff } from "react-icons/tb";
import BookSkeleton from './BookSkeleton';
import { incrementPageNumber, resetPageNumber } from '../redux/reducers/bookSlice';

const ITEMS_PER_PAGE = 13;

const Search:React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search).get('query') || '';

  const { data, isLoading, isError, hasMore, pageNumber} = useSelector((state) => state.books);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastBookElementRef = useCallback(
    (node:HTMLElement | null) => {
      if(isLoading || !hasMore) return;
      if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPageNumber());
        }
      });
      if(node) observer.current.observe(node);
  }, [isLoading, hasMore, dispatch])


  useEffect(() => {
    dispatch(resetPageNumber());
    dispatch(getSearchBooks({ query, page: 1, itemsPerPage: ITEMS_PER_PAGE}));
  }, [dispatch, query]);

  useEffect(() => {
    if (pageNumber > 1) {
      dispatch(getSearchBooks({ query, page: pageNumber , itemsPerPage:ITEMS_PER_PAGE}));
    }
  }, [dispatch, query, pageNumber]);

  return (
    <SectionWrap>
        <BookWrap>
          {!isLoading && isError && <p>검색 중 오류가 발생했습니다.</p>}
          {data && data.length === 0 && <Length><Icon><TbBookOff /></Icon>검색한 책이 없습니다.</Length>}

          <BookUl>
            {data.map((book, index) => {
              if(data.length === index) {
                return (
                  <Length key={index}>
                    <Icon><TbBookOff /></Icon>더 이상 콘텐츠가 없습니다.
                </Length>
                )
              }else {
                return <BookItem key={index} ref={lastBookElementRef} book={book}/>
              }
            })}
          </BookUl>
          {isLoading && <BookSkeleton />}
        </BookWrap>

    </SectionWrap>
  )
}

export default Search;

const SectionWrap = styled.section`
width: 100%;
background: #f8f3ed;
padding: 20px 0;

@media screen and (max-width: 598px){
padding: 60px 0;
}
`
const BookWrap = styled.div`
max-width: 1380px;
margin: 0 auto;

@media screen and (max-width: 1350px){
  width: 100%;
  padding: 0 20px;
}
`
const BookUl = styled.ul`
display: flex;
gap: 36px;
flex-wrap: wrap;
@media screen and (max-width: 1024px){
  gap: 20px;
  justify-content: center;
}
`
const Length = styled.p`
text-align: center;
padding-top: 100px;
font-size: 20px;
color: #888;
display: block;
`
const Icon = styled.span`
font-size: 35px;
color: #888;
margin-bottom: 20px;
`