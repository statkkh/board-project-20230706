import React from 'react';
import './style.css';

//          component: Input 상자 컴포넌트          //
export default function InputBox() {

  //          render: Input 상자 렌더링         //
  return (
    <div className='inputbox'>
      <div className='inputbox-label'>주소*</div>
      <div className='inputbox-container'>
        <input className='input' placeholder='우편번호 찾기' />
        <div className='icon-button'>
          <div className='right-arrow-icon'></div>
        </div>
      </div>
      <div className='inputbox-message'>우편번호를 선택해주세요.</div>
    </div>
  )
}
