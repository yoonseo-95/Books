import React from 'react'
import { useSelector, useDispatch } from '../redux/hooks';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { FiHeart, FiEdit3 } from "react-icons/fi";
import { addBookmark, removeBookmark } from '../redux/reducers/bookmarkSlice';

interface StyledIconProps {
  $isBookmarked: boolean | string;
}

export default function BookDetail() {
  const {title = ""} = useParams<{title:string}>();

  const books = useSelector((state) => state.books.data);
  const mainBooks = useSelector((state) => state.mainBooks.data);
  const rcmndBooks = useSelector((state) => state.rcmdBooks.data )

  const findBookByTitle = (title: string) => {
    let book = mainBooks.find((item) => item.title === title) || rcmndBooks.find((item) => item.title === title)
    if(!book) {
      book = books.find((item) => item.title === title);
    }
    return book;
  }

  const book = findBookByTitle(title);

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

  if(!book) {
    return <div>Book not found</div>
  } 

  const dispatch = useDispatch();
  const bookmark = useSelector((state) => state.bookmark.bookmark);

  const isBookmarked = bookmark.some(b => b.title === book.title);

  const toggleBookmark = () => {
    if(isBookmarked) {
      dispatch(removeBookmark(book.title));
      console.log("제거됨")
    } else {
      dispatch(addBookmark(book));
      console.log("추가됨")
    }
  }

  return (
    <DetailSection>
      <DetailImg>
        <img src={book.image} alt={book.title} />
      </DetailImg>
      <div>
        <DetailTitle>{book.title}</DetailTitle>
        <DetailTxt>
          <p>저자: {book.author}</p>
          <p>출판: {book.publisher}</p>
          <p>발행: {formatPubDate(book.pubdate)}</p>
        </DetailTxt>
        <DetailDescription>{book.description}</DetailDescription>
        {
          book.discount > "0" ? (
            <Price>{formatNumber(book.discount)}</Price>
          ) : book.price > "0" ? (
            <Price>{formatNumber(book.price)} <span>원</span></Price>
          ) : (
            <Price><span>SOLD OUT</span></Price>
          )
        }
        <IconUL>
          {
            book.discount > "0" ? (
              <IconLi>
                <Link to={book.link} target="_blank">
                  구매하러 가기
                </Link>
              </IconLi>
            ):book.price > "0"  ? (
              <IconLi>
                <Link to={book.link} target="_blank">
                  구매하러 가기
                </Link>
              </IconLi>
            ): (
              <OutLi>
                구매하러 가기
              </OutLi>
            )
          }
          <IconLi>
            <Link to="/">
              장바구니
            </Link>
          </IconLi>
          <Icons>
            <StyledIcon1 onClick={toggleBookmark} $isBookmarked={isBookmarked} />
          </Icons>
          <Icons>
            <Link to='/' >
              <FiEdit3 />
            </Link>
          </Icons>
        </IconUL>
      </div>
    </DetailSection>
  )
}
const DetailSection = styled.section`
max-width: 1380px;
height: 720px;
margin: 0 auto;
display: flex;
background: #fff;
padding: 30px;
@media screen and (max-width: 1024px) {
  height: 80vh;
  width: 100%;
  gap: 6rem;
}
@media screen and (max-width: 768px) {
flex-wrap: wrap;
gap: 0;
}
`
const DetailImg = styled.div`
width: 500px;
position: relative;
overflow-x: revert;

&::-webkit-scrollbar {
  width: 10px;
}
&::-webkit-scrollbar-thumb {
  height: auto;
  background: #797979;
  border-radius: 10px;
}
&::after {
  position: absolute;
  content: '';
  display: block;
  width: 300px;
  height: 300px;
  background: #f4f4f4;
  border-radius: 100%;
  top: 50px;
  left: 30px;
}

img {
  width: 65%;
  position: absolute;
  top: 30px;
  left: 67px;
  z-index: 1;
  box-shadow: 6px 4px 9px 1px #717171;
}
@media screen and (max-width: 1024px) {
  img {
    width: 227px;
  }
}

@media screen and (max-width: 768px) {
  width: 100%;
  height: 380px;

  img {
    width: 218px;
    top: 9%;
    left: 50%;
    margin-left: -106px;
  }

  &::after {
    width: 19rem;
    height: 19rem;
    left: 50%;
    margin-left: -150px;
    top: 10%;
  }
}
@media screen and (max-width: 375px) {
  width: 100%;
  height: 380px;

  img {
    width: 200px;
    top: 16%;
    left: 49%;
    margin-left: -93px;
  }

  &::after {
    width: 16rem;
    height: 16rem;
    left: 50%;
    margin-left: -128px;
    top: 21%;
  }
}
`
const DetailTitle = styled.h2`
margin-top: 30px;
@media screen and (max-width: 768px) {
  margin-top: 0;
  text-align:center;
}
`
const DetailTxt = styled.div`
display: flex;
margin: 20px 0;
p {
  width: 112px;
  color: #888;
  font-size: 13px;
}
@media screen and (max-width: 768px) {
  justify-content: center;
}
@media screen and (max-width: 375px) {
  flex-wrap: wrap;
  gap: 10px;
  text-align: center;
}
`
const DetailDescription = styled.p`
line-height: 32px;
font-size: 14px;
display: inline-block;
width: 95%;

@media screen and (max-width: 768px) {
  text-align:center;
  width: 100%;
}
`
const IconUL = styled.ul`
padding-top: 50px;
box-sizing:border-box;
display: flex;
align-items: center;
justify-content: flex-start;
gap: 20px;

@media screen and (max-width: 768px) {
  justify-content: center;
}
@media screen and (max-width: 375px) {
  flex-wrap: wrap;
}
`
const Icons = styled.li`
width: 25px;
font-size: 20px;
cursor:pointer;

a {
  display: block;
  margin-top: 5px;
}

`
const IconLi = styled.li`
width: 100px;
height: 30px;
font-size: 15px;
border-radius: 5px;
text-align: center;
line-height: 30px;
color: #212121;
border: 1px solid #6e6e6e;
overflow-y: hidden;
transition: 0.5s;
  a {margin-top: 0;}
  &:hover {
    color: #fff;
    background: #212121;
    border:1px solid #212121;
  }
`
const OutLi = styled.li`
width: 100px;
height: 30px;
cursor: pointer;
font-size: 15px;
border-radius: 5px;
line-height: 30px;
overflow-y: hidden;
color: #b8b8b8;
border: 1px solid #b8b8b8;
text-align: center;
`
const Price = styled.p`
font-size: 20px;
font-weight: bold;
margin-top: 20px;

@media screen and (max-width: 768px) {
text-align: center;
}
`
const StyledIcon1 = styled(FiHeart)<StyledIconProps>`
display: flex;
justify-content: center;
height: 23px;

path {
  stroke-width: 1.9px;
  fill: ${(props) => props.$isBookmarked ? "#ff1818" : "none"};
  color: ${(props) => props.$isBookmarked ? "#ff1818" : "none"};
}
`