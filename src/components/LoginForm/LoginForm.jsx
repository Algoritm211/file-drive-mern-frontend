import React, {useState} from 'react';
import {loginAPI} from "../../api/login-api";
import {Button, Container, Input} from "../common/form-styled-elements";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/auth-reducer";


const LoginForm = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      <Button onClick={sendFormLogin}>
        Войти
      </Button>
    </Container>
  );
};

export default LoginForm;
