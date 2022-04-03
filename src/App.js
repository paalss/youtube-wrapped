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

const testData = [
  {
    title: "Watched Basically Another Tom Scott Video",
    titleUrl: "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
    time: "2021-12-03T15:02:58.289Z",
  },
  {
    title: "Watched Basically Another Tom Scott Video",
    titleUrl: "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
    time: "2021-06-07T15:56:52.805Z",
  },
  {
    title:
      "Watched This was funny in my head for about 2 seconds and now it’s just not but I made it anyway",
    titleUrl: "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
    time: "2021-12-03T15:0",
  },
  {
    title: "Watched The Hornet Special (Hollow Knight Comic Dubs)",
    titleUrl: "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
    time: "2021-12-03T15",
  },
  {
    title: "Watched The Hornet Special (Hollow Knight Comic Dubs)",
    titleUrl: "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
    time: "2021-06-07T15:56:49.204Z",
  },
  {
    title: "Watched Basically Another Tom Scott Video",
    titleUrl: "https://www.youtube.com/watch?v\u003d2uXS20iWve4",
    time: "2021-12-03T15:02:11.522Z",
  },
];

// sortByFrequency(testArray) =>
/**
 * 0: "Watched Basically Another Tom Scott Video"
 * 1: "Watched Basically Another Tom Scott Video"
 * 2: "Watched Basically Another Tom Scott Video"
 * 3: "The Hornet Special (Hollow Knight Comic Dubs)"
 * 4: "The Hornet Special (Hollow Knight Comic Dubs)"
 * 5: "Watched This was funny in my head for about 2 seconds and now it’s just not but I made it anyway"
 */

const filterByYear = (allData, year) =>
  allData.filter((e) => e.time.includes(year));

// lager redusert array over url-er med frekvens
const countOccurences = (yearData) =>
  yearData.reduce(function (acc, curr) {
    return (
      acc[curr.titleUrl] ? ++acc[curr.titleUrl] : (acc[curr.titleUrl] = 1), acc
    );
  }, {});

// lager ny array med titler, sorterer og grupperer etter frekvens
function sortByFrequency(array) {
  var frequency = {};
  var sortAble = [];
  var newArr = [];

  array.forEach(function (obj) {
    if (obj.title in frequency) frequency[obj.title] = frequency[obj.title] + 1;
    else frequency[obj.title] = 1;
  });

  for (var key in frequency) {
    sortAble.push([key, frequency[key]]);
  }

  sortAble.sort(function (a, b) {
    return b[1] - a[1];
  });

  sortAble.forEach(function (obj) {
    for (var i = 0; i < obj[1]; i++) {
      newArr.push(obj[0]);
    }
  });
  return newArr;
}

const getFirstEntries = (yearData, amount) =>
  yearData.slice(0, amount).map((e) => ({
    ...e,
    title: e.title.substring(8), // fjern "watched" fra title
  }));

function App() {
  const year = "2021";
  const thisYearData = filterByYear(testData, year);
  const occurences = sortByFrequency(thisYearData);
  console.log(occurences);
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
