import React from 'react';
import './style.css';
// import DefaultProfileImage from 'assets/default-profile-image.png';
import DefaultProfileImage from "assets/default-profile-image.png";
import { BoardItem } from 'types';


//          interface: 게시물 리스트 아이템 컴포넌트 Props          //
interface Props {
  boardItem: BoardItem;
}

//          component: 게시물 리스트 아이템 컴포넌트          //
export default function BoardListItem({ boardItem }: Props) {

  //          state: Properties          //
  const { boardNumber, title, contents, imageUrl } = boardItem;
  const { viewCount, commentCount, favoriteCount } = boardItem;
  const { writeDatetime, nickname, profileImageUrl } = boardItem;

  //          event handler: Card Click 이벤트 처리 함수          //
  const onCardClickHandler = () => {
    // TODO: 카드 클릭 이벤트 처리 - 해당 게시물 번호 상세 페이지로 이동
    alert(boardNumber);
  }

  // TODO: 타이틀과 내용 초과 범위 처리
  //          render: 게시물 리스트 아이템 컴포넌트 렌더링         //
  return (
    <div className='board-list-item-card' onClick={onCardClickHandler}>
      <div className='board-list-item-main-box'>
        <div className='board-list-item-top'>
          <div className='board-list-item-profile-box'>
            <div className='board-list-item-profile-image' style={{ backgroundImage: `url(${profileImageUrl ? profileImageUrl : DefaultProfileImage})` }}></div>
          </div>
          <div className='board-list-item-write-box'>
            <div className='board-list-item-nickname'>{nickname}</div>
            <div className='board-list-item-write-date'>{writeDatetime}</div>
          </div>
        </div>
        <div className='board-list-item-middle'>
          <div className='board-list-item-title'>{title}</div>
          <div className='board-list-item-contents'>{contents}</div>
        </div>
        <div className='board-list-item-bottom'>
          <div className='board-list-item-counts'>
            {`댓글 ${commentCount} · 좋아요 ${favoriteCount} · 조회수 ${viewCount}`}
          </div>
        </div>
      </div>
      { imageUrl !== null && (
        <div className='board-list-item-image-box'>
          <div className='board-list-item-image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
        </div>
      ) }
    </div>
  )
}
