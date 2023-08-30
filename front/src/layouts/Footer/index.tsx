import React from 'react';
import './style.css';



//          component: footer 컴포넌트          //
export default function Footer() {

  //          event handler: insta   아이콘 버튼 클릭 이벤트 처리        //
  const onInstaIconOnClickHandler =  () => {
    window.location.href = 'https://www.instagram.com'; 

  }
  
  //          event handler: naver 블로그 아이콘 버튼 클릭 이벤트 처리       //
  const onNaverBlogIconClickHander = () => {
    window.open('https://blog.naver.com');
  }

  //          render: footer  컴포넌트  랜더링       //
  return (
    <div id='footer'>
      <div className='footer-top'>
         <div className='footer-logo-box'>
            <div className='footer-logo-icon-box'>
              <div className='logo-write-icon'></div>
            </div>
            <div className='footer-logo-text'>{'My Board'}</div>
         </div>
         <div className='footer-link-box'>
            <div className='email-link'>{'email@gmail.com'}</div>
            <div className='icon-button' onClick={onInstaIconOnClickHandler}>
                <div className='insta-icon'></div>
            </div>
            <div className='icon-button'>
              <div className='naver-blog-icon' onClick={onNaverBlogIconClickHander}></div>
            </div>
         </div> 
      </div>

      <div className='footer-bottom'>
        <div className='footer-copyright'>{'Copyright ⓒ 2022 Jukoyakki. All Right Reserved.'}</div>
      </div>
      
    </div>
  )
}