import { useState, KeyboardEvent, useRef, } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { useUserStore } from 'stores';
import { loginInfoMock } from 'mocks';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { LoginUser } from 'types';

export default function Authentication() {
    //          state: 로그인 유저 전역 상태          //
    const { user, setUser } = useUserStore();
    //          state: 쿠키 상태          //
    const [cookies, setCookie] = useCookies();    
    //          state: 화면 상태          //
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
    //          function: 네비게이트 함수            //
    const navigator = useNavigate();  

  //          component: sign in 카드 컴포넌트          //
  const SignInCard = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');
    //          state: 비밀번호 입력 요소 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //          state: 비밀번호 로그인 에러 상태          //
    const [error, setError] = useState<boolean>(false);

    //          event handler: 이메일 인풋 key down 이벤트 처리          //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }

    const onPasswordKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }

    //          event handler: 비밀번호 인풋 버튼 클릭 이벤트 처리        //    
    const onPasswordIconClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordType('password');
        setPasswordIcon('eye-off-icon');
      }
      if (passwordType === 'password') {
        setPasswordType('text');
        setPasswordIcon('eye-on-icon');
      }
    }      
    

    //          event handler: 로그인 버튼 클릭 이벤트 처리          // 
    const onSignInButtonClickHandler = () =>{
      const isSuccess  = email === loginInfoMock.email && password === loginInfoMock.password;
      if(!isSuccess){ 
        setError(true);
        return; 
      }
      setCookie('email', email, { path: '/' });      
      const user: LoginUser = { email, nickname: '주코야키', profileImage: null };
      setUser(user);
      navigator(MAIN_PATH);
    }   

    //          event handler: 회원가입 링크 클릭 이벤트 처리          //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up');
    }    

    return (
      <div className='auth-card'>
        <div className='auth-card-top' > 
          <div className='auth-card-title-box'>
            <div className='auth-card-title'>{'로그인'}</div>
          </div>
          <InputBox label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} setValue={setEmail}  onKeyDown={onEmailKeyDownHandler}/>
          <InputBox label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} setValue={setPassword} icon={passwordIcon} onKeyDown={onPasswordKeyDownHanlder}  onButtonClick={onPasswordIconClickHandler} />
        </div>
        <div className='auth-card-bottom'>
            { error && (
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>
                  {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
                </div>
              </div>
            )}
            <div className='auth-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
              <div className='auth-description-box' >
            <div className='auth-description'>{'신규 사용자이신가요? '} <span className='description-emphasis' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
          </div>
        </div>
      </div>
    );
  }

  //          component: sign up 카드 컴포넌트          //  
  const SignUpCard = () =>{
    return (<></>);
  }

  return(
    <div id='auth-wrapper'> 
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='jumbotron-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{'HOONS BOARD 입니다.'}</div>
            </div>
          </div>
        </div>
        { view === 'sign-in' &&  <SignInCard/>}
        { view === 'sign-in' &&  <SignUpCard/>}
      </div>
  </div>
  );

}
