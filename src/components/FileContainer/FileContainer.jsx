import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import FileList from "./FileList/FileList";
import CreateDirModal from "./CreateDirModal";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentDir, getFileStack} from "../../redux/file-selector";
import {loadFiles, popFromFileStack, setCurrentDir, uploadFile} from "../../redux/file-reducer";
import UploaderContainer from "./FileUploader/UploaderContainer";
import Select from 'react-select';


const Container = styled.div`
  max-width: 900px;
  height: 100vh;
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

const DropArea = styled.div`
  width: 90%;
  font-size: 50px;
  height: calc(100vh - 100px);
  margin: 20px auto 0 auto;
  border: 3px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const SelectContainer = styled.div`
  margin-top: 40px;
  select {
    width: 150px;
    text-align: center;
    margin-top: 5px;
  }
`

const FileContainer = () => {

  const dispatch = useDispatch()
  const [openCreateDirModal, setOpenCreateDirModal] = useState(false)
  const [sort, setSort] = useState('')
  const [onDragEnter, setOnDragEnter] = useState(false)
  const currentFileDir = useSelector(getCurrentDir)
  let fileStack = useSelector(getFileStack)

  useEffect(() => {
    dispatch(loadFiles(currentFileDir, sort))
  }, [currentFileDir, sort])


  const onSelectChange = (event) => {
    const selectValue = event.target.value
    setSort(selectValue)
  }

  const backClickHandler = () => {
    const backId = fileStack[fileStack.length - 1]
    dispatch(setCurrentDir(backId))
    dispatch(popFromFileStack())
  }

  const fileHandler = (event) => {
    const files = [...event.target.files]

    files.forEach((file) => {
      dispatch(uploadFile(file, currentFileDir))
    })
  }

  const dragEnterHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setOnDragEnter(true)
  }

  const dragLeaveHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setOnDragEnter(false)
  }

  const onDropHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const files = [...event.dataTransfer.files]
    files.forEach((file) => {
      dispatch(uploadFile(file, currentFileDir))
    })
    setOnDragEnter(false)
  }

  return (
    <React.Fragment>
      {
        !onDragEnter
          ? <Container onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} onDragEnter={dragEnterHandler}>
            <Button onClick={backClickHandler}>Назад</Button>
            <Button onClick={() => setOpenCreateDirModal(true)}>Создать папку</Button>
            <div>
              <FileLabel htmlFor={'file__input'}>Загрузить</FileLabel>
              <FileInput type={'file'} id='file__input' onChange={(event) => fileHandler(event)}/>
            </div>
            <SelectContainer>
              <label htmlFor="sort">Выберите параметр сортировки:<br/></label>
              <select name="sort" id="sort" onChange={onSelectChange}>
                <option value="">Без параметра</option>
                <option value="size">Размер</option>
                <option value="name">Имя</option>
                <option value="date">Дата</option>
              </select>
            </SelectContainer>
            <FileList/>
            {openCreateDirModal &&
            <CreateDirModal
              setIsOpenModal={setOpenCreateDirModal}
              isOpen={openCreateDirModal}
            />}

          </Container>

          : <DropArea onDrop={onDropHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}
                      onDragEnter={dragEnterHandler}>
            Перетащите файлы в выбранную область
          </DropArea>
      }
      <UploaderContainer/>
    </React.Fragment>
  )
    ;
};

export default FileContainer;
