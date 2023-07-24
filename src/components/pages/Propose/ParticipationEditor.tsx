"use client";

import React from "react";
import { Editor } from "src/components/blocks/Editor";
import { useFormContext } from "react-hook-form";

const ParticipationEditor: React.FC = () => {
  const { setValue } = useFormContext();

  const [editorContent, setEditorContent] = React.useState("");

  const handleEditorContentChange = (value: string) => {
    setEditorContent(value);
    setValue(`payload.howTo.content`, value);
  };

  return (
    <section>
      <h4 className="pb-6 text-2xl font-bold text-neutral-600">참여 방법</h4>
      <div className="min-h-[500px]">
        <Editor
          value={editorContent}
          placeholder={"프로젝트 참여 방법을 작성해주세요."}
          onChange={handleEditorContentChange}
        />
      </div>
    </section>
  );
};

export default ParticipationEditor;
