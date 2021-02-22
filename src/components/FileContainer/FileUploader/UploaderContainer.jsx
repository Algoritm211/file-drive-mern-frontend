import React from 'react';
import classes from './FileUploader.module.scss'
import UploadingFile from "./UploadingFile";
import {toggleVisible} from "../../../redux/uploader-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, getIsVisible} from "../../../redux/uploader-selector";

const UploaderContainer = () => {
  const dispatch = useDispatch()
  const isVisible = useSelector(getIsVisible)
  const files = useSelector(getFiles)

  const fileBlock = files.map((file) => {
    return <UploadingFile file={file} key={file.id} />
  })

  return ( isVisible &&
    <div className={classes.uploader}>
      <div className={classes.uploadHeader}>
        <p>Загрузка файлов:</p>
        <i className="far fa-window-close" onClick={() => dispatch(toggleVisible(false))}/>
      </div>
      <div className={classes.fileList}>
        {fileBlock}
      </div>
    </div>
  );
};

export default UploaderContainer;
