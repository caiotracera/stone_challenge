import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiMail, FiLock } from 'react-icons/fi'

import Input from '../components/Input'
import Button from '../components/Button'
import { Container, LinkContainer } from '../styles/components/ForgotBox'

export default function LoginBox() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log()
  }, [])
  return (
    <Container>
      <strong>Recuperar senha</strong>
      <p>
        Coloque o e-mail associado a sua conta. Em até 5 minutos enviaremos um
        e-mail com as instruções para alteração de senha.
      </p>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="email" icon={FiMail} placeholder="E-mail" />
        <Button type="submit" style={{ marginTop: 16 }}>
          Enviar instruções
        </Button>
      </Form>
      <LinkContainer>
        Já tem uma conta?{' '}
        <span>
          <Link href="/">Faça login!</Link>
        </span>
      </LinkContainer>
    </Container>
  )
}
