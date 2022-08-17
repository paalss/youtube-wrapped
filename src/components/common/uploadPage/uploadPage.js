import Overlay from "../../layout/overlay";
import UploadBtn from "./uploadBtn";

import takeoutImg from "../../../img/guide/takeout.png";
import mailImg from "../../../img/guide/mail.png";
import fileformatDefaultImg from "../../../img/guide/fileformat-default2.png";
import contentImg from "../../../img/guide/content.png";

import chevronRight from "../../../img/chevron-right.svg";

// import appImg from "../../../img/commits/8.png";

import classes from "./uploadPage.module.css";

import GuideFolderStructure from "../guideFolderStructure";
import { useState } from "react";

const UploadPage = ({ onUpload }) => {
  const [showGuide, setShowGuide] = useState(true);

  const chevronClass = showGuide ? "down" : "right";
  const guideClass = showGuide ? "visible" : "hidden";

  return (
    <div className="App center">
      <header>
        <h1>Youtube-wrapped</h1>
        <p className="tagline">Find out what caught your attention you the most</p>
        <p className="intro">
          To show you your most watched videos, you need to upload your <code>watch-history.json</code>-file to this site.
        </p>
      </header>
      <Overlay>
        <button className="expand" onClick={() => setShowGuide((current) => !current)}>
          detailed guide <img className={"chevron " + chevronClass} src={chevronRight} alt="" />
        </button>
          <div className={"guide " + guideClass}>
            <h2>Here's how</h2>
            <h3>1. Request watch history</h3>
            <div className={classes.box}>
              <p>
                Go to{" "}
                <a href="https://takeout.google.com/">takeout.google.com</a>
              </p>
              <p>
                Under <b>create a new export</b>, select only{" "}
                <b>YouTube and YouTube Music</b>
              </p>
              <img src={takeoutImg} alt="takeout" />
              <p>
                Click the <b>multiple formats</b> button.
              </p>
            </div>
            <div className={classes.box}>
              <p>
                In the pop up, look for the select/dropdown menu with the
                pre-selected value "HTML".
                <br />
                Switch this value to <b>JSON</b> and click <b>OK</b>.
              </p>
              <img src={fileformatDefaultImg} alt="file format settings" />
            </div>
            <div className={classes.box}>
              <p>
                Optional: Since your history is the only thing we need, you can
                also turn off out all the other export options. Click{" "}
                <b>All YouTube data included</b> button and{" "}
                <b>unselect everything but history</b> and click OK
              </p>
              <img
                src={contentImg}
                alt="menu with options for getting different content"
              />
              <p>
                Click <b>Next step</b>.
              </p>
              <p>
                In a few hours or days Google Takeout will send you a mail where
                you can download your files
              </p>
            </div>
            <h3>2. Download files</h3>
            <div className={classes.box}>
              <p>
                Once you've got the mail from <b>Google Takeout</b>, you can
                click <b>Download your files</b>
              </p>
              <img src={mailImg} alt="mail from google" />
            </div>
            <div className={classes.box}>
              <p>
                This will take you to a new page and start downloading a
                compressed folder.
              </p>
              <p>
                <b>Extract/unzip</b> the compressed folder named <b>Takeout</b>.
              </p>
              <GuideFolderStructure />
            </div>
            <h3>3. Upload file to this site</h3>
          </div>

        <div className={classes.box}>
          <h2>Upload</h2>
          <UploadBtn onClick={onUpload}>Upload watch-history.json</UploadBtn>
        </div>
      </Overlay>
    </div>
  );
};

export default UploadPage;
