import { useEffect, useRef, useState } from 'react';
import { getRequest } from '../../../utils/fetch-request';
import './TagEditor.scss';

export default function TagEditor(props) {
  const [allTags, setAllTags] = useState([]);
  const dataListRef = useRef(null);

  useEffect(() => {
    const successHandler = (result) => {
      setAllTags(result);
    };

    const errorHandler = (errMessage) => {
      console.log('Error fetching tag', errMessage);
    };

    // Fetch all the tags
    getRequest('/tags/', null, successHandler, errorHandler);
  }, []);

  const onTagAdd = (ev) => {
    ev.preventDefault();

    const tag = dataListRef.current.value;
    if (!tag) return;
    if (!props.addedTags.includes(tag)) {
      props.addTag(tag);
    }

    dataListRef.current.value = '';
  };

  const removeTag = (index) => {
    // Don't directly assign selectedTags to props.addedTags like below
    // let selectedTags = props.addedTags;
    let selectedTags = [...props.addedTags];
    selectedTags.splice(index, 1);

    props.setAddedTags(selectedTags);
  };

  return (
    <div className="tag-editor-container">
      <div className="tag-editor">
        <div className="tag-editor-datalist">
          <input list="all-tags" ref={dataListRef} placeholder="Add Tag" />
          <datalist id="all-tags">
            {allTags &&
              allTags.map((tag) => <option value={tag.name} key={tag.id} />)}
          </datalist>
        </div>
        <div className="add-tag" onClick={onTagAdd}>
          Add
        </div>
      </div>
      <div className="added-tags">
        {props.addedTags.map((tag, index) => (
          <div className="selected-tag" key={tag}>
            <div className="tag-label">{tag}</div>
            <div className="remove-tag" onClick={() => removeTag(index)}>
              &times;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
