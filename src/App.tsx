import { useState } from 'react';
import './App.css';
import InputBox from 'components/InputBox';

function App() {

  const [email, setEmail] = useState<string>('');
  const [passowrd, setPassword] = useState<string>('');

  const onPasswordIconClickHandler = () => {

  }

  return (
    <>
      <InputBox label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} setValue={setEmail} />
      <InputBox label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요.' value={passowrd} setValue={setPassword} icon='eye-off-icon' onButtonClick={onPasswordIconClickHandler} />
    </>
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