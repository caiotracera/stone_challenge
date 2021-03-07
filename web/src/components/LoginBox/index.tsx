import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../Input';
import Button from '../Button';

import { Container, LinkContainer } from './styles';

type SignInFormData = {
  email: string;
  password: string;
};

const LoginBox: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('The email is required')
            .email('The e-mail must be valid'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        toast.error(`${error.response.data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    [history, signIn],
  );
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
          <Link to="/forgot">Esqueceu sua senha?</Link>
        </LinkContainer>
        <Button type="submit" style={{ marginTop: 16 }}>
          Entrar
        </Button>
      </Form>
      <LinkContainer>
        Ainda não tem conta?
        <br />
        <span>
          <Link to="/register">Cadastre-se!</Link>
        </span>
      </LinkContainer>
    </Container>
  );
};

export default LoginBox;
