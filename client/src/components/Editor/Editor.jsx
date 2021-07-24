import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Editor.scss';
import useViewport from '../../hooks/useViewport';
import { getAccessTokenFromStorage } from '../../utils/manage-tokens';

export default function Editor (props) {
  const { isMobile } = useViewport();

  return (
    <div className={`editor-container ${props.editorClass? props.editorClass : ''}`}>
      <CKEditor
        editor={ ClassicEditor }
        key={isMobile}
        config={{
          toolbar: {
            viewportTopOffset: isMobile? 45 : 100
          },
          placeholder: props.placeholder,
          ckfinder: {
            uploadUrl: '/ckeditor/upload/',
            headers: {
              Authorization: `Bearer ${getAccessTokenFromStorage()}`
            },
            withCredentials: true
          }
        }}
        data={props.editorContent}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        }}
        onChange={props.onContentChange}
        onBlur={(event, editor ) => {
          console.log( 'Blur.', editor );
        }}
        onFocus={(event, editor ) => {
          console.log( 'Focus.', editor );
        }}
      />
    </div>
  );
}