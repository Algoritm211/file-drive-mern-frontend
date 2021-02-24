import React, {useEffect} from 'react';
import classes from './FileList.module.scss'
import File from "./File/File";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentDir, getFiles, getModeFileView} from "../../../redux/file-selector";
import {loadFiles} from "../../../redux/file-reducer";



const FileList = () => {

  const files = useSelector(getFiles)
  const fileModeView = useSelector(getModeFileView)

  const filesBlock = files.map((file) => {
    return (
        <File key={file._id} file={file}/>
      )
  })

  return (
    <React.Fragment>
      <div className={classes.fileList}>
        <div className={classes.fileNumber}/>
        <div className={classes.title}>Название</div>
        <div className={classes.date}>Дата</div>
        <div className={classes.size}>Размер</div>
      </div>
      <div className={fileModeView === 'block' ? classes.fileBlock : ''}>
        {filesBlock}
      </div>

    </React.Fragment>
  );
};

export default FileList;
