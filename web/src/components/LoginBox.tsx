import { useCallback, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiMail, FiLock } from 'react-icons/fi'
import * as Yup from 'yup'

import Input from '../components/Input'
import Button from '../components/Button'
import { Container, LinkContainer } from '../styles/components/LoginBox'
import { AuthContext } from '../hooks/auth'
import getValidationErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'

type SignInFormData = {
  email: string
  password: string
}
export default function LoginBox() {
  const { signIn, user } = useContext(AuthContext)
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  useEffect(() => {
    if (user) {
      router.push('/recover')
    }
  }, [])

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('The email is required')
            .email('The e-mail must be valid'),
          password: Yup.string().required('Password is required')
        })

        await schema.validate(data, { abortEarly: true })

        await signIn({ email: data.email, password: data.password })
        router.push('/forgot')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Sign in error',
          description: 'Sign in failure, check your credentials'
        })
      }
    },
    [addToast, router, signIn]
  )
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
          <Link href="/forgot">Esqueceu sua senha?</Link>
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
