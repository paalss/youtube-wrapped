import React, { useState } from "react";
// import videoList from "../../../youtube-data/testdata.json";
import Overlay from "../../layout/overlay";
import ChannelListElement from "./channelListElement";
import VideoListElement from "./videoListElement";

/*

[{
  "title": "Grapefruit Bush",
  "titleUrl": "https://www.youtube.com/channel/UCbzUrRdSM5s-bHjesDaeOJA"
}]

*/

const convertToChannelList = (videoList) => {
  let channelList = [];
  videoList.forEach((element) => {
    if (element.subtitles === undefined) {
      console.warn(
        "The element with the title: '",
        element.title,
        "' is missing subtitles property"
      );
      return;
    }
    const newElement = {
      title: element.subtitles[0].name,
      titleUrl: element.subtitles[0].url,
      time: element.time,
    };
    channelList.push(newElement);
  });
  return channelList;
};

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
  const elementWithCleanTitle = data.map((e) => ({
    ...e,
    title: e.title.substring(8), // fjerner "watched" fra title
  }));
  return elementWithCleanTitle.filter(
    (e) => !e.title.includes("a video that has been removed")
  );
};

const List = ({ data: videoList }) => {
  const [chosenYear, setChosenYear] = useState(2021);
  const [loadAmount, setLoadAmount] = useState(5);
  const [chosenType, setChosenType] = useState("channel");

  let years, thisYearList;
  let watchAmountList, finishedList;
  years = findAllYears(videoList);
  thisYearList = filterByYear(videoList, chosenYear);

  if (chosenType === "video") {
    watchAmountList = calculateWatchAmount(thisYearList);
    finishedList = removeUnvantedInfo(watchAmountList);
  } else if (chosenType === "channel") {
    const channelList = convertToChannelList(videoList);
    watchAmountList = calculateWatchAmount(channelList);
    finishedList = watchAmountList;
  }

  const loadedData = getFirstEntries(finishedList, loadAmount);

  const loadMoreHandler = () => {
    setLoadAmount(loadedData.length + 10);
  };

  const setYearHandler = () => {
    const selected = document.getElementById("yearSelect");
    const value = selected.options[selected.selectedIndex].value;
    setChosenYear(value);
  };

  const setTypeHandler = () => {
    const selected = document.getElementById("typeSelect");
    const value = selected.options[selected.selectedIndex].value;
    setChosenType(value);
  };

  return (
    <div className="App">
      <header>
        <div className="overlaySpacing">
          <h1>
            Your most watched{" "}
            <select
              name="type"
              id="typeSelect"
              onChange={setTypeHandler}
              value={chosenType}
            >
              <option value="video">video</option>
              <option value="channel">channel</option>
            </select>
          </h1>
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
        </div>
      </header>

      <Overlay>
        <ol>
          {chosenType === "video" &&
            loadedData.map((e) => <VideoListElement key={e.time} e={e} />)}
          {chosenType === "channel" &&
            loadedData.map((e) => {
              return <ChannelListElement key={e.time} e={e} />;
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
