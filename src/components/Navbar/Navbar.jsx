import React from 'react';
import styled from 'styled-components'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuth, getUserProfile} from "../../redux/auth-selector";
import {logout} from "../../redux/auth-reducer";
import noPhotoImg from '../../assets/img/noPhotoImg.png'
import {SERVER_HOST} from "../../assets/server-info";


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
    margin-left: 20px;

    &:hover {
      font-size: 18px;
    }
  }
`

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 150px;
`

const Navbar = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(getAuth)

  const userProfile = useSelector(getUserProfile)

  const userPhoto = userProfile.avatar ? SERVER_HOST + userProfile.avatar : noPhotoImg

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <HeaderContainer>
      <div>
        <i className="fas fa-bars"></i>
      </div>
      <div>

        {!isAuth && <NavLink to={'/login'}>Войти</NavLink>}
        {!isAuth && <NavLink to={'/registration'}>Регистрация</NavLink>}
        {isAuth &&
          <HeaderActions>
            <NavLink to={'/profile'}>
              <Avatar src={userPhoto} alt={'userAvatar'} />
            </NavLink>
            <div onClick={logoutUser}>Выйти</div>
          </HeaderActions>
        }
      </div>
    </HeaderContainer>
  );
};

export default Navbar;
