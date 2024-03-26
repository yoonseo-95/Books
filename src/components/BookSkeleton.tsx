import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

const BookSkeleton:React.FC = () => (
  <SkeletonWrap>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton width={200} height={240}/>
      <Skeleton height={20} width={200} style={{ marginTop: "20px" }}/>
      <Skeleton height={20} width={150} style={{ marginBottom: '10px', marginTop: "10px" }}/>
      <ButtonWrap>
        <Skeleton height={20} width={100}/>
        <Skeleton height={20} width={100}/>
      </ButtonWrap>
    </SkeletonDiv>
  </SkeletonWrap>
)
export default BookSkeleton;

const SkeletonWrap = styled.div`
max-width: 1380px;
margin: 0 auto;
display: flex;
gap: 36px;
`
const SkeletonDiv = styled.div`
padding: 40px 0;
`
const ButtonWrap = styled.div`
display: flex;
width: 200px;
gap: 15px;
`

