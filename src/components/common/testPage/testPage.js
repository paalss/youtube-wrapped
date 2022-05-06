import React from "react";

import Overlay from "../../layout/overlay";

const TestPage = ({ onUpload }) => {
  const uploadFileHandler = async (event) => {
    // fetch("../../../php/upload.php", {
    fetch("http://yt-wrapped/src/php/upload.php")
      .then((res) => res.json())
      .then((res) => console.log(res));

    // onUpload(event.target.files[0]);
  };
  return (
    <div className="App center">
      <header>
        <h1>TestPage</h1>
      </header>
      <Overlay>
        <div className="buttons">
          <label htmlFor="file-upload">Upload file</label>
          <input
            id="file-upload"
            type="file"
            name="file-upload"
            onChange={uploadFileHandler}
            hidden
          />
        </div>
      </Overlay>
    </div>
  );
};

export default TestPage;
