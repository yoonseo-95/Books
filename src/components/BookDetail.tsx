import React from 'react'
import { useSelector, useDispatch} from '../redux/hooks';
import { Link, useParams } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';
import { FiEdit3 } from "react-icons/fi";
import BookmarkBtn from './BookmarkBtn';
import { formatNumber, formatPubDate } from './utils/formatUtils';
import { BsCartPlusFill } from "react-icons/bs";
import { addCart } from '../redux/reducers/bookCartSlice';

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

  if(!book) {
    return <div>Book not found</div>
  } 

  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isCart = cart.some(b => b.title === book.title);

  const handleAddCart = () => {
    if(!isCart) {
      dispatch(addCart(book))
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
          {isCart && (
            <BookModal>
              <span><BsCartPlusFill /></span>
              <p>장바구니에 추가되었습니다.</p>
            </BookModal>
            )
          }
          <BookButton onClick={handleAddCart}>
            장바구니
          </BookButton>
          <Icons>
            <BookmarkBtn book={book} />
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
const fadeInOut = keyframes`
0{
  opacity: 0;
}
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`
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
@media screen and (max-width: 600px){
  margin-top: 61px;
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
@media screen and (max-width: 320px) {
  flex-direction: column;
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
width: 150px;
height: 30px;
font-size: 15px;
border-radius: 5px;
text-align: center;
line-height: 30px;
color: #212121;
border: 1px solid #6e6e6e;
overflow-y: hidden;
transition: 0.5s;
cursor: pointer;
  a {margin-top: 0;}
  &:hover {
    color: #fff;
    background: #212121;
    border:1px solid #212121;
  }
`
const OutLi = styled.li`
width: 150px;
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
const BookButton = styled.li`
width: 150px;
height: 30px;
font-size: 15px;
border-radius: 5px;
text-align: center;
line-height: 30px;
color: #212121;
border: 1px solid #6e6e6e;
overflow-y: hidden;
transition: 0.5s;
cursor: pointer;

&:hover {
  background: #0F0E0E;
  border: 2px solid #0F0E0E;
  color: #fff;
}
`
const BookModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 99999;
background: rgb(255,49,49,0.8);
width: 150px;
height: 150px;
border-radius: 15px;
padding: 20px;
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
animation: ${fadeInOut } 1.5s ease-in-out forwards;

span {
display: inline-block;
color: #fff;
font-size: 35px;
margin-bottom: 8px;
}
p {
  text-align: center;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
}
`