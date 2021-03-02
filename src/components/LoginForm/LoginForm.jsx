import React, {useState} from 'react';
import {Button, Container, ErrorMessage, Input} from "../common/form-styled-elements";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/auth-reducer";
import {getAuthError} from "../../redux/auth-selector";
import styled from "styled-components";



const LoginForm = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const error = useSelector(getAuthError)

  const sendFormLogin = () => {
    dispatch(loginUser(email, password))
    setEmail('')
    setPassword('')
  }

  return (
    <Container>
      <h2>Авторизация</h2>
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={sendFormLogin} type={'submit'}>
        Войти
      </Button>
    </Container>
  );
};

export default LoginForm;
