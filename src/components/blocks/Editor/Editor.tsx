"use client";

import React from "react";
import dynamic from "next/dynamic";
import { OverlayLoading } from "src/components/blocks/OverlayLoading";
import { enqueueSnackbar } from "notistack";
import type ReactQuillType from "react-quill";
import { editorImageHandler } from "src/utils/editor";
import { v4 as uuidV4 } from "uuid";

import "react-quill/dist/quill.snow.css";

interface IWrappedComponent
  extends React.ComponentProps<typeof ReactQuillType> {
  forwardedRef: React.LegacyRef<ReactQuillType>;
}

const QUILL_MODULES = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline"],
      ["image"],
    ],
    handlers: { image: {} },
  },
};

//
//
//
interface EditorProps {
  value: string;
  placeholder: string;
  defaultValue?: string;
  editorStyles?: React.CSSProperties;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  value,
  placeholder,
  editorStyles,
  onChange,
}) => {
  const reactQuillRef = React.useRef<ReactQuillType>(null);

  const ReactQuill = React.useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import("react-quill");
          const { ImageResize } = await import("quill-image-resize-module-ts");

          // Register image resize module
          // ref: https://www.npmjs.com/package/quill-image-resize-module-react
          RQ.Quill.register("modules/imageResize", ImageResize);

          const QuillJS = ({ forwardedRef, ...props }: IWrappedComponent) => {
            return <RQ ref={forwardedRef} {...props} />;
          };

          return QuillJS;
        },
        {
          ssr: false,
          loading: () => (
            <div className="relative pt-7 h-[500px]">
              <OverlayLoading />
            </div>
          ),
        }
      ),
    []
  );

  const editorImageSuccessCallback = React.useCallback((url: string) => {
    if (reactQuillRef.current) {
      const editor = reactQuillRef.current.getEditor();
      const range = editor.getSelection();

      if (range) {
        // [TODO]: Add 'alt' property
        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1, range.length);
      }
    }
  }, []);

  const editorImageErrorCallback = React.useCallback(() => {
    enqueueSnackbar("이미지 업로드에 실패했습니다.", {
      variant: "error",
    });
  }, []);

  const configuredModules = React.useMemo(
    () => ({
      toolbar: {
        ...QUILL_MODULES["toolbar"],
        handlers: {
          image: () =>
            editorImageHandler({
              fileName: `project-image-${uuidV4()}`,
              successCallback: (url) => editorImageSuccessCallback(url),
              errorCallback: () => editorImageErrorCallback(),
            }),
        },
      },
      // ref: https://www.npmjs.com/package/@looop/quill-image-resize-module-react
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      forwardedRef={reactQuillRef}
      value={value}
      onChange={(value) => onChange(value)}
      modules={configuredModules}
      placeholder={placeholder}
      style={{
        ...editorStyles,
      }}
    />
  );
};

export default Editor;
