import React from 'react';
import classes from './FileUploader.module.scss'
import {removeFile} from "../../../redux/uploader-reducer";
import {useDispatch} from "react-redux";

const UploadingFile = ({file}) => {
  const dispatch = useDispatch()
  return (
    <div className={classes.uploadingFile}>
      <div>
        {stringFormat(file.name)}
      </div>
      <div className={classes.progressBar}>
        <div className={classes.progressLine} style={{width: `${file.progress}%`}}>{file.progress}%</div>
      </div>
      <i className="far fa-window-close" onClick={() => dispatch(removeFile({id: file.id}))} />
    </div>
  );
};

export default UploadingFile;

function stringFormat(str) {
  if (str.length > 6) {
    return `${str.slice(0, 6)}...`
  } else {
    return str
  }
}
