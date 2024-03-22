import React from 'react';
import styled from 'styled-components';
import MainSwiper from '../../components/Swiper/MainSwiper';
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Rcmnd from '../../components/Rcmnd';

export default function Main() {
  return (
    <MainWrapper>
      <MainWrap>
        <MainText>
          <MainH2>화제의 신간</MainH2>
          <MainP>따끈따근한 신간을 지금 만나보세요.</MainP>
          <ButtonMore>
            <Link to='/'>
              더 많은 책 보기
              <span><FiArrowRight /></span>
            </Link>
          </ButtonMore>
        </MainText>
        <MainSwiper />
      </MainWrap>
      <MDWrap>
        <Rcmnd />
      </MDWrap>
    </MainWrapper>
  )
}

const MainWrapper = styled.main`
width: 100%;
height: 100%;
background: #f8f3ed;


position: relative;
z-index: 1;
&::after {
  top: 350px;
  position: absolute;
  content: '';
  display: block;
  width: 100%;
  height: 150px;
  background: #e1dad1;
  z-index: -1;
  left: 0;
}
@media screen and (max-width: 1350px){
  padding: 0 20px;
}

@media screen and (max-width: 1200px) and (min-width: 1024px){
  &::after {
    height: 100px;
    top: 359px;
  }
}
@media screen and (max-width: 600px) {
  margin-top: 50px;
}
@media screen and (max-width: 768px) and (min-width: 425px){
  &::after {
    top: 303px;
    height: 91px;
  }
}
@media screen and (max-width: 425px) and (min-width: 375px){
  &::after {
    top: 503px;
    height: 95px;
  }
}
@media screen and (max-width: 320px) {
  &::after {
    top: 503px;
    height: 102px;
  }
}
`;

const MainWrap = styled.div`
  max-width: 1380px;
  display: flex;
  align-items: center;
  gap: 50px;
  height: 500px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) and (min-width: 1024px){
    height: 502px;
  }

  @media screen and (max-width: 768px) and (min-width: 425px){
    height: 446px;
  }
  @media screen and (max-width: 425px){
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    height: 100%;
  }
`;

const MainText = styled.div`
  width: 50%;
  @media screen and (max-width: 425px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const MainH2 = styled.h2`
  font-size: 3.5rem;
  display: inline-block;
  margin-bottom: 25px;

  @media screen and (max-width: 1024px) and (min-width: 768px){
    font-size: 3.2rem;
  }
  @media screen and (max-width: 768px){
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
`;

const MainP = styled.p`
  font-size: 1.2rem;
  color: #474747;

  @media screen and (max-width: 1024px) and (min-width: 768px){
    font-size: 1.1rem;
  }
  @media screen and (max-width: 768px){
    font-size: 0.9rem;
  }
`;
const ButtonMore = styled.button`
width: 150px;
cursor: pointer;
overflow-y: hidden;
font-size: 15px;
background: none;
margin-top: 15px;
border: 1px solid #474747;
border-radius: 5px;
color: #474747;
a {
  transition: 0.5s;
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #474747;
    color: #fff;
  }

  >span {
    width: 28px;
    font-size: 18px;

    line-height: 2px;
  }
}
`

// MD

const MDWrap = styled.div`
max-width: 1380px;
margin: 0 auto;
height: 272px;
padding: 30px 0;
box-sizing: border-box;
overflow-y: hidden;

@media screen and (max-width: 1024px) {
  height: auto;
}
@media screen and (max-width: 768px) and (min-width: 425px) {
  padding: 0;
}
`