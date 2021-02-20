import React, {useState} from 'react';
import styled from "styled-components";
import FileList from "./FileList/FileList";
import CreateDirModal from "./CreateDirModal";
import {useDispatch, useSelector} from "react-redux";
import {getFileStack} from "../../redux/file-selector";
import {popFromFileStack, setCurrentDir} from "../../redux/file-reducer";



const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
`

const Button = styled.button`
  background: black;
  padding: 15px;
  color: white;
  border-radius: 15px;
  outline: none;
  cursor: pointer;
  border: none;
  margin-right: 15px;
  &:hover {
    background: #292828;
  }

`

const FileContainer = () => {

  const dispatch = useDispatch()
  const [openCreateDirModal, setOpenCreateDirModal] = useState(false)
  let fileStack = useSelector(getFileStack)


  const backClickHandler = () => {
    const backId = fileStack[fileStack.length - 1]
    dispatch(setCurrentDir(backId))
    dispatch(popFromFileStack())
  }


  return (
    <Container>
      <Button onClick={backClickHandler}>Назад</Button>
      <Button onClick={() => setOpenCreateDirModal(true)}>Создать папку</Button>
      <FileList />
      {openCreateDirModal &&
      <CreateDirModal
        setIsOpenModal={setOpenCreateDirModal}
        isOpen={openCreateDirModal}
      />}

    </Container>
  );
};

export default FileContainer;
