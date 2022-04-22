import classes from "./guideFolderStructure.module.css"

const GuideFolderStructure = () => {
  return (
    <code className={classes.root}>
        <pre>
            Takeout <br />
            ├── YouTube and YouTube Music <br />
            │   └── history <br />
            │       ├── search-history.json <br />
            │       └── <b>watch-history.json</b> <br />
            └── archive_browser.html <br />
        </pre>
    </code>
  );
};

export default GuideFolderStructure;
