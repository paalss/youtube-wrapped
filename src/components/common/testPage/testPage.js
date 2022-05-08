import React from "react";

import Overlay from "../../layout/overlay";

const TestPage = ({ onUpload }) => {
  const uploadFileHandler = async () => {
    const form = document.getElementById("form-upload-new");
    const formData = new FormData(form);

    const url =
      "http://localhost/sider/annet/youtube-wrapped/src/php/upload.php";
    // const url = "http://yt-wrapped/src/php/upload.php";

    try {
      let response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      response = await response.json();
      console.log(response.status);
      onUpload(true)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App center">
      <header>
        <h1>TestPage</h1>
      </header>
      <Overlay>
        <form id="form-upload-new">
          <div className="buttons">
            <label htmlFor="uploadFile">Upload file</label>
            <input
              id="uploadFile"
              type="file"
              name="uploadFile"
              onChange={uploadFileHandler}
              hidden
            />
          </div>
        </form>
      </Overlay>
    </div>
  );
};

export default TestPage;
