import React, {useState} from 'react';
import styled from 'styled-components'
import {loginAPI} from "../../api/login-api";



const Container = styled.div`
  max-width: 600px;
  height: 300px;
  background-color: darkgray;
  box-shadow: 0 20px 20px rgb(0, 0, 0, 0.3);
  display: flex;
  margin: 100px auto 0 auto;
  border-radius: 30px;
  padding: 40px 20px 20px 20px;
  flex-direction: column;
  position: relative;
`

const Input = styled.input`
  min-width: 50px;
  height: 40px;
  outline: none;
  font-size: 20px;
  border: none;
  border-bottom: 3px solid black;
  background-color: darkgray;
  margin-bottom: 20px;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 50px darkgray !important; /* Цвет фона */
    -webkit-text-fill-color: black !important; /* цвет текста */
    color: darkgray!important; /* цвет текста */
  }
`

const Button = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 15px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  outline: none;
  border: none;
  font-size: 15px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #232386;
  }
  
  &:active {
    box-shadow: inset 5px 5px 10px black;
  }
`




const RegistrationForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sendFormToServer = () => {
    loginAPI.registration(email, password)
  }

  return (
    <Container>
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
        Отправить
      </Button>
    </Container>
  );
};

export default RegistrationForm;
