import React from "react";

const getThumbnailUrl = (url) => {
  const videoId = url && url.substring(url.indexOf("\u003d") + 1);
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

const VideoListElement = ({ e }) => {
  const thubnailUrl = getThumbnailUrl(e.titleUrl);
  return (
    <li className="videoitem">
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
          Watched {e.watchAmount} {e.watchAmount === 1 ? "time" : "times"}
        </p>
      </div>
    </li>
  );
};

export default VideoListElement;
