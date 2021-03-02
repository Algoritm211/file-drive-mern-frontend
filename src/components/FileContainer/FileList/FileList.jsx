import React, {useEffect} from 'react';
import classes from './FileList.module.scss'
import File from "./File/File";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentDir, getFileLoading, getFiles, getModeFileView} from "../../../redux/file-selector";
import styled from "styled-components";
import Loader from "../../Loader/Loader";


const NoFilesLabel = styled.div`
  font-size: 40px;
  text-decoration: wavy;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`


const FileList = () => {

  const files = useSelector(getFiles)
  const fileModeView = useSelector(getModeFileView)
  const isLoading = useSelector(getFileLoading)

  const filesBlock = files.map((file) => {
    return (
        <File key={file._id} file={file}/>
      )
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <React.Fragment>
      <div className={classes.fileList}>
        <div className={classes.fileNumber}/>
        <div className={classes.title}>Название</div>
        <div className={classes.date}>Дата</div>
        <div className={classes.size}>Размер</div>
      </div>
      <div className={fileModeView === 'block' ? classes.fileBlock : ''}>
        {files.length > 0
          ? filesBlock
          : <NoFilesLabel>В этой папке пока что нет файлов</NoFilesLabel>
        }
      </div>

    </React.Fragment>
  );
};

export default FileList;
