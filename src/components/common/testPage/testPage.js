import React from "react";

import Overlay from "../../layout/overlay";

const TestPage = ({ onUpload }) => {
  const uploadFileHandler = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;

    formData.append("file", file);
    formData.append("fileName", fileName);

    // fetch("http://yt-wrapped/src/php/upload.php")
    fetch(
      "http://localhost/sider/annet/youtube-wrapped/src/php/upload.php",
      {
        method: "POST",
        body: formData,
      }
        .then((res) => res.json())
        .then((res) => console.log(res))
    );

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
