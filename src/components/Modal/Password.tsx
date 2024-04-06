import React from 'react'
import { styled } from 'styled-components';

export default function Password() {
  return (
    <PwdWrap>
      <PwdForm>
      비밀번호
      </PwdForm>
    </PwdWrap>
  )
}

const PwdWrap = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
background: rgba(0,0,0,0.5);
`
const PwdForm = styled.form`
position: fixed;
top: 50%;
left: 50%;
width: 300px;
height: 100px;
background: #fff;
border: 1px solid red;
margin-left: -150px;
`