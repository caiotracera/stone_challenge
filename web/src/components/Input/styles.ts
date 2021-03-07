import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 16px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #fff;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #d71414;
      border-color: #d71414;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #d71414;
    `}
  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #000;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
    transition: color 0.2s;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
