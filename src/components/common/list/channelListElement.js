import React from "react";
import classes from "./listItem.module.css"

const ChannelListElement = ({ e }) => {
  return (
    <li className={classes.rankedItem}>
      <div className={classes.text}>
        <h3>
          {e.titleUrl ? (
            <a href={e.titleUrl} className={classes.itemLink}>
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
