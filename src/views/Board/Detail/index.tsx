import React, { useEffect, useState } from 'react';
import './style.css';
import { useUserStore } from 'stores';
import { Board } from 'types';
import { boardMock } from 'mocks';
import { useParams } from 'react-router-dom';
import DefaultProfileImage from 'assets/default-profile-image.png';

//          component: 게시물 상세보기 페이지          //
export default function BoardDetail() {
  
  //          state: 게시물 번호 path variable 상태          //
  const { boardNumber } = useParams();  
  //          state: 로그인 유저 상태          //
  const { user } = useUserStore();
  
  //          component: 게시물 상세보기 상단 컴포넌트          //
  const BoardDetailTop = () => {
    //          state: 작성자 상태          //
    const [isWriter, setWriter] = useState<boolean>(false);
    //          state: more button 상태          //
    const [showMore, setShowMore] = useState<boolean>(false);
    //          state: 게시물 상태          //
    const [board, setBoard] = useState<Board | null>(null);

    //          event handler: more button 클릭 이벤트 처리          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }

    //          effect: 게시물 번호 path variable이 바뀔때 마다 게시물 불러오기          //
    useEffect(() => {
      setBoard(boardMock);
      if (!user) return;
      const isWriter = user.email === boardMock.writerEmail;
      setWriter(isWriter);
     }, [boardNumber]);
   
    return(
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{board?.title}</div>
          <div className='board-detail-sub-box'>
            <div className="board-detail-write-info-box">
              <div className= 'board-detail-writer-profile-image' style={{ backgroundImage: `url(${DefaultProfileImage})` }}></div>
              <div className= 'board-detail-writer-nickname' >{board?.nickname}</div>
              <div className="board-detail-info-divider">{'\|'}</div>
              <div className="board-detail-write-date">{board?.writeDatetime}</div>
            </div>
              {isWriter && (
              <div className='icon-button' onClick={onMoreButtonClickHandler}>
                <div className='more-icon'></div>
              </div>
              )}
              {showMore && (
              <div className='more-box'>
                <div className='more-update-button'>{'수정'}</div>
                <div className='divider'></div>
                <div className='more-delete-button'>{'삭제'}</div>
              </div>
              )}              
          </div>
        </div>  
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{board?.contents}</div>
          { board?.imageUrls.map(imageUrl => <img className='board-detail-main-image' src={imageUrl} />) }
        </div>
      </div>
    )

  };  
  
  //          component: 게시물 상세보기 하단 컴포넌트          //
  const BoardDetailBottom = () => {

    //          render: 게시물 상세보기 하단 컴포넌트 렌더링          //
    return (
      <div>

      </div>
    )
  };  

  return (
    <div  id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
