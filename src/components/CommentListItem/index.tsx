import React from 'react';
import './style.css';
import { CommentItem } from 'types';
import DefaultProfileImage from 'assets/default-profile-image.png';

//          interface: 댓글 리스트 아이템 컴포넌트 Props         //
interface Props {
  commentItem: CommentItem;
}

//          component: 댓글 리스트 아이템 컴포넌트          //
export default function CommentListItem({ commentItem }: Props) {

  //          state: Properties          //
  const { contents, writeDatetime, nickname, profileImageUrl } = commentItem;

  //          render: 댓글 리스트 아이템 컴포넌트 렌더링          //
  return (
    <div className='comment-list-item-box'>
      <div className='comment-list-item-top'>
        <div className='comment-list-item-profile-box'>
          <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImageUrl ? profileImageUrl : DefaultProfileImage})` }}></div>
        </div>
        <div className='comment-list-item-nickname'>{nickname}</div>
        <div className='comment-list-item-divider'>{'\|'}</div>
        <div className='comment-list-item-time'>{writeDatetime}</div>
      </div>
      <div className='comment-list-item-main'>
        <div className='comment-list-item-contents'>{contents}</div>
      </div>
    </div>
  )
}
