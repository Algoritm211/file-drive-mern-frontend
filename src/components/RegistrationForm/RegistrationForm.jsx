import React, {useState} from 'react';
import styled from 'styled-components'
import {authAPI} from "../../api/login-api";
import {Button, Container, Input} from "../common/form-styled-elements";






const RegistrationForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sendFormToServer = () => {
    authAPI.registration(email, password)
    setEmail('')
    setPassword('')
  }

  return (
    <Container>
      <h2>Регистрация</h2>
      <label htmlFor={'email'}>Email:</label>
      <Input
        id={'email'}
        type={'text'}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label htmlFor={'password'}>Пароль:</label>
      <Input
        id={'password'}
        type={'password'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}/>
      <Button onClick={sendFormToServer}>
        Зарегистрироваться
      </Button>
    </Container>
  );
};

export default RegistrationForm;
