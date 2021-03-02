import React, {useState} from 'react';
import styled from 'styled-components'
import {authAPI} from "../../api/login-api";
import {Button, Container, ErrorMessage, Input} from "../common/form-styled-elements";
import {useDispatch, useSelector} from "react-redux";
import {getRegistrationError} from "../../redux/auth-selector";
import {registerUser} from "../../redux/auth-reducer";






const RegistrationForm = () => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const error = useSelector(getRegistrationError)


  const sendFormToServer = () => {
    dispatch(registerUser(email, password))
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={sendFormToServer}>
        Зарегистрироваться
      </Button>
    </Container>
  );
};

export default RegistrationForm;
