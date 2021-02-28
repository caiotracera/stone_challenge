import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'

import Input from '../components/Input'
import Button from '../components/Button'
import { Container, LinkContainer } from '../styles/components/RegisterBox'

export default function RegisterBox() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log()
  }, [])
  return (
    <Container>
      <strong>Cadastre-se</strong>
      <p>Preencha os dados e crie sua conta</p>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="name" icon={FiUser} placeholder="Nome" />
        <Input autoFocus name="email" icon={FiMail} placeholder="E-mail" />
        <Input autoFocus name="password" icon={FiLock} placeholder="Senha" />
        <Input
          autoFocus
          name="confirm_password"
          icon={FiLock}
          placeholder="Confirmar senha"
        />
        <LinkContainer>
          Já tem uma conta?
          <span>
            <Link href="/">Faça login!</Link>
          </span>
        </LinkContainer>
        <Button type="submit" style={{ marginTop: 16 }}>
          Enviar instruções
        </Button>
      </Form>
    </Container>
  )
}
