import "./App.css";
// import data from "./youtube-data/watch-history.json";
import testdata from "./youtube-data/testdata.json";

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

const filterByYear = (allData, year) =>
  allData.filter((e) => e.time.includes(year));

const getFirstEntries = (yearData, amount) =>
  yearData.slice(0, amount).map((e) => ({
    ...e,
    title: e.title.substring(8), // fjerner "watched" fra title
  }));

const calculatePopularity = (data) => {
  let newArray = [];
  data.forEach((element) => {
    let isAlreadyHere = newArray.find((e) => e.titleUrl === element.titleUrl);
    if (isAlreadyHere) {
      const updatedVideo = {
        ...isAlreadyHere,
        watchAmount: isAlreadyHere.watchAmount + 1, 
      };

      // find & replace array element
      newArray = newArray.map((e) =>
        e.titleUrl === updatedVideo.titleUrl ? updatedVideo : e
      );
    } else {
      // isAlreadyHere === undefined
      const newVideo = { ...element, watchAmount: 1 };
      newArray.push(newVideo);
    }
  });
  console.log(newArray);
};

function App() {
  const year = "2021";
  const thisYearData = filterByYear(testdata, year);

  calculatePopularity(thisYearData);

  const [loadedData, setLoadedData] = useState(
    getFirstEntries(thisYearData, 5)
  );

  const loadMoreHandler = () => {
    setLoadedData(getFirstEntries(thisYearData, 10));
  };

  return (
    <div className="App">
      <h1>Yt-wrapped</h1>
      <h2>År: {year}</h2>
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
              {e.subtitles?.map((s) => (
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
