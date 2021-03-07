import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';
import { Container, LinkContainer } from './styles';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const RegisterBox: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Username is required'),
          email: Yup.string()
            .required('The email is required')
            .email('The e-mail must be valid'),
          password: Yup.string().required('Password is required'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        });

        await schema.validate(data, { abortEarly: true });

        await api.post('/users', {
          username: data.username,
          email: data.email,
          password: data.password,
        });

        toast.success('Conta criada com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          history.push('/');
        }, 5000);
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
    [history],
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

      <strong>Cadastre-se</strong>
      <p>Preencha os dados e crie sua conta</p>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="username" icon={FiUser} placeholder="username" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <Input
          type="password"
          name="confirm_password"
          icon={FiLock}
          placeholder="Confirmar senha"
        />
        <LinkContainer>
          Já tem uma conta?
          <span>
            <Link to="/">Faça login!</Link>
          </span>
        </LinkContainer>
        <Button type="submit" style={{ marginTop: 16 }}>
          Enviar instruções
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterBox;
