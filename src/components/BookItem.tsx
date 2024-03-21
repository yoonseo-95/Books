import React, { forwardRef } from 'react'
import { Book } from './../types/index';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHeart ,FiEdit3 } from "react-icons/fi";

interface BookData {
  book:Book;
}

const BookItem = React.memo(forwardRef<HTMLLIElement, BookData>(({ book }, ref) => {

  const formattedAuthors = book.author.split('^').join(', ');
  const formatPubDate = (pubdate: string): string => {
    const year = pubdate.slice(0, 4);
    const month = pubdate.slice(4,6);
    const day = pubdate.slice(6, 8);
    return `${year}.${month}.${day}`;
  }

  const formatNumber = (price: string) => {
    const numericPrice = Number(price);
    return new Intl.NumberFormat('ko-KR').format(numericPrice) + '원'
  }

  return (
    <BookLi ref={ref}>
      <BookDiv>
        <BookA to={`/detail/${encodeURIComponent(book.title)}`}>
          <BookImg src={book.image} alt={book.title} />
        </BookA>
      </BookDiv>
      <BookH2Link to={`/detail/${encodeURIComponent(book.title)}`}>
        <BookH2>{book.title}</BookH2>
      </BookH2Link>
      <BookPubData>{formatPubDate(book.pubdate)}</BookPubData>
      <BookAuthors><span>저자</span> {formattedAuthors}</BookAuthors>
      <BookPublisher><span>출판사</span> {book.publisher}</BookPublisher>
      {
        book.discount > "0" ? (
          <BookPrice>{formatNumber(book.discount)}</BookPrice>
        ) : book.price > "0" ? (
          <BookPrice>{formatNumber(book.price)} <span>원</span></BookPrice>
        ) : (
          <OutPrice><span>SOLD OUT</span></OutPrice>
        )
      }

      <BookButtonUl>
        {
          book.discount > "0" ? (
            <>
              <BookButton>
                <BookButtonLink href={book.link} target="_blank">
                  구매하기
                </BookButtonLink>
              </BookButton>
              <BookButton>
                <IConLink to="/">
                  장바구니
                </IConLink>
              </BookButton>
            </>
          ): book.price > "0" ? (
            <>
              <BookButton>
                <BookButtonLink href={book.link} target="_blank">
                  구매하기
                </BookButtonLink>
              </BookButton>
              <BookButton>
                <IConLink to="/">
                  장바구니
                </IConLink>
              </BookButton>
            </>
          ) : (
            <>
              <OutBookBtn>
                <OutBtn>구매하기</OutBtn>
              </OutBookBtn>
              <OutBookBtn>
                <IConLink to="/">
                  장바구니
                </IConLink>
              </OutBookBtn>
            </>
          )
        } 
        <BookButton>
          <StyledIcon1 />
        </BookButton>
        <BookButton>
          <IConLink to='/' >
            <StyledIcon2 />
          </IConLink>
        </BookButton>
      </BookButtonUl>
    </BookLi>
  );
}));

export default BookItem;

const BookLi = styled.li`
width: 200px;
transition: 0.5s;
@media screen and (max-width: 1024px) and (min-width:768px){
  width: 180px;
}
@media screen and (max-width: 768px) and (min-width:425px){
  width: 167px;
}
`
const BookDiv = styled.div`
background: #F8F8F8;
height: 240px;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
@media screen and (max-width: 768px) and (min-width:425px){
  height: 200px;
}
`
const BookA = styled(Link)`
display: block;
width: 100%;
height: 100%;
overflow: hidden;
`
const BookImg = styled.img`
width: 90%;
`
const BookH2 = styled.h2`
font-size: 15px;
margin-top: 20px;
margin-bottom: 10px;
text-overflow: ellipsis;
white-space: nowrap;
`
const BookH2Link = styled(Link)`
&:hover {
  text-decoration: underline;
}
`
const BookAuthors = styled.p`
margin-top: 10px;
margin-bottom: 5px;
color: #252525;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 13px;
span {
  color: #999999;
}
`
const BookPublisher = styled.p`
color: #252525;
margin-bottom: 5px;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 13px;
span {
  color: #999999;
}
`
const BookPubData = styled.p`
color: #252525;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 12px;
`
const BookPrice = styled.p`
font-weight: bold;
font-size: 18px;
margin: 12px 0;
@media screen and (max-width: 768px) and (min-width:425px){
  font-size: 17px;
}
`
const OutPrice = styled.p`
font-weight: bold;
font-family: 'Nanum Gothic', sans-serif;
font-size: 20px;
margin-bottom: 10px;
color: #b3b3b3;

@media screen and (max-width: 768px) and (min-width:425px){
  font-size: 17px;
}
`
const BookButtonUl = styled.ul`
display: flex;
gap: 10px;
align-items: center;
font-weight: bold;
`
const BookButtonLink = styled.a`
display: block;
width: 100%;
height: 100%;
`
const IConLink = styled(Link)`
display: block;
width: 100%;
height: 100%;
`
const BookButton = styled.li`
padding: 5px;
border: 2px solid #979797;
color: #979797;
font-size: 13px;
text-align: center;
border-radius: 5px;
transition: 0.5s;
cursor:pointer;

@media screen and (max-width: 1024px) and (min-width:768px){
  font-size: 12px;
}
@media screen and (max-width: 768px) and (min-width:425px){
  font-size: 10px;
}
&:nth-of-type(3) {
  height: 42px;
}
&:nth-of-type(4) {
  height: 42px;
}

&:hover {
  background: #0F0E0E;
  border: 2px solid #0F0E0E;
  color: #fff;
}
`
const OutBookBtn = styled.li`
padding: 5px;
border: 2px solid #b9b9b9;
color: #b9b9b9;
font-size: 13px;
text-align: center;
border-radius: 5px;
transition: 0.5s;
cursor:pointer;
`
const StyledIcon1 = styled(FiHeart)`
display: flex;
justify-content: center;
height: 23px;
padding-top: 4px;

path {
  stroke-width: 2.6px;
}

`
const StyledIcon2 = styled(FiEdit3)`
display: flex;
justify-content: center;
height: 23px;
padding-top: 4px;

path {
  stroke-width: 2.6px;
}
`
const OutBtn = styled.span`
`