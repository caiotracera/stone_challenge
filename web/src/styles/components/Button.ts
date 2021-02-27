import styled from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  isLoading: number
}

export const Container = styled.button<ContainerProps>`
  background: #d71414;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.3s;
  border: 1px solid #fff;
  &:hover {
    background: ${shade(0.2, '#d71414')};
  }
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
`
