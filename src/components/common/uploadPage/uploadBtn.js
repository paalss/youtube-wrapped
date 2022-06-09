import React from "react";

const UploadBtn = ({ onClick, children }) => {
  const showFile = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const json = JSON.parse(text);
      onClick(json);
    };
    reader.readAsText(e.target.files[0]);
  };
  return (
    <div className="buttons">
      <label htmlFor="uploadFile">{children}</label>
      <input id="uploadFile" type="file" onChange={(e) => showFile(e)} hidden />
    </div>
  );
};

export default UploadBtn;
