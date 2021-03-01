import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FiHash, FiLock } from 'react-icons/fi'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

import Input from '../components/Input'
import Button from '../components/Button'
import { Container, LinkContainer } from '../styles/components/RecoverBox'
import api from '../services/api'
import getValidationErrors from '../utils/getValidationErrors'

type RecoverFormData = {
  token: string
  password: string
  password_confirmation: string
}

export default function RecoverBox() {
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()

  const handleSubmit = useCallback(async (data: RecoverFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        token: Yup.string().required('Token is required'),
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords must match'
        )
      })

      await schema.validate(data, { abortEarly: true })

      await api.post('/password/reset', {
        token: data.token,
        password: data.password,
        password_confirmation: data.password_confirmation
      })

      toast.success('Senha resetada com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

      setTimeout(() => {
        router.push('/')
      }, 5000)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        return
      }

      toast.error(`${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }, [])
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <strong>Criar nova senha</strong>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="token" icon={FiHash} placeholder="Token" />
        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Nova senha"
        />
        <Input
          type="password"
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
