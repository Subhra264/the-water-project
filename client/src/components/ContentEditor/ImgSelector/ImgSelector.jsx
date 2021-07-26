import './ImgSelector.scss';

export default function ImgSelector (props) {
    return (
        <div className="front-img-selector-container">
            <div className="front-img-label-container">
                Choose an image for the thumbnail
            </div>
            <div className="front-img-selector">
                <label htmlFor="file-selector">Select Image</label>
                <input type='file' id='file-selector' accept='image/*' ref={props.inputFileRef} />
            </div>
        </div>
    );
}