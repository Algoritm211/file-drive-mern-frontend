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
    dispatch(setCurrentDir(props.file._id))
    dispatch(pushToFileStack(currentDir))
  }

  return (
    <div className={classes.fileContainer} onClick={type === 'dir' ? () => openDirHandler() : ''}>
      <div className={classes.fileNumber}><i className="fas fa-file"></i></div>
      <div className={classes.title}>{name}</div>
      <div className={classes.date}>{date.slice(0, 10)}</div>
      <div className={classes.size}>{size}</div>
    </div>
  );
};

export default File;
