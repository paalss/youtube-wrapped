import "./App.css";
import data from "./youtube-data/watch-history.json";

import { useState } from "react";

import placeholderImg from "./yt-placeholder-img.png";

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
  const firstData = (allData, amount) =>
    allData.slice(0, amount).map((e) => ({
      ...e,
      title: e.title.substring(8), // fjern "watched" fra title
    }));
  const [loadedData, setLoadedData] = useState(firstData(data, 5));
  const loadMoreHandler = () => {
    setLoadedData(firstData(data, 10));
  };
  return (
    <div className="App">
      <h1>Yt-wrapped</h1>
      <h2>Vanlig liste</h2>
      <ol>
        {loadedData.map((e) => (
          <li key={e.time}>
            <div className="frame">
              <img src={placeholderImg} alt="video" loading="lazy" />
            </div>
            <div className="text">
              <h3>
                <a href={e.titleUrl}>{e.title}</a>
              </h3>
              {e.subtitles.map((s) => (
                <p key={s.url}>
                  <a href={s.url}>{s.name}</a>
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <button onClick={loadMoreHandler}>Last flere</button>
    </div>
  );
}

export default App;
