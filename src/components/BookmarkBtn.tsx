import React, { useState } from 'react'
import { useDispatch, useSelector } from '../redux/hooks';
import { addBookmark, removeBookmark } from '../redux/reducers/bookmarkSlice';
import { FiHeart } from "react-icons/fi";
import { BookData } from '../types/index';
import { styled, keyframes } from 'styled-components';
import { FaHeartCircleCheck, FaHeartCircleMinus } from "react-icons/fa6";


interface StyledIconProps {
  $isBookmarked: boolean | string;
}
interface ShowProps {
  $showModal :boolean | string;
}

const BookmarkBtn:React.FC<BookData> = ({book}) =>{
  const dispatch = useDispatch();
  const bookmark = useSelector((state) => state.bookmark.bookmark);
  const [showModal, setShowModal] = useState(false);
  const isBookmarked = bookmark.some(b => b.title === book.title);

  const toggleBookmark = () => {
    if(isBookmarked) {
      dispatch(removeBookmark(book.title));
      setShowModal(true);
    } else {
      dispatch(addBookmark(book));
      setShowModal(false);
    }
  }

  return (
    <>
      {isBookmarked ? (
        <BookmarkAddModal $showModal={showModal}>
          <span><FaHeartCircleCheck /></span>
          <p>찜 추가했어요</p>
        </BookmarkAddModal>
      ):(
        <BookmarkRemoveModal $showModal={showModal}>
          <span><FaHeartCircleMinus /></span>
          <p>찜 삭제했어요</p>
        </BookmarkRemoveModal>
      )}
      <StyledIcon1 onClick={toggleBookmark} $isBookmarked={isBookmarked}/>
    </>
  )
}

export default BookmarkBtn;

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

const StyledIcon1 = styled(FiHeart)<StyledIconProps>`
display: flex;
justify-content: center;
cursor:pointer;
path {
  stroke-width: 2.4px;
  fill: ${(props) => props.$isBookmarked ? "#ff1818" : "none"};
  color: ${(props) => props.$isBookmarked ? "#ff1818" : "none"};
}
`
const BookmarkAddModal = styled.div<ShowProps>`
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
visibility: ${(props) => props.$showModal ? "hidden": "visible"};
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
const BookmarkRemoveModal = styled.div<ShowProps>`
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
visibility: ${(props) => props.$showModal ? "visible": "hidden"};
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