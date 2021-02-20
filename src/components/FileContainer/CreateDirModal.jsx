import React, {useState} from 'react';
import styled from "styled-components";
import {Input} from "../common/form-styled-elements";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentDir} from "../../redux/file-selector";
import {createNewDir} from "../../redux/file-reducer";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props) => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`

const Modal = styled.div`
  width: 500px;
  display: flex;
  height: 320px;
  background-color: darkgray;
  border-radius: 15px;
  padding: 20px;
  flex-direction: column;
  
  div {
    align-self: flex-end;
  }
  
`

export const Button = styled.button`
  padding: 15px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  color: white;
  outline: none;
  border: none;
  font-size: 15px;
  border-radius: 5px;
  margin-left: 15px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  
  &:active {
    box-shadow: inset 5px 5px 10px black;
  }
`

const CreateDirModal = ({setIsOpenModal, isOpen}) => {

  const dispatch = useDispatch()
  const currentDirId = useSelector(getCurrentDir)
  const [dirName, setDirName] = useState()

  const saveNewDir = () => {
    dispatch(createNewDir(currentDirId,dirName))
    setIsOpenModal(false)
  }

  return (
    <Container isOpen={isOpen}>
      <Modal>
        <h4>Введите название папки:</h4>
        <Input onChange={(event) => setDirName(event.target.value)} value={dirName}/>
        <div>
          <Button color={'red'} hoverColor={'#9f2323'} onClick={() => setIsOpenModal(false)}>Отмена</Button>
          <Button color={'blue'} hoverColor={'#232386'} onClick={saveNewDir}>Создать папку</Button>
        </div>
      </Modal>
    </Container>
  );
};

export default CreateDirModal;
