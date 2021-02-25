import React from 'react';
import styled from "styled-components";
import noPhotoImg from '../../assets/img/noPhotoImg.png'
import {useDispatch, useSelector} from "react-redux";
import {getUserPhoto, getUserProfile} from "../../redux/auth-selector";
import {deleteProfilePhoto, setProfilePhoto} from "../../redux/auth-reducer";
import {SERVER_HOST} from "../../assets/server-info";

const Container = styled.div`
  min-width: 320px;
  margin: 60px auto 0 auto;
  max-width: 600px;
  display: flex;
  justify-content: space-around;
`

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  text-align: center;
  margin-right: 20px;
`

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 20px;
`

const ActionsContainer = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
  justify-content: space-around;
`

const FileInput = styled.input`
  display: none;
`

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  padding: 5px 10px;
  margin-top: 20px;
  border: 2px dashed black;
  cursor: pointer;
`

const DeleteButton = styled.button`
  color: white;
  background-color: indianred;
  border: none;
  outline: none;
  padding: 10px;
  max-width: 200px;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: #bf3e3e;
  }
`

const ProfilePage = () => {

  const dispatch = useDispatch()
  const userProfile = useSelector(getUserProfile)

  const userPhoto = userProfile.avatar ? SERVER_HOST + userProfile.avatar : noPhotoImg

  const userPhotoHandler = (event) => {
    const photo = event.target.files[0]

    dispatch(setProfilePhoto(photo))
  };


  const deletePhotoHandler = () => {
    dispatch(deleteProfilePhoto())
  }
  return (
    <Container>
      <ImgContainer>
        <ProfileImg src={userPhoto || noPhotoImg} alt={'ProfileImg'}/>
        Текущая аватарка
      </ImgContainer>
      <ActionsContainer>
        <FileLabel htmlFor={'file__input'}>Загрузить</FileLabel>
        <FileInput
          accept="image/*"
          type={'file'}
          id='file__input'
          onChange={(event) => userPhotoHandler(event)}/>
        <DeleteButton onClick={deletePhotoHandler}>Удалить аватар</DeleteButton>
      </ActionsContainer>
    </Container>
  );
};

export default ProfilePage;
