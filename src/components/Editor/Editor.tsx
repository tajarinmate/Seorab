import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

type InitType = {
  init: string;
};

const modules = {
  toolbar: false,
  // defaultValue: 'asdsas',
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

// Define a function type for the onChange callback
// type QuillOnChangeCallback = (
//   content: string,
//   delta: DeltaStatic,
//   source: string,
//   editor: Quill
// ) => void;

export function Editor({ init }: InitType) {
  const [value, setValue] = useState(init);

  useEffect(() => {
    setValue(init);
  }, [init]);

  return (
    <ReactQuill
      theme='snow'
      value={value}
      // htmlContent={value}
      // onChange={(content, data, source, editor) => setValue(editor.getHTML())}
      onChange={(content, data, source, editor) => {
        console.log(editor.getHTML());
        // setValue(editor.getHTML());
      }}
      modules={modules}
      formats={formats}
      style={{ height: '90%' }}
    />
  );
}
