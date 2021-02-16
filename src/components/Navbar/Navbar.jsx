import React from 'react';
import styled from 'styled-components'
import {NavLink} from "react-router-dom";


const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  box-shadow: 2px 20px 20px rgb(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: black;
  color: white;
  
  div {
    cursor: pointer;
  }
  
  a {
    color: white;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      font-size: 18px;
    }
  }
`

const Navbar = () => {

  return (
    <HeaderContainer>
      <div>
        <i className="fas fa-bars"></i>
      </div>
      <div>
        <NavLink to={'/registration'}>
          Регистрация
        </NavLink>
      </div>
    </HeaderContainer>
  );
};

export default Navbar;
