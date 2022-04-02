import "./App.css";
import data from "./youtube-data/watch-history.json";

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
  const firstData = data.slice(0, 20);
  return (
    <div className="App">
      <ul>
        {firstData.map((e) => (
          <li key={e.time}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
