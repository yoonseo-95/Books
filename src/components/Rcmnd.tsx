import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '../redux/hooks';
import { styled } from 'styled-components';
import { getRcmdBooks } from '../redux/actions/rcmdBooksActions';
import { Link } from 'react-router-dom';
import { formatNumber } from './utils/formatUtils';

const Rcmnd:React.FC = () => {

  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.rcmdBooks);

  useEffect(() => {
    dispatch(getRcmdBooks({query: [
      "메리골드 마음 사진관",
      "아주 희미한 빛으로도",
      "철학은 날씨를 바꾼다",
      "블랙 쇼맨과 운명의 바퀴"
    ]}))
  }, [dispatch])

  return (
    <div>
      <StyledH2>MD Pick</StyledH2>
      <StyledUl>
        {data.map((item, index) => (
          <li key={index}>
            <Link to={`/detail/${encodeURIComponent(item.title)}`}>
              <img src={item.image} alt={item.title}/>
            </Link>
            <StyledTxt>
              <Link to={`/detail/${encodeURIComponent(item.title)}`}>
                <StyledTitle>{item.title}</StyledTitle>
              </Link>
              <p>저자 {item.author}</p>
              <span>{formatNumber(item.discount)}</span>
            </StyledTxt>
          </li>
        ))}
      </StyledUl>
    </div>
  )
}
export default Rcmnd;

const StyledUl = styled.ul`
display: flex;
margin-top: 20px;
justify-content: space-between;
flex-wrap: wrap;
li {
  width: 320px;
  height: 175px;
  display: flex;
  align-items: flex-start;
  overflow-y: hidden;
  a {
    display: block;
    width: 100%;
    img {
      width: 73%;
      display: block;
      object-fit: cover;
      overflow-y: hidden;

    }
  }
}

`
const StyledH2 = styled.h2`
font-size: 18px;
font-weight: bold;
@media screen and (max-width: 1024px){
  font-size: 24px;
}
`
const StyledTitle = styled.h2`
font-size: 18px;
font-weight: bold;
margin-bottom: 15px;

&:hover {
  text-decoration-line: underline;
}
@media screen and (max-width: 1024px) and (min-width: 768px){
  font-size: 16px;
}
@media screen and (max-width: 425px){
  font-size: 16px;
}
`
const StyledTxt = styled.div`
width: 340px;
p{
  color: #7f7f7f;
  @media screen and (max-width: 1024px) and (min-width: 768px){
    font-size: 15px;
  }
}
span {
  display: block;
  color: #000;
  font-weight: bold;
  margin-top: 20px;
  font-size: 17px;
}
`