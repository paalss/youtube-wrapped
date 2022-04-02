import "./App.css";
import data from "./youtube-data/watch-history.json";

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
  const firstData = data
    .slice(0, 20)
    .map((e) => {
      return {
        ...e,
        title: e.title.substring(8) // fjern "watched" fra title
      }
    })
  return (
    <div className="App">
      <h1>Yt-wrapped</h1>
      <h2>Vanlig liste</h2>
      <ol>
        {firstData.map((e) => (
          <li key={e.time}>
            <div className="frame">
              <img src={placeholderImg} alt="video" />
            </div>
            <h3>{e.title}</h3>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
