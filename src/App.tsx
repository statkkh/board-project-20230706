import './App.css';
import { Route, Routes } from 'react-router-dom';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import Main from 'views/Main';
import User from 'views/User';
import BoardUpdate from 'views/Board/Update';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import { useEffect } from 'react';
import axios from 'axios';


    // const response = await axios.get("http://localhost:4000");
// ! 

function App() {
  const  serverCheck = async () =>{
    const response = await axios.get("http://localhost:4000")
    console.log(response);
  }
  // !2번 작동 비동기로 처리 //
  // !  then : 함수 끝내고 작업 처리
  // ! 함수 작업을 끝내고 then으로 받음 //
  // ! data -> servercheck를 받음 //
  useEffect(()=>{
    serverCheck()
      .then((data)=>{ console.log(data);})
      .catch((error)=>{
        console.log(error.response.data);
      });
  },[]);
  
  return (
    <Routes>
      <Route element = {<Container/>}>
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={AUTH_PATH} element={<Authentication />} />
        <Route path={SEARCH_PATH(':word')} element={<Search />} />
        <Route path={BOARD_WRITE_PATH} element={<BoardWrite />} />
        <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
        <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        <Route path={USER_PATH(':searchEmail')} element={<User />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />        
      </Route>
    </Routes>  
  );
}

export default App;

// ! 네비게이션 설계
// ! 메인 화면 : '/' - Main
// ! 로그인 화면 + 회원가입 화면 : /auth - Authentication
// ! 검색 화면 : '/search/:word' - Search
// ! 게시물 상세 보기 화면 : '/board/detail/:boardNumber' - BoardDetail
// ! 게시물 작성 화면 : '/board/write' - BoardWrite
// ! 게시물 수정 화면 : '/board/update/:boardNumber' - BoardUpdate
// ! 유저 게시물 화면 : '/user/:email' - User