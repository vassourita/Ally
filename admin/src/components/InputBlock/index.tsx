import React, {MouseEvent, InputHTMLAttributes} from 'react';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import styled from 'styled-components';

interface IError {
  cond: boolean;
  text: string;
}

interface IProps extends InputHTMLAttributes<any> {
  id?: string;
  label?: string;
  errors?: IError[];
  isPass?: boolean;
  type?: string;
  value?: any;
}

const InputBlock: React.FC<IProps> = ({ id, label, errors = [], isPass, type = 'text', value, ...rest }) => {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = (e: MouseEvent) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  function getType() {
    if (!isPass) return type;
    if (passwordShown) return 'text';
    return 'password';
  }

  function getErrors() {
    for (const error of errors) {
      if (error.cond)
        return (
          <>
            {error.text} <FiAlertCircle size={13} />
          </>
        );
    }
  }

  return (
    <Container className="input-block">
      <InputContainer>
        <input id={id} value={value || ''} type={getType()} {...rest} />
        {isPass &&
          (passwordShown ? (
            <FiEyeOff size="20" color="#777" onClick={togglePasswordVisiblity} />
          ) : (
            <FiEye size="20" color="#777" onClick={togglePasswordVisiblity} />
          ))}
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
      </InputContainer>
      <span>{getErrors()}</span>
    </Container>
  );
}

const Container = styled.div`
  margin: 35px 0;
  position: relative;
  span {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #df5080;
    position: absolute;
    bottom: -16px;
    right: 0;
    text-align: right;
    svg {
      margin-left: 3px;
    }
  }
`;

export default InputBlock;

const InputContainer = styled.div`
  padding: 0 15px;
  height: 42px;

  display: flex;
  align-items: center;
  position: relative;

  border: 1px solid #aaa;
  transition: all 0.4s ease;

  svg {
    border: none;
    background: none;
  }

  &:focus-within {
    padding: 0 14px;
    border: 2px solid #A30B54;
    & > div {
      bottom: 32px;
      left: 14px;
    }
  }

  & > div {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 33px;
    left: 15px;

    background-color: #fff;
    transition: all 0.4s ease;

    label {
      margin: 0 4px;
      color: #000;
      opacity: 60%;
      font-size: 16px;
      transition: all 0.4s ease;
      cursor: text;
    }
  }

  input {
    width: 100%;
    font-size: 14px;
    border: none;
    color: #4f4f4f;

    transition: all 0.4s ease;

    &:focus + div {
      label {
        color: #A30B54;
        opacity: 100%;
      }
    }
    &:focus + svg + div {
      label {
        color: #A30B54;
        opacity: 100%;
      }
    }
  }
`;
