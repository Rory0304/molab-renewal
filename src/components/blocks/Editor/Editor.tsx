"use client";

import React from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline"],
    ["image"],
  ],
};

//
//
//
interface EditorProps {
  value: string;
  placeholder: string;
  editorStyles?: React.CSSProperties;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  value,
  placeholder,
  editorStyles,
  onChange,
}) => {
  const ReactQuill = React.useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={QUILL_MODULES}
      placeholder={placeholder}
      style={{
        ...editorStyles,
      }}
    />
  );
};

export default Editor;
