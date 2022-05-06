import React from "react";

import Overlay from "../../layout/overlay";

const TestPage = ({ onUpload }) => {
  const uploadFileHandler = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;

    formData.append("file", file);
    formData.append("fileName", fileName);

    fetch("../../../php/upload.php")
      .then((res) => res.json())
      .then((res) => {
        console.log("halla");
      });

    // if (file) {
    //   let data = new FormData();
    //   data.append("file", file);
    //   console.log(data);
    // }
    onUpload(event.target.files[0]);
  };
  return (
    <div className="App center">
      <header>
        <h1>TestPage</h1>
      </header>
      <Overlay>
        <div className="buttons">
          <label htmlFor="file-upload">Upload watch-history.json</label>
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
