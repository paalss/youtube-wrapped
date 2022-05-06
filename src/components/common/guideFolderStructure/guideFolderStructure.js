import classes from "./guideFolderStructure.module.css";
import folderIcon from "../../../img/guide/folder.svg";
import fileIcon from "../../../img/guide/file.svg";

const GuideFolderStructure = () => {
  return (
    <div className={classes.root}>
      <pre>
        <code>
          <ul>
            <li>
              <img src={folderIcon} alt="" /> Takeout
            </li>
            <li className={classes.between}>│</li>
            <li>
              ├── <img src={folderIcon} alt="" /> YouTube and YouTube Music
            </li>
            <li className={classes.between}>│   │</li>
            <li>
              │   └── <img src={folderIcon} alt="" /> history
            </li>
            <li className={classes.between}>│       │</li>
            <li>
              │       ├── <img src={fileIcon} alt="" /> search-history.json
            </li>
            <li className={classes.between}>│       │</li>
            <li>
              │       └── <img src={fileIcon} alt="" /> watch-history.json
            </li>
            <li className={classes.between}>│</li>
            <li>
              └── <img src={fileIcon} alt="" /> archive_browser.html
            </li>
          </ul>
        </code>
      </pre>
    </div>
  );
};

export default GuideFolderStructure;
