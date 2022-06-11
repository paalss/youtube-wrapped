import Overlay from "../../layout/overlay";
import UploadBtn from "./uploadBtn";

import takeoutImg from "../../../img/guide/takeout.png";
import mailImg from "../../../img/guide/mail.png";
import fileformatDefaultImg from "../../../img/guide/fileformat-default2.png";
import contentImg from "../../../img/guide/content.png";

import classes from "./uploadPage.module.css";

import GuideFolderStructure from "../guideFolderStructure";

const UploadPage = ({ onUpload }) => {
  return (
    <div className="App center">
      <header>
        <h1>Find out what videos you watched the most</h1>
        [image]
        <p>
          This site will render a ranked view of what videos you watched the
          most, based off a <code>watch-history.json</code>-file that you can
          upload to this site.
        </p>
        <p>
          <b>
            Here's how you can get your <code>watch-history.json</code>
          </b>
        </p>
      </header>
      <Overlay>
        <h2>1. Request watch history</h2>
        <p>
          Go to <a href="https://takeout.google.com/">takeout.google.com</a>
        </p>
        <p>
          Under <b>create a new export</b>, select only{" "}
          <b>YouTube and YouTube Music</b>
        </p>
        <img src={takeoutImg} alt="takeout" />
        <p>
          Click the <b>multiple formats</b> button.
        </p>
        <p>
          In the pop up, look for the select/dropdown menu with the pre-selected
          value "HTML".
          <br />
          Switch this value to <b>JSON</b> and click <b>OK</b>.
        </p>
        <img src={fileformatDefaultImg} alt="file format settings" />
        <p>
          Optional: Since your history is the only thing we need, you also click{" "}
          <b>All YouTube data included</b> button and{" "}
          <b>filter out all the other options.</b>
        </p>
        <img
          src={contentImg}
          alt="menu with options for getting different content"
        />
        <p>
          Click <b>Next step</b>.
        </p>
        <p>
          In a few hours or days Google Takeout will send you a mail where you
          can download your files
        </p>

        <img src={mailImg} alt="mail from google" />
        <h2>2. Download files</h2>
        <p>
          Once you've got the mail from <b>Google Takeout</b>, you can click{" "}
          <b>Download your files</b>
        </p>
        <p>
          This will take you to a new page and start downloading a compressed
          folder.
        </p>
        <p>
          <b>Extract/unzip</b> the compressed folder. It should reveal the
          following files &amp; folders:
        </p>
        <GuideFolderStructure />
        <h2>3. Upload file to this site</h2>
        <h2>Upload</h2>
        <UploadBtn onClick={onUpload}>Upload watch-history.json</UploadBtn>
      </Overlay>
    </div>
  );
};

export default UploadPage;
