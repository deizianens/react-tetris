import React from 'react';

import { StyledButton } from './styles/StyledButton';

const Button = ({ callback }) => {
  return <StyledButton onClick={callback}>Start Game</StyledButton>;
};

export default Button;
