import Overlay from "../../layout/overlay";
import UploadBtn from "./uploadBtn";

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
          The <code>watch-history.json</code> is a file that contains a list of
          all watched youtube-videos by a logged in youtube-user. Here's how you
          get it.
        </p>
      </header>
      <Overlay>
        <h2>Upload</h2>
        <UploadBtn onClick={onUpload}>Upload watch-history.json</UploadBtn>
      </Overlay>
    </div>
  );
};

export default UploadPage;
