import React, { useState } from 'react'
import { useDispatch, useSelector } from '../redux/hooks';
import { FaPenToSquare } from "react-icons/fa6";
import { FaStar } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { styled } from 'styled-components';
import {removeReview, editReview} from "../redux/reducers/bookReviewSlice";
import { ReviewData } from '../types';

interface ReviewItemProps {
  item: ReviewData;
  index: number;
}

export default function ReviewItem({item, index}:ReviewItemProps) {

  const dispatch = useDispatch();
  const review = useSelector((state) => state.review.review);

  const [pwdValue, setPwdValue] = useState("");
  const [pwdModal, setPwdModal] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [ActiveIndex, setActiveIndex] = useState(0);
  const [IsBtnMode, setIsBtnMode] = useState(false);

  const seePasswordHandler = () => {
    setSeePassword(!seePassword)
  }
  
  const editBtnClick = (index:number) => {
    setPwdModal(!pwdModal);
    setActiveIndex(index);
    setIsBtnMode(false);
  }
  const deleteBtnClick = (index:number) => {
    setPwdModal(!pwdModal);
    setActiveIndex(index);
    setIsBtnMode(true)
  }
  const confirmClick = () => {
    const passwordToDelete = review[ActiveIndex].password;

    if(pwdValue === passwordToDelete) {
      if(IsBtnMode) {
        dispatch(removeReview(review[ActiveIndex].password))
      }else {
        dispatch(editReview({index:ActiveIndex, textarea: newTextarea, score: newScore }))
      }
      setPwdModal(false);
    }else {
      const correctPassword = review[ActiveIndex].password;
      alert(`비밀번호가 일치하지 않습니다. 추가시 작성했던 비밀번호는: ${correctPassword}`)
    }
  } 


  const [newTextarea, setNewTextarea] = useState("");
  const [newScore, setNewScore] = useState(0);

  const TextareaChangeHandler = (text:string) => {
    setNewTextarea(text)
  }

  const SCOPE = [1,2,3,4,5];
  const [isActive, setIsActive] = useState(0);

  const ScoreChangeHandler = (score:number) => {
    setNewScore(score);
  }

  return (
    <React.Fragment key={index}>
      <tr>
        <td><img src={item.image} alt={item.title}/></td>
        <td>{item.title}</td>
        <td> {item.nickname}</td>
        <td>
          <div>
            {newTextarea ? null : item.textarea}
            {newTextarea && (
              <NewTextarea
                name="review"
                value={newTextarea}
                autoComplete="off"
                onChange={(e) => setNewTextarea(e.target.value)}
              />
            )}
            <FaPenToSquare onClick={() => TextareaChangeHandler(item.textarea)}/>
          </div>
        </td>
        <td>
          <div>
            {newScore ? 
              SCOPE.map((el, index) => (
                <FaStar className='editStar'
                key={index}
                onMouseEnter={() => {
                  setNewScore(index + 1)
                  setIsActive(index);
                }}
                onClick={() => {
                  setNewScore(el);
                  setIsActive(index);
                }}
                style={{color: isActive >= index ? "#ffc610" : "" }}
              />
              )) : Array.from({length: item.score}, (_, i) => (
              <ScoreIcons key={i} />
            ))
            }
            <FaPenToSquare className="editIcon" onClick={() => ScoreChangeHandler(item.score)}/>
          </div>
        </td>
        <td>{item.date}</td>
        <td>
          <TableBtn onClick={() =>editBtnClick(index)}>수정</TableBtn>
          <TableBtn onClick={() =>deleteBtnClick(index)}>삭제</TableBtn>
        </td>
      </tr>
      {pwdModal && ActiveIndex === index && (
        <tr key={index}>
          <PwdTd colSpan={7} className="pwdModal">
            <span>※ 글 작성시 입력했던 비밀번호를 입력해주세요.</span>
            <label htmlFor="password">비밀번호</label>
            <input 
              type={seePassword ? "text" : "password"}
              id="password"
              placeholder='비밀번호 입력'
              autoComplete="off"
              value={pwdValue}
              onChange={(e) => setPwdValue(e.target.value)}
            />
            {seePassword ? <SeePasswordIcon onClick={seePasswordHandler}/> : <NoSeePasswordIcon onClick={seePasswordHandler}/>}
            <button onClick={confirmClick}>{IsBtnMode ? "삭제" : "수정"}</button>
          </PwdTd>
        </tr>
      )}
    </React.Fragment>

  )
}

const TableBtn = styled.button`
background: none;
border: 1px solid #9c9c9c;
border-radius: 5px;
padding: 5px;
cursor: pointer;
margin-bottom: 10px;
color: #000;
&:nth-of-type(2) {
  margin-bottom: 0;
}
`
const ScoreIcons = styled(FaStar)`
font-size: 20px;
width: 28px;

@media screen and (max-width: 768px) and (min-width: 425px){
  flex-wrap: wrap;
  font-size: 18px;
  width: 22px;
}
`
const PwdTd = styled.td`
height: 100px;
text-align: right;
position:relative;


span {
  text-align: right;
  display: block;
  font-size: 13px;
  margin-bottom: 10px;
}
label {
  font-weight: normal;
  margin-right: 10px;
  font-size: 15px;
}
input {
  padding-left: 10px;
  width: 150px;
  height: 30px;
  margin-right: 10px;
  font-size: 14px;
  outline: none;
}
button {
  width: 100px;
  height: 30px;
  cursor: pointer;
}

`
const SeePasswordIcon = styled(IoMdEyeOff)`
position: absolute;
top: 50px;
right: 129px;
width: 16px;
font-size: 20px;
color: #a4a4a4;
cursor:pointer;
`
const NoSeePasswordIcon = styled(IoMdEye)`
position: absolute;
top: 50px;
right: 129px;
width: 16px;
font-size: 20px;
color: #a4a4a4;
cursor:pointer;
`
const NewTextarea = styled.textarea`
padding: 10px;
font-size: 16px;
width: 400px;
height: 150px;
resize: none;

@media screen and (max-width: 1024px) and (min-width: 768px){
  width: 245px;
  height: 120px;
}

@media screen and (max-width: 768px) and (min-width: 425px){
  font-size: 14px;
  width: 180px;
  height: 100px;
}
@media screen and (max-width: 425px){
  font-size: 14px;
  width: 180px;
  height: 100px;
}
`
