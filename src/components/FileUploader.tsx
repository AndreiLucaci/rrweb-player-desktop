import React, { useState } from "react";
import { FileUploader as ReactFileUploader } from "react-drag-drop-files";
import * as fs from "fs";

const fileTypes = ["JSON"];

export type FileUploaderProps = {
  handleChange: (file: any) => void;
};

export function FileUploader(props: FileUploaderProps) {
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    console.log(file);
    setFile(file);
    props.handleChange(file);
  };

  return (
    <ReactFileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    />
  );
}

export default FileUploader;
