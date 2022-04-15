import "./App.css";
// import data from "./youtube-data/watch-history.json";
import data from "./youtube-data/testdata.json";

import takeoutImg from "./img/guide/takeout.png";
import mailImg from "./img/guide/mail.png";

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

const findAllYears = (data) => {
  let years = [];
  data.forEach((element) => {
    const year = element.time.substring(0, 4); // hent årstallet
    if (!years.includes(year)) {
      years.push(year);
    }
  });
  return years;
};

const filterByYear = (data, year) => data.filter((e) => e.time.includes(year));

const getFirstEntries = (data, amount) => data.slice(0, amount);

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

const removeUnvantedInfo = (data) => {
  const dataWithCleanTitle = data.map((e) => ({
    ...e,
    title: e.title.substring(8), // fjerner "watched" fra title
  }));
  return dataWithCleanTitle.filter(
    (e) => !e.title.includes("a video that has been removed")
  );
};

const getThumbnailUrl = (url) => {
  const videoId = url && url.substring(url.indexOf("\u003d") + 1);
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

function App() {
  const [isJsonUploaded, setItJsonUploaded] = useState(null);
  const [chosenYear, setChosenYear] = useState(2017);
  const [loadAmount, setLoadAmount] = useState(5);
  if (isJsonUploaded) {
    const years = findAllYears(data);
    const thisYearData = filterByYear(data, chosenYear);
    const watchAmountData = calculateWatchAmount(thisYearData);
    const finishedData = removeUnvantedInfo(watchAmountData);

    const loadedData = getFirstEntries(finishedData, loadAmount);

    const loadMoreHandler = () => {
      setLoadAmount(loadedData.length + 10);
    };

    const setYearHandler = () => {
      const selected = document.getElementById("yearSelect");
      const value = selected.options[selected.selectedIndex].value;
      setChosenYear(value);
    };

    return (
      <div className="App">
        <header>
          <h1>Your most watched videos</h1>
          <h2>
            Year{" "}
            <select
              name="year"
              id="yearSelect"
              onChange={setYearHandler}
              value={chosenYear}
            >
              {years.map((y) => (
                <option value={y} key={y}>
                  {y}
                </option>
              ))}
            </select>
          </h2>
        </header>

        <ol className="overlay">
          {loadedData.map((e) => {
            const thubnailUrl = getThumbnailUrl(e.titleUrl);
            return (
              <li key={e.time} className="videoitem">
                <div className="frame">
                  <img src={thubnailUrl} alt="video" loading="lazy" />
                </div>
                <div className="text">
                  <h3>
                    {e.titleUrl ? (
                      <a href={e.titleUrl} className="videolink">
                        {e.title}
                      </a>
                    ) : (
                      e.title
                    )}
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
        <div className="buttons">
          <button onClick={loadMoreHandler}>Load more</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App center">
        <header>
          <h1>Find out what videos you watched the most</h1>
        </header>
        <div className="overlay">
          <h2>This app needs you to</h2>
          <ol>
            <li>Request your watch-history.json from Google Takeout</li>
            <li>Download them, and</li>
            <li>Upload them to this site:</li>
          </ol>
          <div className="buttons">
            <form action="">
              <label htmlFor="file-upload">Upload watch-history.json</label>
              <input id="file-upload" type="file" hidden />
            </form>
          </div>

          <h2>In deph guide</h2>
          <h3>1. Request your watch-history.json from Google Takeout</h3>
          <p>
            Go to <a href="https://takeout.google.com/">takeout.google.com</a>
          </p>
          <p>
            Under <b>create a new export</b>,
          </p>
          <p>
            select only <b>YouTube and YouTube Music</b>
          </p>
          <img src={takeoutImg} alt="takeout" />
          <p>
            Click <b>Next step</b>
          </p>
          <p>
            In a few days Google Takeout will send you a mail where you can
            download your files
          </p>

          <img src={mailImg} alt="mail from google" />
          <h3>2. Download files</h3>

          <p>
            Once you've got the mail from <b>Google Takeout</b>, you can click{" "}
            <b>Download your files</b>
          </p>
          <p>
            This will take you to a new page and start downloading a compressed
            file
          </p>
          <h3>3. Upload file to this site</h3>
          <p>
            Extract/unzip the compressed file, find the{" "}
            <b>watch-history.json</b> file
          </p>
          <p>And then:</p>
          <div className="buttons">
            <form action="">
              <label htmlFor="file-upload">Upload watch-history.json</label>
              <input id="file-upload" type="file" hidden />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
