import React from 'react';
import './style.css';

export default function BoardListItem() {
  return (
    <div className='board-list-item-card'>
      <div className='board-list-item-top'>
        
      </div>
      <div className='board-list-item-middle'>
        <div className='board-list-item-title'></div>
        <div className='board-list-item-contents'></div>
      </div>
      <div className='board-list-item-bottom'>
        <div className='board-list-item-counts'></div>
      </div>
    </div>
  )
}
