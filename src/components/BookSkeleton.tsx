import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

const BookSkeleton:React.FC = () => (
  <>
    <SkeletonDiv>
      <SkeletonSpan width={200}/>
      <Skeleton height={22} width={200} style={{ marginTop: "19px" }}/>
      <Skeleton height={52} width={150} style={{ marginBottom: '12px', marginTop: "8px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px'}}/>
      <Skeleton height={42} width={200}/>
    </SkeletonDiv>
  </>
)
export default BookSkeleton;

const SkeletonDiv = styled.div`
width: 200px;
@media screen and (max-width: 1024px) and (min-width: 768px) {
  width: 11.5rem;
}
@media screen and (max-width: 768px) and (min-width: 425px) {
  width: 11.68rem;
}
@media screen and (max-width: 425px) and (min-width: 375px) {
  width: 11.9rem;
}
@media screen and (max-width: 375px) and (min-width: 320px) {
  width: 10.3rem;
}
@media screen and (max-width: 320px) {
  width: 8.6rem;
}
`
const SkeletonSpan = styled(Skeleton)`
height: 240px;
@media screen and (max-width: 375px) and (min-width: 320px) {
  height: 13rem;
  width: 100%;
}
@media screen and (max-width: 320px) {
  width: 100%;
  height: 12rem;
}
`

