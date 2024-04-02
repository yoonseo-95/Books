import React from 'react'
import { styled, keyframes } from 'styled-components';
import { BookData } from '../../types/index';
import { useDispatch, useSelector } from '../../redux/hooks';
import { addCart } from '../../redux/reducers/bookCartSlice';
import { BsCartPlusFill } from "react-icons/bs";


const CartButton:React.FC<BookData> = ({book}) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isCart = cart.some(b => b.title === book.title);

  const handleAddCart = () => {
    if(!isCart) {
      dispatch(addCart(book))
    }
  }

  return (
    <>
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
    </>
  )
}

export default CartButton;


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


