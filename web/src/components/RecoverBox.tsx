import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiHash, FiLock } from 'react-icons/fi'

import Input from '../components/Input'
import Button from '../components/Button'
import { Container, LinkContainer } from '../styles/components/RecoverBox'

export default function RecoverBox() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log()
  }, [])
  return (
    <Container>
      <strong>Criar nova senha</strong>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          autoFocus
          name="token"
          icon={FiHash}
          placeholder="Código recebido no e-mail"
        />
        <Input
          autoFocus
          name="password"
          icon={FiLock}
          placeholder="Nova senha"
        />
        <Input
          autoFocus
          name="password_confirmation"
          icon={FiLock}
          placeholder="Confirmar nova senha"
        />
        <Button type="submit" style={{ marginTop: 16 }}>
          Redefinir
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
