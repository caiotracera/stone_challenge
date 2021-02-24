import styled, { css } from 'styled-components'

import Tooltip from '../../components/Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  height: 56px;
  color: #000;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #ff9000;
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
      color: #000;
    }

    &:focus {
      outline: none;
    }
  }
  svg {
    margin-right: 4px;
    transition: color 0.2s;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #ff9000;
    color: #fff;
    &::before {
      border-color: #ff9000 transparent;
    }
  }
`
