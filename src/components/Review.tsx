import React, { useState } from 'react'
import { styled } from 'styled-components';
import { useSelector } from '../redux/hooks';
import ReviewItem from './ReviewItem';

export default function Review() {

  const review = useSelector((state) => state.review.review);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = review.filter((review) => {
    const {title, nickname} = review;
    return title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || nickname.toLowerCase().includes(searchQuery.toLowerCase());
  })

  return (
    <TableWrap>
      <h2>Review</h2>
      <SearchWrap>
        <input 
          type="search"
          placeholder="검색어를 입력하세요"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>검색</button>
      </SearchWrap>
      <TableContain>
        <Table>
          <thead>
            <tr>
              <th>책 이미지</th>
              <th>책 제목</th>
              <th>닉네임</th>
              <th>내용</th>
              <th>평점</th>
              <th>등록일</th>
              <th>수정 / 삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((item, index) => (
              <ReviewItem item={item} index={index} key={index}/>
            ))}
          </tbody>
        </Table>
      </TableContain>
    </TableWrap>
  )
}

const TableWrap = styled.div`
max-width: 1380px;
margin: 0 auto;
background: #fff;
padding: 20px;

@media screen and (max-width: 600px){
  margin-top: 60px;
}
`
const SearchWrap = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 10px;
padding-top: 50px;
padding-bottom: 20px;
  input {
    width: 200px;
    height: 35px;
    padding-left: 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #b4b4b4;
    
    &:placeholder {
      color: #b4b4b4;
    }
  }
  button {
    width: 80px;
    height: 35px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`
const TableContain = styled.div`
@media screen and (max-width: 930px){
  overflow: auto;
  max-height: 550px;
}
`
const Table = styled.table`
border: 1px solid #d3d3d3;
border-collapse: collapse;

@media screen and (max-width: 930px){
width: 930px;
height: 800px;
}

thead{
  border-top: 2px solid #bfbfbf;

  tr {
    border: 1px solid #d3d3d3;
    background: #eee;

    th {
      border: 1px solid #d3d3d3;
      height: 50px;

      @media screen and (max-width: 930px)  {
        font-size: 14px;
      }

      &:nth-of-type(1) {
        width: 110px;

        @media screen and (max-width: 1024px) and (min-width: 930px){
          width: 200px;
        }
      }

      &:nth-of-type(2) {
        width: 200px;
      }
      &:nth-of-type(3) {
        width: 80px;
      }
      &:nth-of-type(4) {
        width: 350px;
      }
      &:nth-of-type(5) {
        width: 156px;
      }
      &:nth-of-type(6) {
        width: 90px;
      }
      &:nth-of-type(7) {
        width: 120px;
      }
    }
  }
}
tbody {
  tr {
    td {
      padding: 10px;
      border: 1px solid #d3d3d3;

      @media screen and (max-width: 930px) {
        padding: 10px;
      }

      &:nth-of-type(1) {
        width: 110px;

        @media screen and (max-width: 1024px) and (min-width: 930px){
          width: 200px;
        }
        @media screen and (max-width: 930px){
          width: 200px;
        }
      }
      
      &:nth-of-type(2) {
        width: 200px;
        font-weight: bold;
        font-size: 15px;
        line-height: 22px;
      }
      &:nth-of-type(3) {
        width: 80px;
        text-align: center;
      }
      &:nth-of-type(4) {
        width: 350px;

        div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          svg {
            cursor:pointer;
            background: none;
            border:none;
            color: #c7c7c7;
            width: 35px;
            font-size: 18px;
          }
        }
      }
      &:nth-of-type(5) {
        width: 156px;
        color: #FFC610;

        div {
          display: flex;
          align-items: center;
          justify-content: center;
          
          .editStar {
            font-size: 20px;
            width: 28px;
            color: #eee;
            cursor: pointer;
          }

          .editIcon {
            cursor:pointer;
            background: none;
            border:none;
            color: #c7c7c7;
            width: 35px;
            font-size: 18px;
            margin-left: 10px;
          }
        }
      }
      &:nth-of-type(6) {
        width: 90px;
        font-size: 15px;
      }
      &:nth-of-type(7) {
        width: 100px;
      }
    }
  }
}
`
