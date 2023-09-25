import './App.css';
import { Route, Routes,useLocation } from 'react-router-dom';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import Main from 'views/Main';
import User from 'views/User';
import Authentication from 'views/Authentication';
import BoardUpdate from 'views/Board/Update';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import Search from 'views/Search';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/dto/response/user';
import ResponseDto from 'apis/dto/response';

// const response = await axios.get("http://localhost:4000");

function App() {
  // const  serverCheck = async () =>{
  //   const response = await axios.get("http://localhost:4000")
  //   console.log(response);
  // }
  // !2번 작동 비동기로 처리 //
  // !  then : 함수 끝내고 작업 처리
  // ! 함수 작업을 끝내고 then으로 받음 //
  // ! data -> servercheck를 받음 //
  // useEffect(()=>{
  //   serverCheck()
  //     .then((data)=>{ console.log(data);})
  //     .catch((error)=>{
  //       console.log(error.response.data);
  //     });
  // },[]);
  // description : 현재 쿠키 상태
  const [cookies, setCookies] = useCookies();
  // description : login user state //
  const { user, setUser} = useUserStore();
  // description : 현재 페이지 url 상태  ///
  const {pathname } = useLocation();

  //  description  get Sign in user response 처리 함수 // 
  const getSignInUserResponse = (responseBody : GetSignInUserResponseDto | ResponseDto) =>{
    const {code} = responseBody;
    if(code !== "SU"){
      setCookies('accessToken' ,'', {expires: new Date(), path : MAIN_PATH});
      setUser(null);
      return;
    }
    setUser({...responseBody } as GetSignInUserResponseDto);
  }

  // effect : 현재 path가 변경될 떄마다 실행될 함수  //
  useEffect( ()=>{
    const accessToken = cookies.accessToken;
    if(!accessToken){
      setUser(null);
      return;
    }    
    getSignInUserRequest(accessToken).then(getSignInUserResponse)
  },[pathname]);
  
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