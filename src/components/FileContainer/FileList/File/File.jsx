import React, {useState} from 'react';
import classes from './File.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteFile, downloadFile, pushToFileStack, setCurrentDir} from "../../../../redux/file-reducer";
import {getCurrentDir, getModeFileView} from "../../../../redux/file-selector";
import Fade from 'react-reveal/Fade';
import styled from 'styled-components'
import {Button, Container, ErrorMessage} from "../../../common/form-styled-elements";


const ErrorWindow = styled(Container)`
  position: fixed;
  top: 10%;
  left: 40%;
  z-index: 99999;
  min-height: 100px;

  div {
    margin-bottom: 10px;
  }
`


const ErrorContainer = ({text, toggleClose}) => {

  const оnClose = (event) => {
    event.stopPropagation()
    toggleClose(false)
  }

  return (
    <ErrorWindow>
      <ErrorMessage>{text}</ErrorMessage>
      <Button onClick={(event) => оnClose(event)}>OK</Button>
    </ErrorWindow>
  )
}


const File = (props) => {
  const dispatch = useDispatch()
  const {name, date, size, type} = props.file
  const currentDir = useSelector(getCurrentDir)
  const fileModeView = useSelector(getModeFileView)
  const [isErrorModal, setErrorModal] = useState(false)


  const openDirHandler = () => {
    if (props.file.type === 'dir') {
      dispatch(setCurrentDir(props.file._id))
      dispatch(pushToFileStack(currentDir))
    }
  }

  const downloadFileHandler = (event) => {
    event.stopPropagation()
    dispatch(downloadFile(props.file))
  }

  const deleteFileHandler = (event) => {
    event.stopPropagation()
    if (props.file.type === 'dir' && props.file.children.length !== 0) {
      // alert('Вы не можете удалить непустую папку')
      setErrorModal(true)
      return
    }
    dispatch(deleteFile(props.file))
  }

  if (fileModeView === 'list') {
    return (
      <Fade top>
        <div className={classes.fileContainer} onClick={() => openDirHandler()}>
          <div className={classes.fileNumber}>
            {type === 'dir'
              ? <i className="fas fa-folder"/>
              : <i className="fas fa-file"/>}</div>
          <div className={classes.title}>{name}</div>
          <div className={classes.date}>{date.slice(0, 10)}</div>
          <div className={classes.size}>{formatBytes(size)}</div>
          <div className={classes.deleteFile}
               onClick={(event) => deleteFileHandler(event)}>
            <i className="fas fa-trash-alt"/>
          </div>
          {type !== 'dir'
          &&
          <div
            className={classes.downloadBtn}
            onClick={(event) => downloadFileHandler(event)}
          >
            <i className="fas fa-download"/></div>
          }

          {isErrorModal && <ErrorContainer text={'Вы не можете удалить непустую папку'} toggleClose={setErrorModal}/>}
        </div>
      </Fade>
    );
  }

  if (fileModeView === 'block') {
    return (
      <Fade bottom>
        <div className={classes.fileContainerBlock} onClick={() => openDirHandler()}>
          <div className={classes.fileIconBlock}>
            {type === 'dir'
              ? <i className="fas fa-folder"/>
              : <i className="fas fa-file"/>}</div>
          <div className={classes.fileInfoBlock}>
            <div className={classes.title}>{name}</div>
            <div className={classes.date}>{date.slice(0, 10)}</div>
            <div className={classes.size}>{formatBytes(size)}</div>
          </div>
          <div className={classes.fileActions}>
            <div className={classes.deleteFileBlock}
                 onClick={(event) => deleteFileHandler(event)}>
              <i className="fas fa-trash-alt"/>
            </div>
            {type !== 'dir'
            &&
            <div
              className={classes.downloadBtnBlock}
              onClick={(event) => downloadFileHandler(event)}
            >
              <i className="fas fa-download"/></div>
            }
          </div>
        </div>
      </Fade>
    )
  }
};

export default File;

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
