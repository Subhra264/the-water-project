import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Editor.scss';
import useViewport from '../../hooks/useViewport';

export default function Editor (props) {
  const { isMobile } = useViewport();
  const [editorContent, setEditorContent] = useState('');

  return (
    <div className="editor-container">
      <CKEditor
        editor={ ClassicEditor }
        key={isMobile}
        config={{
          toolbar: {
            viewportTopOffset: isMobile? 45 : 100
            // viewportTopOffset: 100
          }
        }}
        data={editorContent}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        }}
        onChange={(event, editor ) => {
          const data = editor.getData();
          setEditorContent(data);
          console.log( { event, editor, data } );
        }}
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