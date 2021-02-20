import React from 'react';
import classes from './File.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {pushToFileStack, setCurrentDir} from "../../../../redux/file-reducer";
import {getCurrentDir} from "../../../../redux/file-selector";

const File = (props) => {
  const dispatch = useDispatch()
  const {name, date, size, type} = props.file
  const currentDir = useSelector(getCurrentDir)

  const openDirHandler = () => {
    if (props.file.type === 'dir') {
      dispatch(setCurrentDir(props.file._id))
      dispatch(pushToFileStack(currentDir))
    }
  }

  return (
    <div className={classes.fileContainer} onClick={() => openDirHandler()}>
      <div className={classes.fileNumber}>{type === 'dir' ? <i className="fas fa-folder"></i> : <i className="fas fa-file"></i>}</div>
      <div className={classes.title}>{name}</div>
      <div className={classes.date}>{date.slice(0, 10)}</div>
      <div className={classes.size}>{formatBytes(size)}</div>
    </div>
  );
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
