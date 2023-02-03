import { useState } from 'react';
import './ImgSelector.scss';

export default function ImgSelector(props) {
  const [fileSelected, setFileSelected] = useState('No file Selected');

  const onFileChange = (ev) => {
    if (ev.target.files[0]) {
      setFileSelected('Selected');
    } else {
      setFileSelected('No file Selected');
    }
  };

  return (
    <div className="front-img-selector-container">
      <div className="front-img-label-container">
        {/* Choose an image for the thumbnail */}
        {props.title}
      </div>
      <div className="front-img-selector">
        <label htmlFor="file-selector">Select Image</label>
        <input
          type="file"
          id="file-selector"
          accept="image/*"
          ref={props.inputFileRef}
          onChange={onFileChange}
        />
        <span className="file-selected-status">{fileSelected}</span>
      </div>
    </div>
  );
}
