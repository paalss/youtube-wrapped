import "./App.css";

import { useState } from "react";

import List from "./components/common/list/list";
import Guide from "./components/common/guide/guide";

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
  const [selectedFile, setSelectedFile] = useState(false);
  if (selectedFile) {
    return <List />;
  } else {
    return <Guide />;
  }
}

export default App;
