import "./App.css";
import data from "./youtube-data/watch-history.json";
// import data from "./youtube-data/testdata.json";

import { useState } from "react";

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

const filterByYear = (allData, year) =>
  allData.filter((e) => e.time.includes(year));

const getFirstEntries = (data, amount) =>
  data.slice(0, amount).map((e) => ({
    ...e,
    title: e.title.substring(8), // fjerner "watched" fra title
  }));

const calculateWatchAmount = (data) => {
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
  // sorter med mest sett video øverst
  newArray.sort((a, b) => (a.watchAmount > b.watchAmount ? -1 : 1));
  return newArray;
};

const getThumbnailUrl = (url) => {
  const videoId = url && url.substring(url.indexOf("\u003d") + 1);
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
};

function App() {
  const year = "2019";
  const thisYearData = filterByYear(data, year);

  const thisYearDataWatchTimes = calculateWatchAmount(thisYearData);

  const [loadedData, setLoadedData] = useState(
    getFirstEntries(thisYearDataWatchTimes, 5)
  );

  const loadMoreHandler = () => {
    setLoadedData(
      getFirstEntries(thisYearDataWatchTimes, loadedData.length + 5)
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Your most watched videos</h1>
        <h2>Year {year}</h2>
      </header>
      <ol>
        {loadedData.map((e) => {
          const thubnailUrl = getThumbnailUrl(e.titleUrl);
          return (
            <li key={e.time}>
              <div className="frame">
                <img
                  src={thubnailUrl}
                  alt="video"
                  loading="lazy"
                />
              </div>
              <div className="text">
                <h3>
                  {e.titleUrl ? <a href={e.titleUrl}>{e.title}</a> : e.title}
                </h3>
                {e.subtitles?.map((s) => (
                  <p key={s.url}>
                    <a href={s.url}>{s.name}</a>
                  </p>
                ))}
                <p>
                  Watched {e.watchAmount}{" "}
                  {e.watchAmount === 1 ? "time" : "times"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="loadmore">
        <button onClick={loadMoreHandler}>Load more</button>
      </div>
    </div>
  );
}

export default App;
