import "./App.css";

import { useState } from "react";

import List from "./components/common/list/list";
// import UploadPage from "./components/common/uploadPage/uploadPage";
import TestPage from "./components/common/testPage/testPage";

// import placeholderImg from "./yt-placeholder-img.png";

/*

[{
  "header": "YouTube",
  "title": "Watched Basically Another Tom Scott Video",
  "titleUrl": "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
  "subtitles": [{
    "name": "MattColbo",
    "url": "https://www.youtube.com/channel/UCDyqjn-9rKdcAe0gTMAkqyg"
  }],
  "time": "2021-12-03T15:02:58.289Z",
  "products": ["YouTube"],
  "activityControls": ["YouTube watch history"]
}

*/

function App() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  // const isTesting = true;

  const uploadHandler = (bool) => {
    setIsFileUploaded(bool);
  };

  // if (isTesting) return <TestPage onUpload={uploadHandler} />;

  if (isFileUploaded) {
    return <List />;
  } else {
    return <TestPage onUpload={uploadHandler} />;
  }
}

export default App;
