import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../redux/hooks';
import { styled } from 'styled-components';
import { removeCart } from '../redux/reducers/bookCartSlice';
import { Link } from 'react-router-dom';
import BookmarkBtn from "./BookmarkBtn";
import { FiEdit3 } from "react-icons/fi";
import { formatNumber, formatPubDate, formattedAuthors } from './utils/formatUtils';
import { FaExclamationCircle } from "react-icons/fa";

const Cart:React.FC = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleRemoveClick = (title:string) => {
    dispatch(removeCart(title))
  }

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (title:string, isChecked: boolean) => {
    if(isChecked) {
      setSelectedItems([...selectedItems, title])
    }else {
      setSelectedItems(selectedItems.filter(item => item !== title))
    }
  }

  useEffect(() => {
    const total = selectedItems.reduce((accumulator, title) => {
      const item = cart.find(item => item.title === title);
      const price = item ? (item.discount > "0" ? parseInt(item.discount) : parseInt(item.price)) : 0;
      return accumulator + price;
    }, 0);
    setTotalPrice(total);
  }, [selectedItems, cart])

  return (
    <Ul>
      <CartTitle>장바구니</CartTitle>
      {cart.length === 0 && (
        <Not><span><FaExclamationCircle /></span>장바구니가 비었어요!</Not>
      )}
      {cart.map((item, index) => (
        <Li key={index}>
          <input type="checkbox" onChange={(e) => handleCheckboxChange(item.title, e.target.checked)}/>
          <ImgWrap>
            <img src={item.image} alt={item.title}/>
          </ImgWrap>
          <TextBox>
            <Title>{item.title}</Title>
            <BookWrap>
              <BookAuthors><span>저자: </span>{formattedAuthors(item.author)}</BookAuthors>
              <BookPublisher><span>출판사: </span>{item.publisher}</BookPublisher>
              <BookPubData>{formatPubDate(item.pubdate)}</BookPubData>
            </BookWrap>
            {
              item.discount > "0" ? (
                <BookPrice>{formatNumber(item.discount)}</BookPrice>
              ) : item.price > "0" ? (
                <BookPrice>{formatNumber(item.price)} <span>원</span></BookPrice>
              ) : (
                <OutPrice><span>SOLD OUT</span></OutPrice>
              )
            }
          </TextBox>
          <Description>{item.description}</Description>
          <ButtonUL>
            {
              item.discount > "0" ? (
                <>
                  <BookButton>
                    <BookButtonLink href={item.link} target="_blank">
                      구매하기
                    </BookButtonLink>
                  </BookButton>
                  <BookButton onClick={() => handleRemoveClick(item.title)}>
                    장바구니 삭제
                  </BookButton>
                </>
              ): item.price > "0" ? (
                <>
                  <BookButton>
                    <BookButtonLink href={item.link} target="_blank">
                      구매하기
                    </BookButtonLink>
                  </BookButton>
                  <BookButton onClick={() => handleRemoveClick(item.title)}>
                    장바구니 삭제
                  </BookButton>
                </>
              ) : (
                <>
                  <OutBookBtn>
                    <span>구매하기</span>
                  </OutBookBtn>
                  <OutBookBtn onClick={() => handleRemoveClick(item.title)}>
                      장바구니 삭제
                  </OutBookBtn>
                </>
              )
            }
            <Icons>
              <BookmarkBtn book={item} />
              <IConLink to='/' >
                <StyledIcon2 />
              </IConLink>
            </Icons>
          </ButtonUL>
        </Li>
      ))}

      <CountWrap>총 가격:&emsp;{formatNumber(totalPrice.toString())}</CountWrap>
    </Ul>
  )
}

export default Cart;

