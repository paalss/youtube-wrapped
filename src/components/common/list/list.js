import React, { useState } from "react";
// import data from "./youtube-data/watch-history.json";
// import data from "../../../youtube-data/watch-history.json";
import Overlay from "../../layout/overlay";

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

const List = ({items: data}) => {
  const [chosenYear, setChosenYear] = useState(2021);
  const [loadAmount, setLoadAmount] = useState(5);

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

      <Overlay>
        <ol>
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
      </Overlay>
      <div className="buttons">
        <button onClick={loadMoreHandler}>Load more</button>
      </div>
    </div>
  );
};

export default List;
