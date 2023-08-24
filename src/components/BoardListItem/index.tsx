import React from 'react';
import './style.css';
import DefaultProfileImage from 'assets/default-profile-image.png';

export default function BoardListItem() {
  return (
    <div className='board-list-item-card'>
      <div className='board-list-item-main-box'>
        <div className='board-list-item-top'>
          <div className='board-list-item-profile-box'>
            <div className='board-list-item-profile-image' style={{ backgroundImage: `url(${DefaultProfileImage})` }}></div>
          </div>
          <div className='board-list-item-write-box'>
            <div className='board-list-item-nickname'>판서펜</div>
            <div className='board-list-item-write-date'>2023. 08. 24.</div>
          </div>
        </div>
        <div className='board-list-item-middle'>
          <div className='board-list-item-title'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className='board-list-item-contents'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div className='board-list-item-bottom'>
          <div className='board-list-item-counts'>
            댓글 0 · 좋아요 0 · 조회수 0
          </div>
        </div>
      </div>
      <div className='board-list-item-image-box'>
        <div className='board-list-item-image'></div>
      </div>
    </div>
  )
}
