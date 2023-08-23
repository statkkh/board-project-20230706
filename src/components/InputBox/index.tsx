import React from 'react';
import './style.css';

//          interface: Input 상자 컴포넌트 Props          //
interface Props {
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  icon?: string;
  errorMessage?: string;
  onButtonClick?: () => void;
}

//          component: Input 상자 컴포넌트          //
export default function InputBox(props: Props) {

  //          state: Properties          //
  const { label, type, placeholder, icon, errorMessage } = props;
  const { onButtonClick } = props;

  //          render: Input 상자 렌더링         //
  return (
    <div className='inputbox'>
      <div className='inputbox-label'>{label}</div>
      <div className={errorMessage ? 'inputbox-container-error' : 'inputbox-container'}>
        <input className='input' type={type} placeholder={placeholder} />
        { onButtonClick !== undefined && (
          <div className='icon-button' onClick={onButtonClick}>
            {icon}
            <div className='right-arrow-icon'></div>
          </div>
        ) }
      </div>
      <div className='inputbox-message'>{errorMessage}</div>
    </div>
  )
}
