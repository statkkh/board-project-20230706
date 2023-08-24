import { useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';

export default function Authentication() {
  
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [passwordErrorMessage, setPassowrdErrorMessage] = useState<string>('비밀번호는 8자 이상 입력해주세요.');
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
  const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');

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

  return (
    <>
      <InputBox label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={emailError} value={email} setValue={setEmail} />
      <InputBox label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={passwordError} errorMessage={passwordErrorMessage} value={password} setValue={setPassword} icon={passwordIcon} onButtonClick={onPasswordIconClickHandler} />
    </>
  );
}
