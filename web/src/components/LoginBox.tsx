import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiMail, FiLock } from 'react-icons/fi'

import Input from '../components/Input'
import Button from '../components/Button'
import { Container, LinkContainer } from '../styles/components/LoginBox'

export default function LoginBox() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log()
  }, [])
  return (
    <Container>
      <strong>Olá :)</strong>
      <p>Preencha com seus dados para fazer login</p>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <LinkContainer>
          <Link href="/forgot-password">Esqueceu sua senha?</Link>
        </LinkContainer>
        <Button type="submit" style={{ marginTop: 16 }}>
          Entrar
        </Button>
      </Form>
      <LinkContainer>
        Ainda não tem conta?
        <br />
        <span>
          <Link href="/register">Cadastre-se!</Link>
        </span>
      </LinkContainer>
    </Container>
  )
}
