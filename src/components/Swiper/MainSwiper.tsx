import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { getMainBooks } from '../../redux/actions/mainBooksAction';
import {Autoplay, EffectCoverflow } from 'swiper/modules';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from '../../redux/hooks';
import { Link } from 'react-router-dom';


const MainSwiper:React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mainBooks)

  useEffect(() => {
    dispatch(getMainBooks({ query:[
      "고층 입원실의 갱스터 할머니", 
      "그리움을 요리하는 심야식당",
      "신간너에게 남은 시간 죽음의 디데이",
      "오고 있느냐, 봄",
      "멋진 인생을 위해 오십부터 해야 할 것들",
      "남의 시선에 아랑곳하지 않기"
    ]}));
  }, [dispatch]);

  return (
    <div>
      <SwiperWrap
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          425: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCoverflow]}
      >
        {data && data.length > 0 && data.map((item, index) => (
          <SwieperSlideWrap key={index}>
            <Link to={`/detail/${encodeURIComponent(item.title)}`}>
              <img src={item.image} alt={item.title}/>
            </Link>
          </SwieperSlideWrap>
        ))}
      </SwiperWrap>
    </div>
  )
}

export default MainSwiper;

const SwiperWrap = styled(Swiper)`
width: 100%;
margin-top: 40px;
.swiper-wrapper {
  overflow: revert;
  height: 400px;
}
@media screen and (max-width: 425px){
  margin-top: 0;
}
`
const SwieperSlideWrap = styled(SwiperSlide)`
display: flex;
justify-content: center;
align-items: center;
height: 371px;
overflow-y: hidden;
background: #fff;
box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;

& > a > img {
  display: block;
  width: 100%;
  object-fit: cover;
}

@media screen and (max-width: 1200px) and (min-width: 1024px){
  height: 18rem;
}
@media screen and (max-width: 1024px) and (min-width: 768px){
  height: 24rem;
}
@media screen and (max-width: 768px) and (min-width: 425px){
  height: 18rem;
}
@media screen and (max-width: 425px) and (min-width: 375px){
  height: 21rem;
  background: none;
  box-shadow: none;
  & > a >img {
    width: 60%;
    margin: auto;
    display: block;
  }
}
@media screen and (max-width: 375px) and (min-width: 320px){
  height: 22rem;
  background: none;
  box-shadow: none;
  & > a >img {
    width: 70%;
    margin: auto;
    display: block;
  }
}
@media screen and (max-width: 320px){
  height: 22rem;
  background: none;
  box-shadow: none;
  & > a >img {
    width: 70%;
    margin: auto;
    display: block;
  }
}
`