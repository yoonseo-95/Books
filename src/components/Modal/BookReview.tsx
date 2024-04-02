import React from 'react'
import { styled } from 'styled-components';
import { CgClose } from "react-icons/cg";

export default function BookReview() {
  return (
    <ReviewWrap>
      <ReviewIconsUl>
        <li><ReviewCloseIcon aria-label="취소하기" /></li>
        <li>완료</li>
      </ReviewIconsUl>
    </ReviewWrap>
  )
}

const ReviewWrap = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 99999;
width: 550px;
padding: 20px;
background: #f5f5f5;
border-radius: 8px;

`
const ReviewIconsUl = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom: 20px;
li {
  width: 38px;
  font-size: 18px;
  display: flex;
  color: #2c2c2c;
  cursor:pointer;
}
`
const ReviewCloseIcon = styled(CgClose)`
font-size: 24px;
`