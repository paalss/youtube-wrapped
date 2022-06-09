import React from "react";

const ChannelListElement = ({ e }) => {
  return (
    <li className="rankedItem">
      <div className="text">
        <h3>
          {e.titleUrl ? (
            <a href={e.titleUrl} className="itemlink">
              {e.title}
            </a>
          ) : (
            e.title
          )}
        </h3>
        <p>
          Watched {e.watchAmount} {e.watchAmount === 1 ? "time" : "times"}
        </p>
      </div>
    </li>
  );
};

export default ChannelListElement;
