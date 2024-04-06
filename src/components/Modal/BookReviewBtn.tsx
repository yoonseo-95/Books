import React, { useRef, useState } from 'react'
import { useDispatch, useSelector} from '../../redux/hooks';
import { BookData } from '../../types';
import { keyframes, styled } from 'styled-components';
import { CgClose } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { formatPubDate, formattedAuthors } from '../utils/formatUtils';
import { FaStar } from 'react-icons/fa';
import {addReview} from "../../redux/reducers/bookReviewSlice";
import { ReviewData } from '../../types/index';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { BiListCheck } from "react-icons/bi";


const BookReviewBtn:React.FC<BookData> = ({book}) => {
  const dispatch = useDispatch();

  const isReviewed = useSelector((state) => state.review.isReviewed);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const outSectionRef = useRef(null);

  const handleReviewModalOpen = () => {
    setShowReviewModal(true);
  }

  const SCOPE = [1,2,3,4,5];
  const [score, setScore] = useState(1);
  const [isActive, setIsActive] = useState(0);
  
  const [nickName, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [seePassword, setSeePassword] = useState(false);

  const [showReviewedMsg, setShowReviewedMsg] = useState(false);

  const seePasswordHandler = () => {
    setSeePassword(!seePassword)
  }

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()}`

  const handleAddReview = () => {
    const newReview:ReviewData = {
      ...book,
      score,
      textarea: textareaValue,
      nickname: nickName,
      password: password,
      date: formattedDate,
    }
    console.log(newReview)
    dispatch(addReview(newReview))
    setShowReviewedMsg(true);

    window.location.reload();
  }

  return (
    <>
      <FiEdit3 onClick={handleReviewModalOpen} />
      {showReviewModal && (
        <>
          <ReviewOutSection ref={outSectionRef} onClick={(e) => {
            if(outSectionRef.current === e.target) {
              setShowReviewModal(false)
            }
          }}>
          </ReviewOutSection>

          <ReviewWrap>
            {isReviewed && showReviewedMsg && <ReviewedP> <ReviewedIcon />등록을 완료했어요</ReviewedP>}

            <ReviewIconsUl>
              <li onClick={() => setShowReviewModal(false)}><ReviewCloseIcon aria-label="취소하기" /></li>
              <li onClick={handleAddReview}>완료</li>
            </ReviewIconsUl>
            <ReviewDataWrap>
              <ReviewImgWrap>
                <img src={book.image} alt={book.title} />
              </ReviewImgWrap>
              <div>
                <ReviewH2>{book.title}</ReviewH2>
                <ReviewAuthor>저자: {formattedAuthors(book.author)}</ReviewAuthor>
                <ReviewPublisher>출판: {book.publisher}</ReviewPublisher>
                <ReviewPubdate>발행: {formatPubDate(book.pubdate)}</ReviewPubdate>
              </div>
            </ReviewDataWrap>
            <ReviewScopeH3>평점을 선택해주세요</ReviewScopeH3>
            <ReviewScope>
              {SCOPE.map((el, index) => (
                <FaStar
                  key={index}
                  onMouseEnter={() => {
                    setScore(index + 1)
                    setIsActive(index);
                  }}
                  onClick={() => {
                    setScore(el);
                    setIsActive(index);
                  }}
                  style={{color: isActive >= index ? "#ffc610" : "" }}
                />
              ))}
            </ReviewScope>
            {score === 5 
              ? (<ScoreP>{score}점 <ScoreSpan>(강력 추천해요)</ScoreSpan></ScoreP>)
              : score === 4 ? (<ScoreP>{score}점 <ScoreSpan>(추천해요)</ScoreSpan></ScoreP>)
              : score === 3 ? (<ScoreP>{score}점 <ScoreSpan>(그저그래요)</ScoreSpan></ScoreP>)
              : score === 2 ? (<ScoreP>{score}점 <ScoreSpan>(아쉬워요)</ScoreSpan></ScoreP>)
              : (<ScoreP>{score}점 <ScoreSpan>(별로예요)</ScoreSpan></ScoreP>)
            }
            <ReviewNameWrap>
              <label htmlFor="name">닉네임</label>
              <input type="text" 
                id="name" 
                placeholder="닉네임 입력" 
                value={nickName}
                autoComplete="off"
                onChange={(e) => setNickname(e.target.value)}
              />
              <label htmlFor="password">비밀번호</label>
              <input
                type={seePassword ? "text" : "password"}
                id="password" 
                placeholder="비밀번호 입력"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {seePassword ? <SeePasswordIcon onClick={seePasswordHandler}/> : <NoSeePasswordIcon onClick={seePasswordHandler}/>}
            </ReviewNameWrap>
            <ReviewTextarea 
              name="review"
              placeholder="후기를 작성해주시면 다른 사용자에게 도움이 됩니다."
              value={textareaValue}
              autoComplete="off"
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </ReviewWrap>
        </>
      )}
    </>
  )
}

export default BookReviewBtn;

const ReviewedP = styled.p`
font-size: 15px;
display: flex;
color: #ff4242;
justify-content: center;
align-items: center;
font-weight: bold;
`
const ReviewedIcon = styled(BiListCheck)`
font-size: 26px;
color: #ff4242;
width: 35px;
`

const slideIn = keyframes`
50%{
  visibility: hidden;
  top: 150%;
}
100% {
  visibility: visible;
  top: 57.5%;
}
`
const ReviewOutSection = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
background: rgba(0,0,0,0.4);
z-index: 8888;
`
const ReviewWrap = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 99999;
width: 470px;
padding: 20px;
background: #fff;
border-radius: 8px;

@media screen and (max-width: 425px){
  width: 100%;
  top: 150%;
  visibility: hidden;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  animation: ${slideIn} 1.3s ease-in-out forwards;
}
`
const ReviewIconsUl = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom: 40px;
li {
  width: 38px;
  font-size: 18px;
  display: flex;
  color: #2c2c2c;
  cursor:pointer;
  font-weight: normal;
}
`
const ReviewCloseIcon = styled(CgClose)`
font-size: 24px;
`
const ReviewDataWrap = styled.div`
display: flex;
gap: 18px;
position: relative;
height: 150px;
overflow: hidden;
cursor: auto;
&:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #eeeeee;
  position: absolute;
  bottom: 0;
}
`
const ReviewImgWrap = styled.div`
width: 108px;
height: 95px;
overflow: hidden;
border-radius: 10px;

img {
  width: 100%;
}
`
const ReviewH2 = styled.h2`
font-size: 16px;
line-height: 22px;
margin-bottom: 9px;
text-align: left;
color: #000;
`
const ReviewAuthor = styled.p`
font-size: 13px;
color: #9c9c9c;
line-height: 22px;
text-align: left;
font-weight: normal;
`
const ReviewPublisher = styled.p`
font-size: 13px;
color: #9c9c9c;
line-height: 22px;
text-align: left;
font-weight: normal;
`
const ReviewPubdate = styled.p`
font-size: 13px;
color: #9c9c9c;
line-height: 22px;
text-align: left;
font-weight: normal;
`
const ReviewScopeH3 = styled.h3`
text-align: center;
font-size: 18px;
margin: 20px 0;
margin-top: 40px;
color: #000;
cursor: auto;
`
const ReviewScope = styled.div`
display: flex;
margin: 0 auto;
font-size: 34px;
width: 50%;
color: #F1F1F1;
margin-bottom: 20px;
`
const ScoreP = styled.p`
text-align:center;
font-size: 14px;
font-weight: bold;
color: #ff9d28;
margin-bottom: 30px;
`
const ScoreSpan = styled.span`
font-weight: normal;
`
const ReviewTextarea = styled.textarea`
resize: none;
padding: 15px;
font-size: 16px;
height: 200px;
margin-top: 20px;
outline: none;
border: 1px solid #d5d5d5;
border-radius: 10px;

&::placeholder {
  color: #d5d5d5;
}

@media screen and (max-width: 320px) {
  font-size: 14px;
}
`
const ReviewNameWrap = styled.div`
display: flex;
align-items: center;
gap: 10px;
position: relative;

label {
  font-size: 17px;
  width: 60px;
  color: #000;
  font-weight: normal;
  
  &:nth-of-type(2) {
    width: 78px;
  }
}
input{
  width: 160px;
  border: 1px solid #d5d5d5;
  outline: none;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  
  &::placeholder {
    color: #d5d5d5;
  }
}

@media screen and (max-width: 425px) and (min-width:375px){
  label {
    font-size: 15px;
  }
}
@media screen and (max-width: 375px) and (min-width:320px){
  gap: 12px;
  input {
    width: 135px;
  }
}
@media screen and (max-width: 320px){
  gap: 12px;
  flex-wrap: wrap;
  label {
    font-size: 15px;
  }
  input {
    font-size: 14px;
    width: 100%;
  }
}
`
const SeePasswordIcon = styled(IoMdEyeOff)`
position: absolute;
top: 4px;
right: 10px;
width: 17px;
font-size: 22px;
color: #aeaeae;
@media screen and (max-width: 320px){
  top: 101px;
  right: 16px;
}

`
const NoSeePasswordIcon = styled(IoMdEye)`
position: absolute;
top: 4px;
right: 10px;
width: 17px;
font-size: 22px;
color: #aeaeae;

@media screen and (max-width: 320px){
  top: 101px;
  right: 16px;
}
`