const Ul = styled.ul`
max-width: 1380px;
margin: 0 auto;
@media screen and (max-width: 1440px){
padding: 0 20px;
}
@media screen and (max-width: 600px){
padding-top: 70px;
}
`
const Not = styled.li`
text-align:center;
padding: 80px 0;
font-size: 18px;
color: #a1a1a1;

span {
  display: inline-block;
  font-size: 30px;
  margin-bottom: 6px;
}
`
const CartTitle = styled.li`
font-size: 23px;
font-weight: bold;
position: relative;
height: 40px;
overflow: hidden;
&::after {
  content:'';
  width: 100%;
  height: 2px;
  background: #888;
  position: absolute;
  bottom:0;
  left: 0;
}
@media screen and (max-width: 1024px){
  text-align: center;
}  
` 
const Li = styled.li`
width: 100%;
display:flex;
gap: 30px;
align-items: center;
flex-wrap: wrap;
padding: 40px 0;
position: relative;
&::after {
  display: block;
  content: '';
  width: 100%;
  height: 2px;
  background: #dfdfdf;
  position: absolute;
  bottom: 0;
}

input {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
@media screen and (max-width: 768px){
  justify-content: center;
  flex-direction: column;
}  
`
const ImgWrap = styled.div`
width: 138px;
height: 198px;
overflow: hidden;
background: #fff;
img {
  width: 100%;
  object-fit: cover;
}
@media screen and (max-width: 1024px){
  width: 126px;
  height: 190px;
}
@media screen and (max-width: 768px){
  width: 150px;
  height: 197px;
}
`
const TextBox = styled.div`
width: 26.7%;
@media screen and (max-width: 768px){
  width: 100%;
  text-align: center;
}  
`
const Title = styled.h3`
font-size: 17px;
line-height: 25px;
margin-bottom: 12px;

`
const BookPrice = styled.p`
font-weight: bold;
font-size: 18px;
margin: 24px 0;
@media screen and (max-width: 768px) and (min-width:425px){
  font-size: 17px;
}
`
const OutPrice = styled.p`
font-weight: bold;
font-family: 'Nanum Gothic', sans-serif;
font-size: 20px;
margin: 24px 0;
color: #b3b3b3;

@media screen and (max-width: 768px) and (min-width:425px){
  font-size: 17px;
}
`
const BookWrap = styled.div`
display: flex;
align-items: center;
`
const BookAuthors = styled.p`
color: #252525;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 13px;
span {
  color: #999999;
  margin-right: 10px;
}
`
const BookPublisher = styled.p`
color: #252525;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 13px;
span {
  color: #999999;
  margin-right: 10px;
}
`
const BookPubData = styled.p`
color: #252525;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 12px;
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
justify-content: center;
margin-bottom: 5px;

@media screen and (max-width: 1024px) and (min-width:768px){
  font-size: 14px;
}
@media screen and (max-width: 768px) and (min-width:425px){
  font-size: 14px;
  height: 30px;
}
@media screen and (max-width: 320px){
  width: 320px;
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
const Description = styled.p`
display: inline-block;
width: 638px;
text-overflow: ellipsis;
word-wrap: break-word;
height: 8em;
overflow: hidden;
color: #858585;
line-height: 1.6;
display: -webkit-box;
        -webkit-line-clamp: 5 ;
        -webkit-box-orient: vertical;

@media screen and (max-width: 1440px) and (min-width:1024px) {
  width: 36.6%;
}
@media screen and (max-width: 768px){
  width: 100%;
  text-align: center;
}  
`
const IConLink = styled(Link)`
display: block;
width: 100%;
height: 100%;
`
const BookButtonLink = styled.a`
display: block;
width: 100%;
height: 100%;
`
const ButtonUL = styled.ul`
width: 100px;

@media screen and (max-width: 768px){
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
} 
@media screen and (max-width: 320px){
  gap: 10px;
}
`
const StyledIcon2 = styled(FiEdit3)`
display: flex;
justify-content: center;
height: 23px;

path {
  stroke-width: 1.8px;
}
`
const Icons = styled.li`
display: flex;
align-items: center;
justify-content: center;
`

const CountWrap = styled.li`
padding: 30px 0;
margin-bottom: 110px;
background: #ececec;
border-bottom: 1px solid #dfdfdf;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
font-weight: bold;

@media screen and (max-width: 768px){
  margin-bottom: 50px;
}
`