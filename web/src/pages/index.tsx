import { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import LogoMarvel from '../assets/images/Logo.svg'
import { Content, Container } from '../styles/index'
import Input from '../components/Input'
import { FiLock, FiMail } from 'react-icons/fi'

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log(true)
  }, [])

  return (
    <Content>
      <Container>
        <div className="form-container sign-in-container">
          <Form ref={formRef} onSubmit={handleSubmit} action="#">
            <img
              src="https://camo.githubusercontent.com/f48803584fba6f315b0133ea4ad8fdc4a943579d0817a6300694af57e25d51a6/68747470733a2f2f76616761732e6279696e746572612e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031392f30352f73746f6e6576657264652e706e67"
              alt="Logo stone"
              style={{ width: 200, marginBottom: 15 }}
            />
            <Input autoFocus name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </Form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <LogoMarvel />
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Content>
  )
}

export default Home
