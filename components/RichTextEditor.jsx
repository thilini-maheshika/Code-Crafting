
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow', // Use the "snow" theme for a simple rich text editor
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link'],
            ['clean']
          ]
        }
      });

      quill.on('text-change', () => {
        onChange(quill.root.innerHTML);
      });

      quill.root.innerHTML = value;
    }
  }, []);

  return (
    <div ref={editorRef} />
  );
};

export default RichTextEditor;
