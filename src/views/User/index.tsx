import  { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'stores';
import { usePagination } from 'hooks';
import {  BoardListItem } from 'types';

import Pagination from 'components/Pagination';
import { AUTH_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { getUserBoardListRequest, getUserRequest } from 'apis';
import { GetUserReponseDto } from 'apis/dto/response/user';
import ResponseDto from 'apis/dto/response';
import BoardItem from 'components/BoardItem';
import { GetUserBoardListResponseDto } from 'apis/dto/response/board';

//          component: 유저 페이지          //
export default function User() {

  //          state: 조회하는 유저 이메일 path variable 상태           //
  const { searchEmail } = useParams();
  //          state: 로그인 유저 정보 상태           //
  const { user } = useUserStore();
  //          state: 본인 여부 상태           //
  const [isMyPage, setMyPage] = useState<boolean>(false);
  //          function: 네비게이트 함수          //
  const navigator = useNavigate();

  //          component: 유저 정보 컴포넌트          //
  const UserInfo = () => {

    //          state: 프로필 이미지 input ref 상태           //
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //          state: 이메일 상태           //
    const [email, setEmail] = useState<string>('');
    //          state: 프로필 이미지 상태           //
    const [profileImage, setProfileImage] = useState<string | null>('');
    //          state: 닉네임 상태           //
    const [nickname, setNickname] = useState<string>('나는룬아니엘');
    //          state: 닉네임 변경 상태           //
    const [showChangeNickname, setShowChangeNickname] = useState<boolean>(false);

    //  function : get user response 처리 함수 
    const getUserResponse = ( responseBody : GetUserReponseDto | ResponseDto) => {
      const {code} = responseBody;
      if(code === 'NU') alert("존재하지 않는 유저입니다.");
      if(code === 'DBE') alert("데이터베이스 오류입니다."); 
      if(code !== 'SU'){
        navigator(MAIN_PATH);
        return;
      }      
      const {email, nickname, profileImage} = responseBody as GetUserReponseDto;
      setEmail(email);
      setNickname(nickname);
      setProfileImage(profileImage);
    }

    //          event handler: 프로필 이미지 클릭 이벤트 처리          //
    const onProfileImageClickHandler = () => {
      if (!isMyPage) return;
      if (!fileInputRef.current) return;
      fileInputRef.current.click();
    }
    //          event handler: 닉네임 변경 버튼 클릭 이벤트 처리          //
    const onChangeNicknameButtonClickHandler = () => {
      setShowChangeNickname(!showChangeNickname);
    }

    //          event handler: 프로필 이미지 변경 이벤트 처리          //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    };
    //          event handler: 닉네임 변경 이벤트 처리          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const nickname = event.target.value;
      setNickname(nickname);
    };

    //          effect: 조회하는 유저의 이메일이 변경될 때 마다 실행할 함수          //
    useEffect(() => {
      if(!searchEmail){
        navigator(MAIN_PATH);
        return;
      }
      getUserRequest(searchEmail).then(getUserResponse);
    }, [searchEmail]);

    //          render: 유저 정보 컴포넌트 렌더링          //
    return (
      <div id='user-info-wrapper'>
        <div className='user-info-container'>
          <div className={isMyPage ? 'user-info-profile-image-box-mypage' : 'user-info-profile-image-box'} onClick={onProfileImageClickHandler}>
            <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onProfileImageChangeHandler} />
            {profileImage === null ? (
            <div className='user-info-profile-default-image'>
              <div className='user-info-profile-icon-box'>
                <div className='image-box-white-icon'></div>
              </div>
            </div>
            ) : (
            <div className='user-info-profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div>
            )}
          </div>
          <div className='user-info-meta-box'>
            <div className='user-info-nickname-box'>
              {showChangeNickname ? (
              <input className='user-info-nickname-input' type='text' size={nickname.length + 1} value={nickname} onChange={onNicknameChangeHandler} />
              ) : (
              <div className='user-info-nickname'>{nickname}</div>
              )}
              {isMyPage && (
              <div className='icon-button' onClick={onChangeNicknameButtonClickHandler}>
                <div className='edit-light-icon'></div>
              </div>
              )}
            </div>
            <div className='user-info-email'>{email}</div>
          </div>
        </div>
      </div>
    );

  };

  //          component: 유저 게시물 컴포넌트          //
  const UserBoardList = () => {

    //          state: 페이지네이션 관련 상태          //
    const { currentPageNumber, setCurrentPageNumber, currentSectionNumber, setCurrentSectionNumber,
    viewBoardList, viewPageNumberList, totalSection, setBoardList } = usePagination<BoardListItem>(5);
    //          state: 게시물 개수 상태          //
    const [count, setCount] = useState<number>(0);
    // function :  get user board list response 처리 함수  //
    const getUserBoardResponse   = (responseBody : GetUserBoardListResponseDto | ResponseDto) =>{
      const {code} = responseBody;
      if(code ==='NU') alert('존재하지 않는 유저입니다.');
      if(code ==='DBE') alert('데이터 베이스 오류입니다.');
      if(code !=='SU'){
        navigator(MAIN_PATH);
        return;
      }

      const {userBoardList} =  responseBody as GetUserBoardListResponseDto;
      setBoardList(userBoardList);
      setCount(userBoardList.length)
    }
    //          event handler: 버튼 클릭 이벤트 처리          //
    const onButtonClickHandler = () => {
      if (!user) {
        alert('로그인이 필요합니다.');
        navigator(AUTH_PATH);
        return;
      }

      if (isMyPage) navigator(BOARD_WRITE_PATH);
      else navigator(USER_PATH(user.email));
    }

    //          effect: 조회하는 유저의 이메일이 변경될 때 마다 실행할 함수 //
    useEffect(() => {
      if(!searchEmail){
        navigator(MAIN_PATH);
        return;
      }
      getUserBoardListRequest(searchEmail).then(getUserBoardResponse);
    }, [searchEmail]);

    //          render: 유저 게시물 컴포넌트 렌더링          //
    return (
      <div id='user-board-wrapper'>
        <div className='user-board-container'>
          <div className='user-board-title-box'>
            <div className='user-board-title'>{'내 개시물 '}<span className='emphasis'>{count}</span></div>
          </div>
          <div className='user-board-contents-box'>
            {count === 0 ? (
            <div className='user-board-contents-nothing'>{'게시물이 없습니다.'}</div>
            ) : (
            <div className='user-board-contents-result-box'>
              {viewBoardList.map(boardItem => <BoardItem boardItem={boardItem} />)}
            </div>
            )}
            <div className='user-board-button-box' onClick={onButtonClickHandler}>
              <div className='user-board-button-contents'>
                {isMyPage ? (
                <>
                <div className='icon-box'>
                  <div className='edit-light-icon'></div>
                </div>
                <div className='user-board-button-text'>{'글쓰기'}</div>
                </>
                ) : (
                <>
                <div className='user-board-button-text'>{'내 게시물로 가기'}</div>
                <div className='icon-box'>
                  <div className='arrow-right-icon'></div>
                </div>
                </>
                )}
              </div>
            </div>
          </div>
          <div className='user-board-pagination-box'>
            {count !== 0 && (
            <Pagination 
              currentPageNumber={currentPageNumber}
              currentSectionNumber={currentSectionNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              setCurrentSectionNumber={setCurrentSectionNumber}
              viewPageNumberList={viewPageNumberList}
              totalSection={totalSection}
            />
            )}
          </div>
        </div>
      </div>
    );
  };

  //          effect: 조회하는 유저의 이메일이 변경될 때 마다 실행할 함수 //
  useEffect(() => {
    const isMyPage = searchEmail === user?.email;
    setMyPage(isMyPage);
  } , [searchEmail]);

  //          render: 유저 페이지 렌더링          //
  return (
    <>
      <UserInfo />
      <UserBoardList />
    </>
  )
}