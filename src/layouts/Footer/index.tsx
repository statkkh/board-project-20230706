import React from 'react';
import './style.css';

//          component: 푸터 컴포넌트          //
export default function Footer() {

  //          render: 푸터 컴포넌트 렌더링         //
  return (
    <div id='footer'>
      <div className='footer-top'>
        <div className='footer-logo-box'>
          <div className='footer-logo-icon-box'>
            <div className='logo-light-icon'></div>
          </div>
          <div className='footer-logo-text'>{'Hoons Board'}</div>
        </div>
        <div className='footer-link-box'>
          <div className='email-link'>{'email@email.com'}</div>
          <div className='icon-button'>
            <div className='insta-icon'></div>
          </div>
          <div className='icon-button'>
            <div className='naver-blog-icon'></div>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='footer-copyright'>{'Copyright ⓒ 2022 Jukoyakki. All Right Reserved.'}</div>
      </div>
    </div>
  )
}
