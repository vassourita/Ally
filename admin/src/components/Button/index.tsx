import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

export interface IProps extends ButtonHTMLAttributes<any> {
  outlined?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<IProps> = ({ outlined, isLoading, children, ...rest }) => {
  return (
    <Container outlined={outlined} {...rest}>
      {children}
    </Container>
  );
}

export default Button;