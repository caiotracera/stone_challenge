import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';
import { Container, LinkContainer } from './styles';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

type ForgotFormData = {
  email: string;
};

export default function ForgotBox() {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(async (data: ForgotFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('The email is required')
          .email('The e-mail must be valid'),
      });

      await schema.validate(data, { abortEarly: true });

      await api.post('/password/forgot', {
        email: data.email,
      });

      toast.success('Token enviado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        history.push('/recover');
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
  }, []);
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
          <Link to="/">Faça login!</Link>
        </span>
      </LinkContainer>
    </Container>
  );
}
